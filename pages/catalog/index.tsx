import Title from "antd/lib/typography/Title";
import React from "react";
import { useSelector } from "react-redux";
import { Spin, Tabs } from "antd";
import { getMangas } from "../../store/modules/manga/manga.slice";
import {
  selectMangaLoading,
  selectMangasData,
} from "../../store/modules/manga/manga.selector";
import styles from "./Catalog.module.css";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { wrapper } from "../../store";
const { TabPane } = Tabs;

const DynamicCardManga = dynamic(() => import("../../components/CardManga"), {
  loading: () => <Spin />,
});
const DynamicTeamList = dynamic(
  () => import("../../components/catalog/UI/TeamList"),
  { loading: () => <Spin /> }
);
const DynamicFilters = dynamic(
  () => import("../../components/catalog/UI/Filters"),
  { loading: () => <Spin /> }
);
const DynamicMainLayout = dynamic(() => import("../../layouts/MainLayout"), {
  loading: () => <Spin size="large" />,
});

const Catalog = () => {
  const mangas = useSelector(selectMangasData);
  const loading = useSelector(selectMangaLoading);

  return (
    <DynamicMainLayout>
      <Title level={2}>Каталог</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Тайтлы" key="1">
          <div className={styles.block}>
            <div className={styles.mangaList}>
              {loading ? (
                <Spin />
              ) : (
                mangas?.map((manga) => (
                  <DynamicCardManga key={manga.id} manga={manga} />
                ))
              )}
            </div>
            <div className={styles.filters}>
              <DynamicFilters />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Команды переводчиков" key="2">
          <DynamicTeamList />
        </TabPane>
      </Tabs>
    </DynamicMainLayout>
  );
};
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );
    try {
      //@ts-ignore
      await store.dispatch(getMangas());
      return {
        props: {},
      };
    } catch (error) {
      console.log("ERROR!");
      return {
        props: {},
      };
    }
  });

export default Catalog;
