import { Select } from "antd";
import React, { FC } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import styles from "./SelectStatusTranslateForManga.module.scss";

const { Option } = Select;

interface SelectStatusTranslateForMangaProps {
  field: ControllerRenderProps<FieldValues, "statusManga">;
}

const SelectStatusTranslateForManga: FC<SelectStatusTranslateForMangaProps> = ({
  field,
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
      <span className={styles.text}>Статус перевода</span>
      <Select
        {...field}
        showSearch
        style={{ width: 200 }}
        placeholder="Статус перевода"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
