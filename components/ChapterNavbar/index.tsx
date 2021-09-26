import {
  CaretLeftOutlined,
  CaretRightOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import Link from "next/link";
import React from "react";
import styles from "./ChapterNavbar.module.scss";
import { Theme } from "../../context/ThemeContext";
import { useTheme } from "../../hooks/useTheme";
import AvatarUser from "../AvatarUser";

const ChapterNavbar = () => {
  const theme = useTheme();
  function changeTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }
  return (
    <Header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>Reader</a>
          </Link>
        </div>
        <strong className={styles.title}>Поднятие уровня в одиночку</strong>
      </div>
      <div className={styles.center}>
        <CaretLeftOutlined />
        <span># 169</span>
        <CaretRightOutlined />
      </div>
      <div className={styles.right}>
        <div className={styles.menu}>
          <FormatPainterOutlined onClick={changeTheme} />
        </div>
        <AvatarUser />
      </div>
    </Header>
  );
};

export default ChapterNavbar;
