import Head from "next/head";
import React from "react";
import ChapterNavbar from "../../components/ChapterNavbar";
import MyFooter from "../../components/MyFooter";
import styles from "./ChapterLayout.module.scss";

interface ChapterLayoutProps {
  children: any;
}
const ChapterLayout: React.FC<ChapterLayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{"Reader - читалка"}</title>
        <meta
          name='description'
          content={`Читай популярные комиксы, мангу, маньхуа, манхва и т.п.`}
        />
        <meta name='robots' content='index, follow' />
        <meta
          name='keywords'
          content={"Музыка, треки, артисты, общения, друзья, знакомства"}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <ChapterNavbar />
      <div className={styles.container}>{children}</div>
      <MyFooter />
    </div>
  );
};

export default ChapterLayout;
