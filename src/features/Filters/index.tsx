/* eslint-disable no-console */
import { useState } from "react"
import { Button, Select } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { SelectValue } from "antd/lib/select"
import styles from "./Filters.module.scss"

const { Option } = Select

const Filters = () => {
  const [types, setTypes] = useState<SelectValue>("")
  console.log("TYPES", types)
  const typesArray = [
    { value: "манга", title: "Манга" },
    { value: "манхва", title: "Манхва" },
    { value: "маньхуа", title: "Маньхуа" },
    { value: "западный комикс", title: "Западный комикс" },
    { value: "рукомикс", title: "Рукомикс" },
  ]
  const [genres, setGenres] = useState<SelectValue>("")
  console.log("Genres", genres)
  const genresArray = [
    { value: "боевик", title: "Боевик" },
    { value: "боевые искусства", title: "Боевые искусства" },
    { value: "гарем", title: "Гарем" },
    { value: "романтика", title: "Романтика" },
    { value: "детектив", title: "Детектив" },
    { value: "трагедия", title: "Трагедия" },
    { value: "спорт", title: "Спорт" },
    { value: "сёнен", title: "Сёнен" },
    { value: "ужасы", title: "Ужасы" },
    { value: "фантастика", title: "Фантастика" },
    { value: "триллер", title: "Триллер" },
    { value: "этти", title: "Этти" },
  ]
  const [tags, setTags] = useState<SelectValue>("")
  console.log("Tags", tags)
  const tagsArray = [
    { value: "алхимия", title: "Алхимия" },
    { value: "ангелы", title: "Ангелы" },
    { value: "в цвете", title: "В цвете" },
    { value: "веб", title: "Веб" },
    { value: "эльфы", title: "Эльфы" },
    { value: "шантаж", title: "Шантаж" },
    { value: "будущее", title: "Будущее" },
    { value: "умный гг", title: "Умный ГГ" },
    { value: "тупой ГГ", title: "Тупой ГГ" },
    { value: "магия", title: "Магия" },
    { value: "ниндзя", title: "Ниндзя" },
    { value: "борьба за власть", title: "Борьба за власть" },
    { value: "система", title: "Система" },
    { value: "владыка демона", title: "Владыка демона" },
    { value: "гг имба", title: "ГГ имба" },
  ]
  const [statusTranslate, setStatusTranslate] = useState<SelectValue>("")
  console.log("StatusTranslate,", statusTranslate)
  const statusTranslateArray = [
    { value: "закончен", title: "Закончен" },
    { value: "продолжается", title: "Продолжается" },
    { value: "заморожен", title: "Заморожен" },
    { value: "нет переводчика", title: "Нет переводчика" },
    { value: "анонс", title: "Анонс" },
  ]
  const [ageRating, setAgeRating] = useState<SelectValue>("")
  console.log("AgeRating", ageRating)
  const ageRatingArray = [
    { value: "для всех", title: "Для всех" },
    { value: "16+", title: "16+" },
    { value: "18+", title: "18+" },
  ]
  const handleCleanCategories = () => {
    setTypes("")
    setGenres("")
    setTags("")
    setStatusTranslate("")
    setAgeRating("")
  }
  function onBlur() {
    console.log("blur")
  }

  function onFocus() {
    console.log("focus")
  }

  const childrenGenres = []
  childrenGenres.push(
    genresArray.map((genres) => (
      <Option value={genres.value} key={genres.value.toString()}>
        {genres.title.toString()}
      </Option>
    ))
  )
  const childrenTags = []
  childrenTags.push(
    tagsArray.map((genres) => (
      <Option value={genres.value} key={genres.value.toString()}>
        {genres.title.toString()}
      </Option>
    ))
  )
  return (
    <div className={styles.block}>
      <div>
        <strong>Фильтры</strong>
        <Button
          type="text"
          onClick={handleCleanCategories}
          icon={<CloseOutlined />}
          size="large"
        >
          Очистить
        </Button>
      </div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Типы"
        optionFilterProp="children"
        onChange={(value) => setTypes(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {typesArray.map((type) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Жанры"
        defaultValue={[]}
        onChange={(value) => setGenres(value)}
      >
        {childrenGenres}
      </Select>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Теги"
        defaultValue=""
        onChange={(value: string) => setTags(value)}
      >
        {childrenTags}
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Статус перевода"
        optionFilterProp="children"
        onChange={(value) => setStatusTranslate(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {statusTranslateArray.map((type) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Возрастной рейтинг"
        optionFilterProp="children"
        onChange={(value) => setAgeRating(value)}
        onFocus={onFocus}
        onBlur={onBlur}
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
      <div>
        <strong>Исключить</strong>
      </div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Типы"
        optionFilterProp="children"
        onChange={(value) => setTypes(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {typesArray.map((type) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Жанры"
        defaultValue={[]}
        onChange={(value) => setGenres(value)}
      >
        {childrenGenres}
      </Select>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Теги"
        defaultValue={[]}
        onChange={(value) => setTags(value)}
      >
        {childrenTags}
      </Select>
    </div>
  )
}

export default Filters
