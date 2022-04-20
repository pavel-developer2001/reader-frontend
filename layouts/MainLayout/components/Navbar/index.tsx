import React from "react";
import { Layout } from "antd";
const { Header } = Layout;
import { BellOutlined, FormatPainterOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Theme } from "../../../../context/ThemeContext";
import { useTheme } from "../../../../hooks/useTheme";
import AvatarUser from "../../../../components/AvatarUser";
import SearchModal from "../../../../components/SearchModal";
import { Desktop } from "../../../../devices/Desktop";
import { Mobile } from "../../../../devices/Mobile";
import AvatarDrawer from "./components/AvatarDrawer";
import { selectUserToken } from "../../../../store/modules/user/user.selector";
import { useSelector } from "react-redux";

const Navbar = () => {
  const theme = useTheme();
  const token = useSelector(selectUserToken);

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
    ],
    right: [],
  };
  return (
    <Header className={styles.header}>
      <Desktop>
        <div className="main-container">
          <div className={styles.wrapper}>
            <div className={styles.leftHeader}>
              <div className={styles.logo}>
                <Link href="/">
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
                <SearchModal />
              </div>
              {token && (
                <div className={styles.menu}>
                  <Link href="/notification">
                    <a>
                      <BellOutlined />
                    </a>
                  </Link>
                </div>
              )}

              <div className={styles.menu}>
                <FormatPainterOutlined onClick={changeTheme} />
              </div>
              <AvatarUser />
            </div>
          </div>
        </div>
      </Desktop>
      <Mobile>
        <div className="main-container">
          <div className={styles.wrapper}>
            <div className={styles.leftHeader}>
              <div className={styles.logo}>
                <Link href="/">
                  <a>Reader</a>
                </Link>
              </div>
            </div>
            <div className={styles.rightHeader}>
              <div className={styles.menu}>
                <SearchModal />
              </div>
              {token && (
                <div className={styles.menu}>
                  <Link href="/notification">
                    <a>
                      <BellOutlined />
                    </a>
                  </Link>
                </div>
              )}

              <AvatarDrawer changeTheme={changeTheme} menuArrays={menuArrays} />
            </div>
          </div>
        </div>
      </Mobile>
    </Header>
  );
};

export default Navbar;
