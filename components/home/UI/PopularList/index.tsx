import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMangas } from "../../../../store/slices/mangaSlice";
import CardManga from "../../../CardManga";
import styles from "./PopularList.module.css";

const PopularList = () => {
  const mangas = useSelector<any>((state) => state.manga.mangas);
  const loading = useSelector<any>((state) => state.manga.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMangas());
  }, []);
  return (
    <div className={styles.list}>
      {loading ? (
        <p>loading</p>
      ) : (
        mangas?.map((manga: any) => <CardManga key={manga.id} manga={manga} />)
      )}
    </div>
  );
};

export default PopularList;
