import { Tag } from "antd";
import styles from "./MangaDescriptions.module.scss";
import React, { FC } from "react";
import { ITag } from "../../../../store/modules/manga/types/ITag";
import { IGenre } from "../../../../store/modules/manga/types/IGenre";

interface MangaDescriptionsProps {
  mangaDescription: string;
  tags: ITag[];
  genres: IGenre[];
}
const MangaDescriptions: FC<MangaDescriptionsProps> = ({
  mangaDescription,
  tags,
  genres,
}) => {
  return (
    <div>
      {genres?.map((genre) => (
        <Tag color='purple' key={genre.id}>
          {genre.genre}
        </Tag>
      ))}
      {tags?.map((tag) => (
        <Tag color='purple' key={tag.id}>
          {tag.tag}
        </Tag>
      ))}
      <p className={styles.text}>{mangaDescription}</p>
    </div>
  );
};

export default MangaDescriptions;
