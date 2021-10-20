import type { NextPage } from "next";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Home.module.css";
import { setToken } from "../store/slices/userSlice";

import { wrapper } from "../store";
import { GetServerSideProps } from "next";

import PopularList from "../components/home/UI/PopularList";
import TisketList from "../components/home/UI/TisketList";
import { useEffect } from "react";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <PopularList />
      <div className={styles.tisket}>
        <TisketList popularTitle='Рекомендации' />
        <TisketList popularTitle='Топ дня' />
        <TisketList popularTitle='Топ месяца' />
      </div>
    </MainLayout>
  );
};
// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps(async (ctx) => {
//     try {
//       // const posts = await fetch(
//       //   "https://jsonplaceholder.typicode.com/posts"
//       // ).then((res) => res.json());
//       // ctx.store.dispatch(setUsers(posts));
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
export default Home;
