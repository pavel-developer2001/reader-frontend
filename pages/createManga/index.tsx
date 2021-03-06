import React, { useState } from "react";
import { message, Button } from "antd";
import TextArea from "rc-textarea";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { addNewManga } from "../../store/modules/manga/manga.slice";
import MainLayout from "../../layouts/MainLayout";
import UploadImageForManga from "../../components/pages/createManga/UploadImageForManga";
import SelectTypesForManga from "../../components/pages/createManga/SelectTypesForManga";
import SelectAgeRatingForManga from "../../components/pages/createManga/SelectAgeRatingForManga";
import SelectTagsForManga from "../../components/pages/createManga/SelectTagsForManga";
import SelectStatusTranslateForManga from "../../components/pages/createManga/SelectStatusTranslateForManga";
import SelectGenresForManga from "../../components/pages/createManga/SelectGenresForManga";
import styles from "./CreateManga.module.scss";
import { GetServerSideProps } from "next";
import { wrapper } from "../../store";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateMangaFormSchema = yup.object().shape({
  title: yup.string().required("Введите название"),
  englishTitle: yup.string().required("Введите английское название"),
  originalTitle: yup.string().required("Введите оригинальное название"),
  mangaDescription: yup.string().required("Введите описание"),
  yearOfIssue: yup
    .number()
    .typeError("Введите год числом")
    .min(4, "Минимальная длина года 4 символа")
    .required("Введите год"),
  typeManga: yup.string().required("Выберите тип"),
  genres: yup.array().typeError("Выберите жанры").required("Выберите жанры"),
  statusManga: yup.string().required("Выберите статус"),
  tags: yup.array().typeError("Выберите теги").required("Выберите теги"),
  ageRatingManga: yup.string().required("Выберите возрастной статус"),
});
const CreateManga = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreateMangaFormSchema),
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const [mangaCover, setMangaCover] = useState("");

  const handleCreateNewManga = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("englishTitle", data.englishTitle);
      formData.append("originalTitle", data.originalTitle);
      formData.append("mangaDescription", data.mangaDescription);
      formData.append("typeManga", data.typeManga);
      for (let i = 0; i < data.genres.length; i++) {
        formData.append("genres", data.genres[i]);
      }
      for (let j = 0; j < data.tags.length; j++) {
        formData.append("tags", data.tags[j]);
      }
      formData.append("statusManga", data.statusManga);
      formData.append("ageRatingManga", data.ageRatingManga);
      formData.append("yearOfIssue", data.yearOfIssue);
      formData.append("mangaCover", mangaCover);
      //@ts-ignore
      dispatch(addNewManga(formData));
      message.success("Тайтл был успешно добавлен на сайт");
      reset();
      setImageUrl("");
      router.push("/");
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };

  const [imageUrl, setImageUrl] = useState("");

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(handleCreateNewManga)}>
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
                <Controller
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="название"
                      className={styles.input}
                      autoSize
                    />
                  )}
                  name="title"
                  control={control}
                  defaultValue=""
                />
                {!!errors?.title && (
                  <p className="error-field">{errors?.title?.message}</p>
                )}
              </div>
              <div className={styles.block}>
                <span className={styles.text}>Английское названия</span>
                <Controller
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Англиское название"
                      className={styles.input}
                      autoSize
                    />
                  )}
                  name="englishTitle"
                  control={control}
                  defaultValue=""
                />
                {!!errors?.englishTitle && (
                  <p className="error-field">{errors?.englishTitle?.message}</p>
                )}
              </div>
              <div className={styles.block}>
                <span className={styles.text}>Оригинальное названия</span>
                <Controller
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Оригинальное название "
                      className={styles.input}
                      autoSize
                    />
                  )}
                  name="originalTitle"
                  control={control}
                  defaultValue=""
                />
                {!!errors?.originalTitle && (
                  <p className="error-field">
                    {errors?.originalTitle?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.body}>
            <span className={styles.text}>Описание</span>
            <Controller
              render={({ field }) => (
                <TextArea
                  {...field}
                  className={styles.input}
                  placeholder="Описание"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              )}
              name="mangaDescription"
              control={control}
              defaultValue=""
            />
            {!!errors?.mangaDescription && (
              <p className="error-field">{errors?.mangaDescription?.message}</p>
            )}
          </div>
          <div className={styles.bottomBlock}>
            <div className={styles.left}>
              <div className={styles.top}>
                <div className={styles.select}>
                  <Controller
                    render={({ field }) => (
                      <SelectTypesForManga field={field} />
                    )}
                    name="typeManga"
                    control={control}
                    defaultValue=""
                  />
                  {!!errors?.typeManga && (
                    <p className="error-field">{errors?.typeManga?.message}</p>
                  )}
                </div>
                <div className={styles.select}>
                  <Controller
                    render={({ field }) => (
                      <SelectStatusTranslateForManga field={field} />
                    )}
                    name="statusManga"
                    control={control}
                    defaultValue=""
                  />
                  {!!errors?.statusManga && (
                    <p className="error-field">
                      {errors?.statusManga?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.mainSelect}>
                  <Controller
                    render={({ field }) => <SelectTagsForManga field={field} />}
                    name="tags"
                    control={control}
                    defaultValue=""
                  />
                  {!!errors?.tags && (
                    <p className="error-field">{errors?.tags?.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                <div className={styles.select}>
                  <Controller
                    render={({ field }) => (
                      <SelectAgeRatingForManga field={field} />
                    )}
                    name="ageRatingManga"
                    control={control}
                    defaultValue=""
                  />
                  {!!errors?.ageRatingManga && (
                    <p className="error-field">
                      {errors?.ageRatingManga?.message}
                    </p>
                  )}
                </div>
                <div className={styles.select}>
                  <span className={styles.text}>Год выпуска</span>
                  <Controller
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        className={styles.input}
                        placeholder="Год"
                        autoSize
                      />
                    )}
                    name="yearOfIssue"
                    control={control}
                    defaultValue=""
                  />
                  {!!errors?.yearOfIssue && (
                    <p className="error-field">
                      {errors?.yearOfIssue?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.mainSelect}>
                  <Controller
                    render={({ field }) => (
                      <SelectGenresForManga field={field} />
                    )}
                    name="genres"
                    control={control}
                    defaultValue=""
                  />
                  {!!errors?.genres && (
                    <p className="error-field">{errors?.genres?.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </div>
      </form>
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
