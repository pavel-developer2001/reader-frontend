import type { NextPage } from "next";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Home.module.css";
import { setToken } from "../store/slices/userSlice";

import { wrapper } from "../store";
import { GetServerSideProps } from "next";

import PopularList from "../components/PopularList";
import TisketList from "../components/TisketList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home: NextPage = () => {
  const token = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToken(localStorage.getItem("token")));
  }, [token]);
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
