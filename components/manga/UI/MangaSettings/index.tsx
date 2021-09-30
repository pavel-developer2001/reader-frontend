import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Tag } from "antd";
import { Select } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { FC, useState } from "react";
import styles from "./MangaSettings.module.css";

const MangaSettings: FC<any> = ({ cover, id }) => {
  const { Option } = Select;

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val: any) {
    console.log("search:", val);
  }
  const router = useRouter();
  const [category, setCategory] = useState("");
  console.log("SELECTED", category);
  return (
    <div className={styles.card}>
      <Image width={250} height={350} src={cover} />
      <Button type='primary' shape='round' size='large'>
        Читать
      </Button>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Добавить в закладки'
        optionFilterProp='children'
        onChange={(value) => setCategory(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='Читаю'>Читаю</Option>
        <Option value='Прочитано'>Прочитано</Option>
        <Option value='Буду читать'>Буду читать</Option>
        <Option value='Брошено'>Брошено</Option>
        <Option value='Неинтересно'>Неинтересно</Option>
        <Option value='Отложено'>Отложено</Option>
      </Select>
      <Button type='link'>Редактировать</Button>
      <Button
        type='primary'
        icon={<PlusOutlined />}
        onClick={() => router.push("/manga/" + id + "/upload")}
        size='large'
      >
        Добавить новые главы
      </Button>
    </div>
  );
};

export default MangaSettings;
