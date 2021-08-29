import React from "react";
import CardManga from "../CardManga";
import styles from "./PopularList.module.css";

const PopularList = () => {
  return (
    <div className={styles.list}>
      <CardManga />
      <CardManga />
      <CardManga />
      <CardManga />
      <CardManga />
    </div>
  );
};

export default PopularList;
