import { Spin } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectMangaLoading,
  selectMangasData,
} from "../../../../store/modules/manga/manga.selector";
import styles from "./PopularList.module.css";

const DynamicCardManga = dynamic(() => import("../../../CardManga"), {
  loading: () => <Spin />,
});

const PopularList = () => {
  const mangas = useSelector(selectMangasData);
  const loading = useSelector(selectMangaLoading);
  return (
    <div className={styles.list}>
      {loading ? (
<<<<<<< HEAD
        <p data-testid='loading'>loading</p>
=======
        <Spin />
>>>>>>> main
      ) : (
        mangas?.map((manga) => (
          <DynamicCardManga key={manga?.id} manga={manga} />
        ))
      )}
    </div>
  );
};

export default PopularList;
