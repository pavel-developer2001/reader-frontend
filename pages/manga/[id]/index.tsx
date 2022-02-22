import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import { Tabs } from "antd";
import styles from "../Manga.module.css";
import dynamic from "next/dynamic";
import MangaData from "../../../components/manga/UI/MangaData";
import MangaDescriptions from "../../../components/manga/UI/MangaDescriptions";
import MangaSettings from "../../../components/manga/UI/MangaSettings";
import { GetServerSideProps } from "next";
import { wrapper } from "../../../store";
import { getManga } from "../../../store/modules/manga/manga.slice";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { RootState } from "../../../store/reducer";

const CommentsBlockList = dynamic(
  () => import("../../../components/manga/UI/CommentsBlockList")
);
const ChapterList = dynamic(
  () => import("../../../components/manga/UI/ChapterList")
);
const MangaAddition = dynamic(
  () => import("../../../components/manga/UI/MangaAddition")
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

  function callback(key: string) {
    console.log(key);
  }
  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <>
          {loading ? (
            <p>loading</p>
          ) : (
            <>
              {" "}
              <MangaSettings cover={manga?.mangaCover} id={manga?.id} />
              <div className={styles.main}>
                <MangaData
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
                    <Tabs defaultActiveKey='1' onChange={callback}>
                      <TabPane tab='Описание' key='1'>
                        <MangaDescriptions
                          mangaDescription={manga?.mangaDescription}
                          tags={manga.tags}
                          genres={manga.genres}
                        />
                      </TabPane>
                      <TabPane tab='Главы' key='2'>
                        <ChapterList mangaId={router.query.id} />
                      </TabPane>
                      <TabPane tab='Комментарии' key='3'>
                        <CommentsBlockList />
                      </TabPane>
                    </Tabs>
                  </div>
                  <MangaAddition />
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </MainLayout>
  );
};
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
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
