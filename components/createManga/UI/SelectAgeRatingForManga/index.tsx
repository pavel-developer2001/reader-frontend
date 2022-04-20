import Select from "antd/lib/select";
import React, { FC } from "react";
import styles from "./SelectAgeRatingForManga.module.scss";

const { Option } = Select;

interface SelectAgeRatingForMangaProps {
  onBlur: () => void;
  onFocus: () => void;
  onSearch: (val: string) => void;
  setAgeRatingManga: (arg: any) => void;
}

const SelectAgeRatingForManga: FC<SelectAgeRatingForMangaProps> = ({
  onBlur,
  onFocus,
  onSearch,
  setAgeRatingManga,
}) => {
  const ageRatingArray = [
    { value: "Для всех", title: "Для всех" },
    { value: "16+", title: "16+" },
    { value: "18+", title: "18+" },
  ];
  return (
    <>
      {" "}
      <span className={styles.text}>Возрастной рейтинг</span>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Возрастной рейтинг"
        optionFilterProp="children"
        onChange={(value) => setAgeRatingManga(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {ageRatingArray.map((type, index) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectAgeRatingForManga;
