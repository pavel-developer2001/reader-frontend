import Head from "next/head";
import React from "react";
import ChapterNavbar from "../../components/ChapterNavbar";
import MyFooter from "../../components/MyFooter";
import styles from "./ChapterLayout.module.scss";

interface ChapterLayoutProps {
  children: any;
  title: string;
  page: any;
  id: any;
}
const ChapterLayout: React.FC<ChapterLayoutProps> = ({
  title,
  page,
  children,
  id,
}) => {
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
      <ChapterNavbar title={title} page={page} id={id} />
      <div className={styles.main}>
        <div className={styles.container}>{children}</div>
        <div className={styles.right}>Параметры страницы</div>
      </div>
      <MyFooter />
    </div>
  );
};

export default ChapterLayout;