import Title from "antd/lib/typography/Title";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardManga from "../../components/CardManga";
import Filters from "../../components/catalog/UI/Filters";
import MainLayout from "../../layouts/MainLayout";
import MangaApi from "../../services/api/mangaApi";
import { wrapper } from "../../store";
import { getMangas, setMangas } from "../../store/slices/mangaSlice";
import styles from "./Catalog.module.css";
import { Tabs } from "antd";
import TeamList from "../../components/catalog/UI/TeamList";
import { RootState } from "../../store/reducer";
import { IManga } from "../../models/IManga";

const { TabPane } = Tabs;

function callback(key: string) {
  console.log(key);
}

const Catalog = () => {
  const mangas = useSelector<RootState, IManga[]>(
    (state) => state.manga.mangas
  );
  const loading = useSelector<RootState>((state) => state.manga.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMangas());
  }, []);
  return (
    <MainLayout>
      <Title level={2}>Каталог</Title>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='Тайтлы' key='1'>
          <div className={styles.block}>
            <div className={styles.mangaList}>
              {loading ? (
                <p>loading</p>
              ) : (
                mangas?.map((manga) => (
                  <CardManga key={manga.id} manga={manga} />
                ))
              )}
            </div>
            <div className={styles.filters}>
              <Filters />
            </div>
          </div>
        </TabPane>
        <TabPane tab='Команды переводчиков' key='2'>
          <TeamList />
        </TabPane>
      </Tabs>
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
