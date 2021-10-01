import { CopyFilled, EyeFilled, HeartFilled } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import React, { FC } from "react";
import Rating from "../Rating";
import styles from "./MangaData.module.scss";

const MangaData: FC<any> = ({
  title,
  englishTitle,
  originalTitle,
  yearOfIssue,
}) => {
  return (
    <div>
      <div>
        <Title level={5} className={styles.originalTitle}>
          {englishTitle} / {originalTitle}
        </Title>
        <div className={styles.dataTitle}>
          <Title className={styles.title}>{title}</Title>
          <span className={styles.status}>[Продолжается]</span>
        </div>
      </div>
      <div className={styles.static}>
        <div className={styles.rating}>
          <Rating />
        </div>
        <div className={styles.likes}>
          <HeartFilled /> 17.2K{" "}
        </div>
        <div className={styles.watch}>
          <EyeFilled /> 95.4K
        </div>
        <div className={styles.bookmarks}>
          <CopyFilled /> 13.8K
        </div>
        <div className={styles.type}>Маньхуа</div>
        <div className={styles.date}>{yearOfIssue}</div>
      </div>
    </div>
  );
};

export default MangaData;
