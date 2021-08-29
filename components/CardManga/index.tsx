import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import Link from "next/link";
import styles from "./CardManga.module.css";

const CardManga = () => {
  return (
    <Link href='/manga/1'>
      <Card
        hoverable
        className={styles.card}
        style={{ width: 200 }}
        cover={
          <img
            alt='example'
            src='https://api.remanga.org//media/titles/solo-leveling/3d99c504bdc727e34d12eb945f09e30a.jpg'
          />
        }
      >
        <Meta title='Поднятие уровня в одиночку' />
      </Card>
    </Link>
  );
};

export default CardManga;
