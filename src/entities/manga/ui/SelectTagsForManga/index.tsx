import Select from "antd/lib/select"
import { FC } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import styles from "./SelectTagsForManga.module.scss"

const { Option } = Select

interface SelectTagsForMangaProps {
  field: ControllerRenderProps<FieldValues, "tags">
}

const SelectTagsForManga: FC<SelectTagsForMangaProps> = ({ field }) => {
  const tagsArray = [
    { value: "Алхимия", title: "Алхимия" },
    { value: "Ангелы", title: "Ангелы" },
    { value: "В цвете", title: "В цвете" },
    { value: "Веб", title: "Веб" },
    { value: "Эльфы", title: "Эльфы" },
    { value: "Шантаж", title: "Шантаж" },
    { value: "Будущее", title: "Будущее" },
    { value: "Умный ГГ", title: "Умный ГГ" },
    { value: "Тупой ГГ", title: "Тупой ГГ" },
    { value: "Магия", title: "Магия" },
    { value: "Ниндзя", title: "Ниндзя" },
    { value: "Борьба за власть", title: "Борьба за власть" },
    { value: "Система", title: "Система" },
    { value: "Владыка демона", title: "Владыка демона" },
    { value: "ГГ имба", title: "ГГ имба" },
  ]
  const childrenTags = []
  childrenTags.push(
    tagsArray.map((genres) => (
      <Option value={genres.value} key={genres.value.toString()}>
        {genres.title.toString()}
      </Option>
    ))
  )
  return (
    <>
      <span className={styles.text}>Категории</span>
      <Select
        {...field}
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Теги"
        defaultValue={[]}
      >
        {childrenTags}
      </Select>
    </>
  )
}

export default SelectTagsForManga
