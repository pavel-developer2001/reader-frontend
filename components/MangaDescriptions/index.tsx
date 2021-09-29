import { Tag } from "antd";
import styles from "./MangaDescriptions.module.scss";
import React, { FC } from "react";

const MangaDescriptions: FC<any> = ({ mangaDescription }) => {
  return (
    <div>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <p className={styles.text}>{mangaDescription}</p>
    </div>
  );
};

export default MangaDescriptions;
