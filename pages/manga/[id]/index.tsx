import React from "react";
import { Spin, Tabs } from "antd";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import styles from "../Manga.module.scss";
import { wrapper } from "../../../store";
import { getManga } from "../../../store/modules/manga/manga.slice";
import { RootState } from "../../../store/reducer";

const CommentsBlockList = dynamic(
  () => import("../../../components/manga/UI/CommentsBlockList"),
  { loading: () => <Spin /> }
);
const ChapterList = dynamic(
  () => import("../../../components/manga/UI/ChapterList"),
  { loading: () => <Spin /> }
);
const MangaAddition = dynamic(
  () => import("../../../components/manga/UI/MangaAddition"),
  { loading: () => <Spin /> }
);
const DynamicMainLayout = dynamic(() => import("../../../layouts/MainLayout"), {
  loading: () => <Spin size="large" />,
});
const DynamicMangaData = dynamic(
  () => import("../../../components/manga/UI/MangaData"),
  {
    loading: () => <Spin size="large" />,
  }
);
const DynamicMangaDescriptions = dynamic(
  () => import("../../../components/manga/UI/MangaDescriptions"),
  {
    loading: () => <Spin />,
  }
);
const DynamicMangaSettings = dynamic(
  () => import("../../../components/manga/UI/MangaSettings"),
  {
    loading: () => <Spin />,
  }
);

import {
  selectMangaItem,
  selectMangaLoading,
} from "../../../store/modules/manga/manga.selector";

const { TabPane } = Tabs;

const PageManga = () => {
  const manga = useSelector<RootState, any>(selectMangaItem);
  const loading = useSelector(selectMangaLoading);
  const router = useRouter();
  return (
    <DynamicMainLayout>
      <div className={styles.wrapper}>
        <>
          {loading ? (
            <Spin />
          ) : (
            <>
              <DynamicMangaSettings cover={manga?.mangaCover} id={manga?.id} />
              <div className={styles.main}>
                <DynamicMangaData
                  title={manga?.title}
                  englishTitle={manga?.englishTitle}
                  originalTitle={manga?.originalTitle}
                  yearOfIssue={manga?.yearOfIssue}
                  ageRating={manga?.ageRatingManga}
                  typeManga={manga?.typeManga}
                  statusManga={manga?.statusManga}
                  watchCount={manga?.watchCount}
                />
                <div className={styles.table}>
                  <div className={styles.mainBlock}>
                    <Tabs defaultActiveKey="1">
                      <TabPane tab="Описание" key="1">
                        <DynamicMangaDescriptions
                          mangaDescription={manga?.mangaDescription}
                          tags={manga.tags}
                          genres={manga.genres}
                        />
                        <MangaAddition />
                      </TabPane>
                      <TabPane tab="Главы" key="2">
                        <ChapterList mangaId={router.query.id} />
                      </TabPane>
                      <TabPane tab="Комментарии" key="3">
                        <CommentsBlockList />
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </DynamicMainLayout>
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
      await store.dispatch(getManga(params.id));
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
export default PageManga;
