import React, { useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";

import { Tabs } from "antd";
import styles from "../Manga.module.css";
import CommentsBlock from "../../../components/CommentsBlock";

import MangaData from "./components/MangaData";
import MangaDescriptions from "./components/MangaDescriptions";
import MangaAddition from "./components/MangaAddition";
import MangaSettings from "./components/MangaSettings";
import { GetServerSideProps } from "next";
import { wrapper } from "../../../store";
import MangaApi from "../../../services/api/mangaApi";
import { getManga, setManga } from "../../../store/slices/mangaSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import ChapterList from "./components/ChapterList";

const { TabPane } = Tabs;

const PageManga = () => {
  const dispatch = useDispatch();
  const manga = useSelector<any>((state) => state.manga.manga);
  const loading = useSelector<any>((state) => state.manga.loading);
  const router = useRouter();

  useEffect(() => {
    dispatch(getManga(router.query.id));
  }, [router]);
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
              <MangaSettings cover={manga.mangaCover} id={manga.id} />
              <div className={styles.main}>
                <MangaData
                  title={manga.title}
                  englishTitle={manga.englishTitle}
                  originalTitle={manga.originalTitle}
                  yearOfIssue={manga.yearOfIssue}
                />
                <div className={styles.table}>
                  <div>
                    <Tabs defaultActiveKey='1' onChange={callback}>
                      <TabPane tab='Описание' key='1'>
                        <MangaDescriptions
                          mangaDescription={manga.mangaDescription}
                        />
                        <CommentsBlock />
                      </TabPane>
                      <TabPane tab='Главы' key='2'>
                        <ChapterList mangaId={router.query.id} />
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
// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps(async (ctx, params) => {
//     try {
//       const manga = await MangaApi.getManga(params.id);
//       ctx.store.dispatch(setManga(manga));
//       return {
//         props: {},
//       };
//     } catch (error) {
//       console.log("ERROR!");
//       return {
//         props: {
//           rooms: [],
//         },
//       };
//     }
//   });
export default PageManga;
