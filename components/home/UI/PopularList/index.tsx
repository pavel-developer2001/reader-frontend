import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IManga } from "../../../../models/IManga";
import { RootState } from "../../../../store/reducer";
import CardManga from "../../../CardManga";
import styles from "./PopularList.module.css";

const PopularList = () => {
  const mangas = useSelector<RootState, IManga[]>(
    (state) => state.manga.mangas
  );
  const loading = useSelector<RootState>((state) => state.manga.loading);
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
