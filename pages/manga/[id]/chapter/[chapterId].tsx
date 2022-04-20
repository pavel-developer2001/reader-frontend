import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";
import ChapterLayout from "../../../../layouts/ChapterLayout";
import { wrapper } from "../../../../store";
import { getImages } from "../../../../store/modules/chapter/chapter.slice";
import {
  selectChapterImagesData,
  selectChapterLoading,
} from "../../../../store/modules/chapter/chapter.selector";
import styles from "./Chapter.module.scss";

const Chapter = () => {
  const router = useRouter();
  const mangaId = router.query?.id;
  const images = useSelector(selectChapterImagesData);
  console.log("IMAGES", images);
  const loading = useSelector(selectChapterLoading);

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
          <Image
            key={image.id}
            className={styles.page}
            width={900}
            height={900}
            alt="chapter page"
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
