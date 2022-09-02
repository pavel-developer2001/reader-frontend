import React from "react";
import { Layout, Spin } from "antd";
const { Header } = Layout;
import { BellOutlined, FormatPainterOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Theme } from "../../app/context/ThemeContext";
import { useTheme } from "../../shared/lib/hooks/useTheme";
import { selectUserToken } from "../../entities/user/model/user.selector";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const DynamicDesktop = dynamic(() => import("../../shared/ui/devices/Desktop"), {
  loading: () => <Spin />,
});
const DynamicMobile = dynamic(() => import("../../shared/ui/devices/Mobile"), {
  loading: () => <Spin />,
});
const DynamicAvatarDrawer = dynamic(() => import("./components/AvatarDrawer"), {
  loading: () => <Spin />,
});
const DynamicSearchModal = dynamic(
  () => import("../../features/SearchModal"),
  {
    loading: () => <Spin />,
  }
);
const DynamicAvatarUser = dynamic(
  () => import("../../entities/user/ui/AvatarUser"),
  {
    loading: () => <Spin />,
  }
);
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
      <DynamicDesktop>
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
                <DynamicSearchModal />
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
              <DynamicAvatarUser />
            </div>
          </div>
        </div>
      </DynamicDesktop>
      <DynamicMobile>
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
                <DynamicSearchModal />
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

              <DynamicAvatarDrawer
                changeTheme={changeTheme}
                menuArrays={menuArrays}
              />
            </div>
          </div>
        </div>
      </DynamicMobile>
    </Header>
  );
};

export default Navbar;
