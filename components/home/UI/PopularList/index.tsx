import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectMangaLoading,
  selectMangasData,
} from "../../../../store/modules/manga/manga.selector";
import CardManga from "../../../CardManga";
import styles from "./PopularList.module.css";

const PopularList = () => {
  const mangas = useSelector(selectMangasData);
  const loading = useSelector(selectMangaLoading);
  return (
    <div className={styles.list}>
      {loading ? (
        <p>loading</p>
      ) : (
        mangas?.map((manga) => <CardManga key={manga.id} manga={manga} />)
      )}
    </div>
  );
};

export default PopularList;
