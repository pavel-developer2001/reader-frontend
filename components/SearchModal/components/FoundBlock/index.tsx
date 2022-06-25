import { Avatar, Spin } from "antd";
import Link from "next/link";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  selectSearchListManga,
  selectSearchLoading,
} from "../../../../store/modules/manga/manga.selector";
import { IManga } from "../../../../store/modules/manga/types/IManga";
import styles from "./FoundBlock.module.scss";

const FoundBlockItem: FC<{ manga: IManga }> = ({ manga }) => {
  return (
    <div>
      <Link href={"/manga/" + manga.id}>
        <a className={styles.main}>
          <Avatar
            size={30}
            src={
              manga.mangaCover
                ? manga.mangaCover
                : "https://joeschmoe.io/api/v1/random"
            }
          />
          <strong>{manga.title}</strong>
        </a>
      </Link>
    </div>
  );
};
const FoundBlock = () => {
  const mangas = useSelector(selectSearchListManga);
  const isLoading = useSelector(selectSearchLoading);
  if (isLoading) {
    return (
      <div className={styles.mainList}>
        <Spin />
      </div>
    );
  }
  return (
    <div className={styles.mainList}>
      {mangas.length > 0 ? (
        mangas.map((manga) => <FoundBlockItem manga={manga} />)
      ) : (
        <div className={styles.mainList}>Пусто</div>
      )}
    </div>
  );
};

export default FoundBlock;
