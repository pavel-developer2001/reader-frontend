import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Tag } from "antd";
import { Select } from "antd";
import React, { FC } from "react";
import styles from "./MangaSettings.module.css";

const MangaSettings: FC<any> = ({ cover, id }) => {
  const { Option } = Select;

  function onChange(value: any) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val: any) {
    console.log("search:", val);
  }
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
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value='read1'>Читаю</Option>
        <Option value='read2'>Прочитано</Option>
        <Option value='read3'>Буду читать</Option>
        <Option value='read4'>Брошено</Option>
        <Option value='read5'>Неинтересно</Option>
        <Option value='read6'>Отложено</Option>
      </Select>
      <Button type='link'>Редактировать</Button>
      <Button type='primary' icon={<PlusOutlined />} size='large'>
        Добавить новые главы
      </Button>
    </div>
  );
};

export default MangaSettings;
