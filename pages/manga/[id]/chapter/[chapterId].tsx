import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";
import ChapterLayout from "../../../../layouts/ChapterLayout";
import { IImage } from "../../../../models/IImage";
import { wrapper } from "../../../../store";
import { RootState } from "../../../../store/reducer";
import { getImages } from "../../../../store/slices/chapterSlice";
import styles from "./Chapter.module.scss";

const Chapter = () => {
  const router = useRouter();
  const mangaId = router.query?.id;

  const images = useSelector<RootState, IImage[]>(
    (state) => state.chapter.images
  );
  const loading = useSelector<RootState>((state) => state.chapter.loading);

  return loading ? (
    <p>loading</p>
  ) : (
    <ChapterLayout
      title={images[0]?.manga?.title}
      id={mangaId}
      page={images[0]?.chapter?.numberChapter}
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
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    try {
      //@ts-ignore
      await store.dispatch(getImages(params.chapterId));
      return {
        props: {},
      };
    } catch (error) {
      console.log("ERROR!", error);
      return {
        props: {},
      };
    }
  });
export default Chapter;
