import { Spin, Tag } from "antd";
import React, { FC, memo } from "react";
import dynamic from "next/dynamic";
import { ITag } from "../../../../store/modules/manga/types/ITag";
import { IGenre } from "../../../../store/modules/manga/types/IGenre";
import styles from "./MangaDescriptions.module.scss";

const DynamicAuthorBlock = dynamic(() => import("../AuthorBlock"), {
  loading: () => <Spin />,
});

interface MangaDescriptionsProps {
  mangaDescription: string;
  tags: ITag[];
  genres: IGenre[];
}
const MangaDescriptions: FC<MangaDescriptionsProps> = memo(
  ({ mangaDescription, tags, genres }) => {
    return (
      <div>
        <p className={styles.text}>{mangaDescription}</p>
        {genres?.map((genre) => (
          <Tag color="purple" key={genre.id}>
            {genre.name}
          </Tag>
        ))}
        {tags?.map((tag) => (
          <Tag color="purple" key={tag.id}>
            {tag.name}
          </Tag>
        ))}
        <div className={styles.authors}>
          <strong className={styles.title}>Авторы</strong>
          <div>
            <DynamicAuthorBlock />
            <DynamicAuthorBlock />
          </div>
        </div>
      </div>
    );
  }
);

export default MangaDescriptions;
