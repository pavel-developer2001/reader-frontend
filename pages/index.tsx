import type { NextPage } from "next";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Home.module.css";
import { addCounter, setUsers } from "../store/slices/userSlice";

import { wrapper } from "../store";
import { GetServerSideProps } from "next";

import PopularList from "../components/PopularList";
import TisketList from "../components/TisketList";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <PopularList />
      <div className={styles.tisket}>
        <TisketList />
        <TisketList />
        <TisketList />
      </div>
    </MainLayout>
  );
};
export const getServerSideProps =
  //@ts-ignore
  wrapper.getServerSideProps(async (ctx) => {
    try {
      const posts = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      ).then((res) => res.json());
      ctx.store.dispatch(setUsers(posts));
      return {
        props: {},
      };
    } catch (error) {
      console.log("ERROR!");
      return {
        props: {
          rooms: [],
        },
      };
    }
  });
export default Home;
