import Title from "antd/lib/typography/Title";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardManga from "../../components/CardManga";
import Filters from "./components/Filters";
import MainLayout from "../../layouts/MainLayout";
import MangaApi from "../../services/api/mangaApi";
import { wrapper } from "../../store";
import { getMangas, setMangas } from "../../store/slices/mangaSlice";
import styles from "./Catalog.module.css";

const Catalog = () => {
  const mangas = useSelector<any>((state) => state.manga.mangas);
  const loading = useSelector<any>((state) => state.manga.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMangas());
  }, []);
  return (
    <MainLayout>
      <Title level={2}>Каталог</Title>
      <div className={styles.block}>
        <div className={styles.mangaList}>
          {loading ? (
            <p>loading</p>
          ) : (
            mangas?.map((manga: any) => (
              <CardManga key={manga.id} manga={manga} />
            ))
          )}
        </div>
        <Filters />
      </div>
    </MainLayout>
  );
};
// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps(async (ctx) => {
//     try {
//       const mangas = await MangaApi.getAllManga();
//       ctx.store.dispatch(setMangas(mangas));
//       return {
//         props: {},
//       };
//     } catch (error) {
//       console.log("ERROR!");
//       return {
//         props: {
//           rooms: [],
//         },
//       };
//     }
//   });
export default Catalog;
