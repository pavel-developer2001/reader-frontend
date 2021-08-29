import Title from "antd/lib/typography/Title";
import React from "react";
import CardManga from "../../components/CardManga";
import Filters from "../../components/Filters";
import MainLayout from "../../layouts/MainLayout";
import styles from "./Catalog.module.css";

const Catalog = () => {
  return (
    <MainLayout>
      <Title level={2}>Каталог</Title>
      <div className={styles.block}>
        <div className={styles.mangaList}>
          <CardManga />
          <CardManga />
          <CardManga />
          <CardManga />
          <CardManga />
        </div>
        <Filters />
      </div>
    </MainLayout>
  );
};

export default Catalog;
