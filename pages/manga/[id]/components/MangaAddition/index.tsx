import React from "react";
import CardTeam from "../../../../../components/CardTeam";
import styles from "./MangaAddition.module.css";

const MangaAddition = () => {
  return (
    <div className={styles.addition}>
      <div>Переводчики</div>
      <CardTeam />
      <div>Похожее</div>
    </div>
  );
};

export default MangaAddition;
