import Select from "antd/lib/select"
import { FC } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import styles from "./SelectAgeRatingForManga.module.scss"

const { Option } = Select

interface SelectAgeRatingForMangaProps {
  field: ControllerRenderProps<FieldValues, "ageRatingManga">
}

const SelectAgeRatingForManga: FC<SelectAgeRatingForMangaProps> = ({
  field,
}) => {
  const ageRatingArray = [
    { value: "Для всех", title: "Для всех" },
    { value: "16+", title: "16+" },
    { value: "18+", title: "18+" },
  ]
  return (
    <>
      <span className={styles.text}>Возрастной рейтинг</span>
      <Select
        {...field}
        showSearch
        style={{ width: 200 }}
        placeholder="Возрастной рейтинг"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {ageRatingArray.map((type) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
    </>
  )
}

export default SelectAgeRatingForManga
