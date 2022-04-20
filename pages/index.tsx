import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Home.module.css";

import { wrapper } from "../store";

import PopularList from "../components/home/UI/PopularList";
const TisketList = dynamic(() => import("../components/home/UI/TisketList"));
const UpdateList = dynamic(() => import("../components/home/UI/UpdateList"));

import { getMangas } from "../store/modules/manga/manga.slice";

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
