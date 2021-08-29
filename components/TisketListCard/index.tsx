import { Card } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./TisketListCard.module.css";

const TisketListCard = () => {
  return (
    <div className={styles.block}>
      <img
        className={styles.img}
        src='https://api.remanga.org//media/titles/tales_of_demons_and_gods/high_cover.jpg'
        alt='img card'
      />
      <Link href='/manga/1'>
        <a>
          {" "}
          <Card
            title='Peak martian'
            className={styles.card}
            extra='2020'
            bordered={false}
            style={{ width: 310, margin: 10 }}
          ></Card>
        </a>
      </Link>
    </div>
  );
};

export default TisketListCard;
