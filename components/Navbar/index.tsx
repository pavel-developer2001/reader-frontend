import React from "react";
import { Button, Layout, Popover } from "antd";
const { Header } = Layout;
import {
  BellOutlined,
  FormatPainterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import MenuUser from "../MenuUser";
import LoginModal from "../LoginModal";
import { useSelector } from "react-redux";
import { Theme } from "../../context/ThemeContext";
import { useTheme } from "../../hooks/useTheme";

const Navbar = () => {
  const token = useSelector<any>((state) => state.user.token);
  const theme = useTheme();
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
      {
        title: "Команды",
        link: "/team",
      },
    ],
    right: [],
  };
  return (
    <Header className={styles.header}>
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
        {token ? (
          <div className={styles.menu}>
            <Popover placement='bottom' content={<MenuUser />} trigger='click'>
              <Avatar size='large' icon={<UserOutlined />} />
            </Popover>
          </div>
        ) : (
          <>
            <div className={styles.menu} onClick={showModal}>
              Войти
            </div>
            <LoginModal
              isModalVisible={isModalVisible}
              handleOk={handleOk}
              setIsModalVisible={setIsModalVisible}
              handleCancel={handleCancel}
            />
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
