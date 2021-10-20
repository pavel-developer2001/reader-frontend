import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IManga } from "../../../../models/IManga";
import { RootState } from "../../../../store/reducer";
import { getMangas } from "../../../../store/slices/mangaSlice";
import CardManga from "../../../CardManga";
import styles from "./PopularList.module.css";

const PopularList = () => {
  const mangas = useSelector<RootState, IManga[]>(
    (state) => state.manga.mangas
  );
  const loading = useSelector<RootState>((state) => state.manga.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMangas());
  }, []);
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
