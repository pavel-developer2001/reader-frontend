import React from "react";
import MainLayout from "../../layouts/MainLayout";

import { Tabs } from "antd";
import styles from "./Manga.module.css";
import CommentsBlock from "../../components/CommentsBlock";

import MangaData from "../../components/MangaData";
import MangaDescriptions from "../../components/MangaDescriptions";
import MangaAddition from "../../components/MangaAddition";
import MangaSettings from "../../components/MangaSettings";

const { TabPane } = Tabs;

const PageManga = () => {
  function callback(key: string) {
    console.log(key);
  }
  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <MangaSettings />
        <div>
          <MangaData />
          <div className={styles.table}>
            <div>
              <Tabs defaultActiveKey='1' onChange={callback}>
                <TabPane tab='Описание' key='1'>
                  <MangaDescriptions />
                  <CommentsBlock />
                </TabPane>
                <TabPane tab='Главы' key='2'>
                  Content of Tab Pane 2
                </TabPane>
              </Tabs>
            </div>
            <MangaAddition />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PageManga;
