import Select from "antd/lib/select"
import { FC } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import styles from "./SelectGenresForManga.module.scss"

const { Option } = Select

interface SelectGenresForMangaProps {
  field: ControllerRenderProps<FieldValues, "genres">
}

const SelectGenresForManga: FC<SelectGenresForMangaProps> = ({ field }) => {
  const genresArray = [
    { value: "Боевик", title: "Боевик" },
    { value: "Боевые искусства", title: "Боевые искусства" },
    { value: "Гарем", title: "Гарем" },
    { value: "Романтика", title: "Романтика" },
    { value: "Детектив", title: "Детектив" },
    { value: "Трагедия", title: "Трагедия" },
    { value: "Спорт", title: "Спорт" },
    { value: "Сёнен", title: "Сёнен" },
    { value: "Ужасы", title: "Ужасы" },
    { value: "Фантастика", title: "Фантастика" },
    { value: "Триллер", title: "Триллер" },
    { value: "Этти", title: "Этти" },
  ]
  const childrenGenres = []
  childrenGenres.push(
    genresArray.map((genres) => (
      <Option value={genres.value} key={genres.value.toString()}>
        {genres.title.toString()}
      </Option>
    ))
  )
  return (
    <>
      <span className={styles.text}>Жанры</span>
      <Select
        {...field}
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Жанры"
        defaultValue={[]}
      >
        {childrenGenres}
      </Select>
    </>
  )
}

export default SelectGenresForManga
