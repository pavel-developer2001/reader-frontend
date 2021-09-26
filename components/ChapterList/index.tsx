import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "./ChapterList.module.scss";

const ChapterListItem = () => {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div
        className={styles.numbers}
        onClick={() => router.push("/manga/" + router.query.id + "/chapter/5")}
      >
        <strong className={styles.volume}>2</strong>
        <span>Глава 101</span>
      </div>
      <div className={styles.dataChapter}>
        <span className={styles.date}>22/09/2021</span>
        <span>Assley Team</span>
      </div>
      <div className={styles.popular}>
        <HeartOutlined />
        10k
      </div>
    </div>
  );
};
const ChapterList = () => {
  return (
    <div className={styles.mainList}>
      <ChapterListItem />
      <ChapterListItem />
      <ChapterListItem />
    </div>
  );
};

export default ChapterList;
