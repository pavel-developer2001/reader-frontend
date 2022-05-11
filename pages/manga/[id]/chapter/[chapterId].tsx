import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import { wrapper } from "../../../../store";
import { getImages } from "../../../../store/modules/chapter/chapter.slice";
import {
  selectChapterImagesData,
  selectChapterLoading,
} from "../../../../store/modules/chapter/chapter.selector";
import styles from "./Chapter.module.scss";

const DynamicChapterLayout = dynamic(
  () => import("../../../../layouts/ChapterLayout"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin size="large" />
      </div>
    ),
  }
);
const Chapter = () => {
  const router = useRouter();
  const mangaId = router.query?.id;
  const images = useSelector(selectChapterImagesData);
  console.log("IMAGES", images);
  const loading = useSelector(selectChapterLoading);

  return loading ? (
    <Spin />
  ) : (
    <DynamicChapterLayout
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
    </DynamicChapterLayout>
  );
};
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params, res }) => {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );
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
