import { Tag } from "antd";
import styles from "./MangaDescriptions.module.scss";
import React, { FC } from "react";

const MangaDescriptions: FC<any> = ({ mangaDescription, tags, genres }) => {
  return (
    <div>
      {genres?.map((genre: any) => (
        <Tag color='purple' key={genre.id}>
          {genre.genre}
        </Tag>
      ))}
      {tags?.map((tag: any) => (
        <Tag color='purple' key={tag.id}>
          {tag.tag}
        </Tag>
      ))}
      <p className={styles.text}>{mangaDescription}</p>
    </div>
  );
};

export default MangaDescriptions;
