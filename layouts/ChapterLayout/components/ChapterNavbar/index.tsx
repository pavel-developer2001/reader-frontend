import {
  CaretLeftOutlined,
  CaretRightOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./ChapterNavbar.module.scss";
import { Theme } from "../../../../context/ThemeContext";
import { useTheme } from "../../../../hooks/useTheme";
import AvatarUser from "../../../../components/AvatarUser";

const ChapterNavbar: FC<any> = ({ title, page, id }) => {
  const theme = useTheme();
  function changeTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }
  return (
    <Header className={styles.header}>
      <div className='main-container'>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <Link href='/'>
                <a>Reader</a>
              </Link>
            </div>
            <Link href={"/manga/" + id}>
              <a className={styles.title}> {title}</a>
            </Link>
          </div>
          <div className={styles.center}>
            {id <= 0 ? null : <CaretLeftOutlined />}
            <span># {page}</span>
            <CaretRightOutlined />
          </div>
          <div className={styles.right}>
            <div className={styles.menu}>
              <FormatPainterOutlined onClick={changeTheme} />
            </div>
            <AvatarUser />
          </div>
        </div>
      </div>
    </Header>
  );
};

export default ChapterNavbar;
