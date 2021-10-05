import React from "react";
import { Layout } from "antd";
const { Header } = Layout;
import {
  BellOutlined,
  FormatPainterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Theme } from "../../../../context/ThemeContext";
import { useTheme } from "../../../../hooks/useTheme";
import AvatarUser from "../../../../components/AvatarUser";

const Navbar = () => {
  const theme = useTheme();

  function changeTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }
  const menuArrays = {
    left: [
      {
        title: "Каталог",
        link: "/catalog",
      },
      {
        title: "В топе",
        link: "/popular",
      },
      {
        title: "Лента",
        link: "/lateUpdates",
      },
    ],
    right: [],
  };
  return (
    <Header className={styles.header}>
      <div className='main-container'>
        <div className={styles.wrapper}>
          <div className={styles.leftHeader}>
            <div className={styles.logo}>
              <Link href='/'>
                <a>Reader</a>
              </Link>
            </div>
            {menuArrays.left.map((menu, index) => (
              <div key={index} className={styles.menu}>
                <Link href={menu.link}>
                  <a>{menu.title}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.rightHeader}>
            <div className={styles.menu}>
              <SearchOutlined /> Поиск
            </div>
            <div className={styles.menu}>
              <Link href='/#'>
                <a>Закладки</a>
              </Link>
            </div>
            <div className={styles.menu}>
              <Link href='/#'>
                <a>
                  <BellOutlined />
                </a>
              </Link>
            </div>
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

export default Navbar;
