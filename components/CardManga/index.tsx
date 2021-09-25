import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { FC } from "react";
import Link from "next/link";
import styles from "./CardManga.module.css";

const CardManga: FC<any> = ({ manga }) => {
  return (
    <Link href={"/manga/" + manga.id}>
      <Card
        hoverable
        className={styles.card}
        style={{ width: 200 }}
        cover={<img alt='example' src={manga.mangaCover} />}
      >
        <Meta title={manga.title} />
      </Card>
    </Link>
  );
};

export default CardManga;
