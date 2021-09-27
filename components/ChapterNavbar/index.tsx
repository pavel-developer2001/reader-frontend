import {
  CaretLeftOutlined,
  CaretRightOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./ChapterNavbar.module.scss";
import { Theme } from "../../context/ThemeContext";
import { useTheme } from "../../hooks/useTheme";
import AvatarUser from "../AvatarUser";
import { useRouter } from "next/dist/client/router";

const ChapterNavbar: FC<any> = ({ title, page, id }) => {
  const theme = useTheme();
  const router = useRouter();
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
        <strong
          className={styles.title}
          onClick={() => router.push("/manga/" + id)}
        >
          {title}
        </strong>
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
    </Header>
  );
};

export default ChapterNavbar;
