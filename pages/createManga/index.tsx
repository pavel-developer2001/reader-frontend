import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./CreateManga.module.css";
import { Upload, message, Button, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "rc-textarea";
import { dataUser } from "../../utils/getDataUserFromToken";
import { useDispatch } from "react-redux";
import { addNewManga } from "../../store/slices/mangaSlice";
import { useRouter } from "next/dist/client/router";
const { Option } = Select;

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
const CreateManga = () => {
  const [typeManga, setTypeManga] = useState<any>("");

  const typesArray = [
    { value: "манга", title: "Манга" },
    { value: "манхва", title: "Манхва" },
    { value: "маньхуа", title: "Маньхуа" },
    { value: "западный комикс", title: "Западный комикс" },
    { value: "рукомикс", title: "Рукомикс" },
  ];
  const [genres, setGenres] = useState<any>([""]);

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
  const [tags, setTags] = useState<any>([""]);

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
  ];
  const [statusManga, setStatusManga] = useState<any>("");

  const statusTranslateArray = [
    { value: "закончен", title: "Закончен" },
    { value: "продолжается", title: "Продолжается" },
    { value: "заморожен", title: "Заморожен" },
    { value: "нет переводчика", title: "Нет переводчика" },
    { value: "анонс", title: "Анонс" },
  ];
  const [ageRatingManga, setAgeRatingManga] = useState<any>("");

  const ageRatingArray = [
    { value: "для всех", title: "Для всех" },
    { value: "16+", title: "16+" },
    { value: "18+", title: "18+" },
  ];
  const handleCleanCategories = () => {
    setTypeManga("");
    setGenres("");
    setTags("");
    setStatusManga("");
    setAgeRatingManga("");
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
  const childrenGenres = [];
  childrenGenres.push(
    genresArray.map((genres) => (
      <Option value={genres.value} key={genres.value.toString()}>
        {genres.title.toString()}
      </Option>
    ))
  );
  const childrenTags = [];
  childrenTags.push(
    tagsArray.map((genres) => (
      <Option value={genres.value} key={genres.value.toString()}>
        {genres.title.toString()}
      </Option>
    ))
  );
  ////////////////////
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [mangaDescription, setMangaDescription] = useState("");
  const [yearOfIssue, setYearOfIssue] = useState("");
  const [mangaCover, setMangaCover] = useState("");
  const handleCreateNewManga = async (e: any) => {
    e.preventDefault();
    try {
      if (title === "") {
        return alert("Напишите название комнаты");
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("englishTitle", englishTitle);
      formData.append("originalTitle", originalTitle);
      formData.append("mangaDescription", mangaDescription);
      formData.append("typeManga", typeManga);
      for (let i = 0; i < genres.length; i++) {
        formData.append("genres", genres[i]);
      }
      for (let j = 0; j < tags.length; j++) {
        formData.append("tags", tags[j]);
      }
      formData.append("statusManga", statusManga);
      formData.append("ageRatingManga", ageRatingManga);
      formData.append("yearOfIssue", yearOfIssue);
      formData.append("userId", dataUser.id);
      formData.append("mangaCover", mangaCover);
      dispatch(addNewManga(formData));
      setTitle("");
      setEnglishTitle("");
      setOriginalTitle("");
      setMangaDescription("");
      setYearOfIssue("");
      setImageUrl("");
      router.push("/");
    } catch (error) {}
  };
  ////////////////////////
  const [loading, setLoading] = useState<boolean | null>();
  const [imageUrl, setImageUrl] = useState("");
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className={styles.uploadText}>Добавить обложку для манги</div>
    </div>
  );
  const handleChange = (e: any) => {
    setMangaCover(e.file.originFileObj);
    if (e.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (e.file.status === "done") {
      getBase64(e.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };
  return (
    <MainLayout>
      <div className={styles.content}>
        <h2 className={styles.title}>Добавить мангу на сайт</h2>
        <div className={styles.header}>
          <div>
            <Upload
              className={styles.customUpload}
              name='file'
              listType='picture-card'
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt='avatar' style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div className={styles.info}>
            <div className={styles.block}>
              <span>Русское название</span>
              <TextArea
                placeholder='название'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span>Английское названия</span>
              <TextArea
                placeholder='Англиское название'
                value={englishTitle}
                onChange={(e) => setEnglishTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span>Оригинальное названия</span>
              <TextArea
                placeholder='Оригинальное название '
                value={originalTitle}
                onChange={(e) => setOriginalTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span>Год выпуска</span>
              <TextArea
                placeholder='Год'
                autoSize
                value={yearOfIssue}
                onChange={(e) => setYearOfIssue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <span>Описание</span>
          <TextArea
            value={mangaDescription}
            onChange={(e) => setMangaDescription(e.target.value)}
            placeholder='Описание'
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div className={styles.categories}>
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
          <Select
            mode='multiple'
            allowClear
            style={{ width: "100%" }}
            placeholder='Жанры'
            defaultValue={[]}
            onChange={(value) => setGenres(value)}
          >
            {childrenGenres}
          </Select>
          <Select
            mode='multiple'
            allowClear
            style={{ width: "100%" }}
            placeholder='Теги'
            defaultValue={[]}
            onChange={(value) => setTags(value)}
          >
            {childrenTags}
          </Select>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder='Статус перевода'
            optionFilterProp='children'
            onChange={(value) => setStatusManga(value)}
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
        </div>
        <Button type='primary' onClick={handleCreateNewManga}>
          Создать
        </Button>
      </div>
    </MainLayout>
  );
};

export default CreateManga;
