import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./CreateManga.module.scss";
import { Upload, message, Button, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "rc-textarea";
import { dataUser } from "../../utils/getDataUserFromToken";
import { useDispatch } from "react-redux";
import { addNewManga } from "../../store/modules/manga/manga.slice";
import { useRouter } from "next/dist/client/router";
const { Option } = Select;

function getBase64(img: Blob, callback: any) {
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
    { value: "Манга", title: "Манга" },
    { value: "Манхва", title: "Манхва" },
    { value: "Маньхуа", title: "Маньхуа" },
    { value: "Западный комикс", title: "Западный комикс" },
    { value: "Рукомикс", title: "Рукомикс" },
  ];
  const [genres, setGenres] = useState<any>([""]);

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
  ];
  const [tags, setTags] = useState<any>([""]);

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
  ];
  const [statusManga, setStatusManga] = useState<any>("");

  const statusTranslateArray = [
    { value: "Закончен", title: "Закончен" },
    { value: "Продолжается", title: "Продолжается" },
    { value: "Заморожен", title: "Заморожен" },
    { value: "Нет переводчика", title: "Нет переводчика" },
    { value: "Анонс", title: "Анонс" },
  ];
  const [ageRatingManga, setAgeRatingManga] = useState<any>("");

  const ageRatingArray = [
    { value: "Для всех", title: "Для всех" },
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

  function onSearch(val: string) {
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
  const handleCreateNewManga = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
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
      message.success("Тайтл был успешно добавлен на сайт");
      setTitle("");
      setEnglishTitle("");
      setOriginalTitle("");
      setMangaDescription("");
      setYearOfIssue("");
      setImageUrl("");
      router.push("/");
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
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
      getBase64(e.file.originFileObj, (imageUrl: string) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };
  return (
    <MainLayout>
      <div className={styles.content}>
        <h2 className={styles.title}>Добавить тайтл на сайт</h2>
        <div className={styles.topBlock}>
          <div className={styles.upload}>
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
              <span className={styles.text}>Русское название</span>
              <TextArea
                placeholder='название'
                value={title}
                className={styles.input}
                onChange={(e) => setTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span className={styles.text}>Английское названия</span>
              <TextArea
                placeholder='Англиское название'
                value={englishTitle}
                className={styles.input}
                onChange={(e) => setEnglishTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span className={styles.text}>Оригинальное названия</span>
              <TextArea
                placeholder='Оригинальное название '
                value={originalTitle}
                className={styles.input}
                onChange={(e) => setOriginalTitle(e.target.value)}
                autoSize
              />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <span className={styles.text}>Описание</span>
          <TextArea
            value={mangaDescription}
            className={styles.input}
            onChange={(e) => setMangaDescription(e.target.value)}
            placeholder='Описание'
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div className={styles.bottomBlock}>
          <div className={styles.left}>
            <div className={styles.top}>
              <div className={styles.select}>
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {typesArray.map((type, index) => (
                    <Option value={type.value} key={type.value}>
                      {type.title}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className={styles.select}>
                <span className={styles.text}>Статус перевода</span>
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {statusTranslateArray.map((type, index) => (
                    <Option value={type.value} key={type.value}>
                      {type.title}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.mainSelect}>
                <span className={styles.text}>Категории</span>
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
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.top}>
              <div className={styles.select}>
                <span className={styles.text}>Возрастной рейтинг</span>
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {ageRatingArray.map((type, index) => (
                    <Option value={type.value} key={type.value}>
                      {type.title}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className={styles.select}>
                <span className={styles.text}>Год выпуска</span>
                <TextArea
                  className={styles.input}
                  placeholder='Год'
                  autoSize
                  value={yearOfIssue}
                  onChange={(e) => setYearOfIssue(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.mainSelect}>
                <span className={styles.text}>Жанры</span>
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
              </div>
            </div>
          </div>
        </div>

        <Button type='primary' onClick={handleCreateNewManga}>
          Создать
        </Button>
      </div>
    </MainLayout>
  );
};

export default CreateManga;
