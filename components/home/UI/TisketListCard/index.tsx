import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "./TisketListCard.module.scss";

const TisketListCard = () => {
  return (
    <div className={styles.main}>
      <div className={styles.leftBlock}>
        {" "}
        <Image
          className={styles.img}
          src='https://api.remanga.org//media/titles/tales_of_demons_and_gods/high_cover.jpg'
          alt='img card'
          width={60}
          height={90}
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
