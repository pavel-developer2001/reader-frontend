import type { NextPage } from "next";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Home.module.css";

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

export default Home;
