import React from "react";
import CardTeam from "../../../CardTeam";
import styles from "./MangaAddition.module.css";

const MangaAddition = () => {
  return (
    <div className={styles.addition}>
      <div className={styles.title}>Переводчики</div>
      <CardTeam />
      <div className={styles.title}>Похожее</div>
    </div>
  );
};

export default MangaAddition;
