import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import styles from "../styles/Home.module.css";
import { getMangas } from "../store/modules/manga/manga.slice";
import { Spin } from "antd";

import { wrapper } from "../store";

const MainLayout = dynamic(() => import("../layouts/MainLayout"), {
  loading: () => (
    <div className="loader-block">
      <Spin size="large" />
    </div>
  ),
});
const PopularList = dynamic(() => import("../components/pages/home/PopularList"), {
  loading: () => (
    <div className="loader-block">
      <Spin />
    </div>
  ),
});
const TisketList = dynamic(() => import("../components/pages/home/TisketList"), {
  loading: () => (
    <div className="loader-block">
      <Spin />
    </div>
  ),
});
const UpdateList = dynamic(() => import("../components/pages/home/UpdateList"), {
  loading: () => (
    <div className="loader-block">
      <Spin />
    </div>
  ),
});

const Home: NextPage = () => {
  return (
    <MainLayout>
      <PopularList />
      <div className={styles.tisket}>
        <TisketList popularTitle="Рекомендации" />
        <TisketList popularTitle="Топ дня" />
        <TisketList popularTitle="Топ месяца" />
      </div>
      <UpdateList />
    </MainLayout>
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
export default Home;
