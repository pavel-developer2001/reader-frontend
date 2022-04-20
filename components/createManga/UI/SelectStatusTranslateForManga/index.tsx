import { Select } from "antd";
import React, { FC } from "react";
import styles from "./SelectStatusTranslateForManga.module.scss";

const { Option } = Select;

interface SelectStatusTranslateForMangaProps {
  onBlur: () => void;
  onFocus: () => void;
  onSearch: (val: string) => void;
  setStatusManga: (arg: any) => void;
}

const SelectStatusTranslateForManga: FC<SelectStatusTranslateForMangaProps> = ({
  onBlur,
  onFocus,
  onSearch,
  setStatusManga,
}) => {
  const statusTranslateArray = [
    { value: "Закончен", title: "Закончен" },
    { value: "Продолжается", title: "Продолжается" },
    { value: "Заморожен", title: "Заморожен" },
    { value: "Нет переводчика", title: "Нет переводчика" },
    { value: "Анонс", title: "Анонс" },
  ];
  return (
    <>
      {" "}
      <span className={styles.text}>Статус перевода</span>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Статус перевода"
        optionFilterProp="children"
        onChange={(value) => setStatusManga(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {statusTranslateArray.map((type, index) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectStatusTranslateForManga;
