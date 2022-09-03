import Select from "antd/lib/select";
import React, { FC } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import styles from "./SelectTypesForManga.module.scss";

const { Option } = Select;

interface SelectTypesForMangaProps {
  field: ControllerRenderProps<FieldValues, "typeManga">;
}

const SelectTypesForManga: FC<SelectTypesForMangaProps> = ({ field }) => {
  const typesArray = [
    { value: "Манга", title: "Манга" },
    { value: "Манхва", title: "Манхва" },
    { value: "Маньхуа", title: "Маньхуа" },
    { value: "Западный комикс", title: "Западный комикс" },
    { value: "Рукомикс", title: "Рукомикс" },
  ];
  return (
    <>
      <span className={styles.text}>Тип</span>
      <Select
        {...field}
        showSearch
        style={{ width: 200 }}
        placeholder="Типы"
        optionFilterProp="children"
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {typesArray.map((type) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectTypesForManga;
