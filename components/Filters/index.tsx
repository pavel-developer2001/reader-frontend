import React, { useState } from "react";
import { Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./Filters.module.scss";

const { Option } = Select;

const Filters = () => {
  const [types, setTypes] = useState("");
  console.log("TYPES", types);
  const typesArray = [
    { value: "манга", title: "Манга" },
    { value: "манхва", title: "Манхва" },
    { value: "маньхуа", title: "Маньхуа" },
    { value: "западный комикс", title: "Западный комикс" },
    { value: "рукомикс", title: "Рукомикс" },
  ];
  const [genres, setGenres] = useState("");
  console.log("Genres", genres);
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
  ];
  const [tags, setTags] = useState("");
  console.log("Tags", tags);
  const tagsArray = [
    { value: "манга", title: "Манга" },
    { value: "манхва", title: "Манхва" },
    { value: "маньхуа", title: "Маньхуа" },
    { value: "западный комикс", title: "Западный комикс" },
    { value: "рукомикс", title: "Рукомикс" },
  ];
  const [statusTranslate, setStatusTranslate] = useState("");
  console.log("StatusTranslate,", statusTranslate);
  const statusTranslateArray = [
    { value: "закончен", title: "Закончен" },
    { value: "продолжается", title: "Продолжается" },
    { value: "заморожен", title: "Заморожен" },
    { value: "нет переводчика", title: "Нет переводчика" },
    { value: "анонс", title: "Анонс" },
  ];
  const [ageRating, setAgeRating] = useState("");
  console.log("AgeRating", ageRating);
  const ageRatingArray = [
    { value: "для всех", title: "Для всех" },
    { value: "16+", title: "16+" },
    { value: "18+", title: "18+" },
  ];
  const handleCleanCategories = () => {
    setTypes("");
    setGenres("");
    setTags("");
    setStatusTranslate("");
    setAgeRating("");
  };
  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val: any) {
    console.log("search:", val);
  }
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }
  return (
    <div className={styles.block}>
      <div>
        <strong>Фильтры</strong>
        <Button
          type='text'
          onClick={handleCleanCategories}
          icon={<CloseOutlined />}
          size='large'
        >
          Очистить
        </Button>
      </div>
      <Select
        mode='multiple'
        allowClear
        style={{ width: "100%" }}
        placeholder='Please select'
        defaultValue={["a10", "c12"]}
        onChange={handleChange}
      >
        {children}
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Типы'
        optionFilterProp='children'
        onChange={(value) => setTypes(value)}
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
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Жанры'
        optionFilterProp='children'
        onChange={(value) => setGenres(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {genresArray.map((type, index) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Теги'
        optionFilterProp='children'
        onChange={(value) => setTags(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {tagsArray.map((type, index) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Статус перевода'
        optionFilterProp='children'
        onChange={(value) => setStatusTranslate(value)}
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
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Возрастной рейтинг'
        optionFilterProp='children'
        onChange={(value) => setAgeRating(value)}
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
      <div>
        <strong>Исключить</strong>
      </div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Типы'
        optionFilterProp='children'
        onChange={(value) => setTypes(value)}
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
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Жанры'
        optionFilterProp='children'
        onChange={(value) => setGenres(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {genresArray.map((type, index) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='Теги'
        optionFilterProp='children'
        onChange={(value) => setTags(value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {tagsArray.map((type, index) => (
          <Option value={type.value} key={type.value}>
            {type.title}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Filters;
