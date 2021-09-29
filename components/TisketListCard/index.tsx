import { Card } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./TisketListCard.module.scss";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const TisketListCard = () => {
  const state = useSelector<any>((state) => state);
  return (
    <div className={styles.main}>
      <div className={styles.leftBlock}>
        {" "}
        <img
          className={styles.img}
          src='https://api.remanga.org//media/titles/tales_of_demons_and_gods/high_cover.jpg'
          alt='img card'
        />
      </div>
      <div className={styles.rightBlock}>
        <strong className={styles.title}>Сказания о демонах и богах</strong>
        <span className={styles.year}>2015</span>
      </div>
    </div>
  );
};

export default TisketListCard;
