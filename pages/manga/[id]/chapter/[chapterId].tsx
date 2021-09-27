import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChapterLayout from "../../../../layouts/ChapterLayout";
import { getImages } from "../../../../store/slices/chapterSlice";
import styles from "./Chapter.module.scss";

const Chapter = () => {
  const router = useRouter();
  const chapterId = router.query?.chapterId;
  const mangaId = router.query?.id;
  const dispatch = useDispatch();
  const images = useSelector<any>((state) => state.chapter.images);
  const loading = useSelector<any>((state) => state.chapter.loading);
  useEffect(() => {
    dispatch(getImages(chapterId));
  }, []);
  return loading ? (
    <p>loading</p>
  ) : (
    <ChapterLayout
      title={"Поднятие уровня в одиночку"}
      id={mangaId}
      page={chapterId}
    >
      <div className={styles.main}>
        {images?.map((image) => (
          <img
            key={image.id}
            className={styles.page}
            alt='chapter page'
            src={image.imageChapter}
          />
        ))}
      </div>
    </ChapterLayout>
  );
};

export default Chapter;
