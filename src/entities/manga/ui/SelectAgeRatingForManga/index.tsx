import Select from "antd/lib/select";
import React, { FC } from "react";
import styles from "./SelectAgeRatingForManga.module.scss";

const { Option } = Select;

interface SelectAgeRatingForMangaProps {
  field: any;
}

const SelectAgeRatingForManga: FC<SelectAgeRatingForMangaProps> = ({
  field,
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
        {...field}
        showSearch
        style={{ width: 200 }}
        placeholder="Возрастной рейтинг"
        optionFilterProp="children"
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
