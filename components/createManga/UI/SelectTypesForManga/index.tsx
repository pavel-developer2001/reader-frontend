import Select from "antd/lib/select";
import React, { FC } from "react";
import styles from "./SelectTypesForManga.module.scss";

const { Option } = Select;

interface SelectTypesForMangaProps {
  onBlur: () => void;
  onFocus: () => void;
  onSearch: (val: string) => void;
  setTypeManga: (arg: any) => void;
}

const SelectTypesForManga: FC<SelectTypesForMangaProps> = ({
  onBlur,
  onFocus,
  onSearch,
  setTypeManga,
}) => {
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
        showSearch
        style={{ width: 200 }}
        placeholder='Типы'
        optionFilterProp='children'
        onChange={(value) => setTypeManga(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {typesArray.map((type, index) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectTypesForManga;
