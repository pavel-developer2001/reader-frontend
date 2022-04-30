import React, { useState } from "react";
import { message, Button } from "antd";
import TextArea from "rc-textarea";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { addNewManga } from "../../store/modules/manga/manga.slice";
import MainLayout from "../../layouts/MainLayout";
import UploadImageForManga from "../../components/createManga/UI/UploadImageForManga";
import SelectTypesForManga from "../../components/createManga/UI/SelectTypesForManga";
import SelectAgeRatingForManga from "../../components/createManga/UI/SelectAgeRatingForManga";
import SelectTagsForManga from "../../components/createManga/UI/SelectTagsForManga";
import SelectStatusTranslateForManga from "../../components/createManga/UI/SelectStatusTranslateForManga";
import SelectGenresForManga from "../../components/createManga/UI/SelectGenresForManga";
import styles from "./CreateManga.module.scss";
import { GetServerSideProps } from "next";
import { wrapper } from "../../store";

const CreateManga = () => {
  const [typeManga, setTypeManga] = useState<any>("");
  const [genres, setGenres] = useState<any>([""]);
  const [tags, setTags] = useState<any>([""]);
  const [statusManga, setStatusManga] = useState<any>("");
  const [ageRatingManga, setAgeRatingManga] = useState<any>("");
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

  const [imageUrl, setImageUrl] = useState("");

  return (
    <MainLayout>
      <div className={styles.content}>
        <h2 className={styles.title}>Добавить тайтл на сайт</h2>
        <div className={styles.topBlock}>
          <UploadImageForManga
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            setMangaCover={setMangaCover}
          />
          <div className={styles.info}>
            <div className={styles.block}>
              <span className={styles.text}>Русское название</span>
              <TextArea
                placeholder="название"
                value={title}
                className={styles.input}
                onChange={(e) => setTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span className={styles.text}>Английское названия</span>
              <TextArea
                placeholder="Англиское название"
                value={englishTitle}
                className={styles.input}
                onChange={(e) => setEnglishTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span className={styles.text}>Оригинальное названия</span>
              <TextArea
                placeholder="Оригинальное название "
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
            placeholder="Описание"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div className={styles.bottomBlock}>
          <div className={styles.left}>
            <div className={styles.top}>
              <div className={styles.select}>
                <SelectTypesForManga
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onSearch={onSearch}
                  setTypeManga={setTypeManga}
                />
              </div>
              <div className={styles.select}>
                <SelectStatusTranslateForManga
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onSearch={onSearch}
                  setStatusManga={setStatusManga}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.mainSelect}>
                <SelectTagsForManga setTags={setTags} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.top}>
              <div className={styles.select}>
                <SelectAgeRatingForManga
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onSearch={onSearch}
                  setAgeRatingManga={setAgeRatingManga}
                />
              </div>
              <div className={styles.select}>
                <span className={styles.text}>Год выпуска</span>
                <TextArea
                  className={styles.input}
                  placeholder="Год"
                  autoSize
                  value={yearOfIssue}
                  onChange={(e) => setYearOfIssue(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.mainSelect}>
                <SelectGenresForManga setGenres={setGenres} />
              </div>
            </div>
          </div>
        </div>

        <Button type="primary" onClick={handleCreateNewManga}>
          Создать
        </Button>
      </div>
    </MainLayout>
  );
};
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );
    return {
      props: {},
    };
  });

export default CreateManga;
