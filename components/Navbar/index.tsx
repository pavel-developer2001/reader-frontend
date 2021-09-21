import React from "react";
import { Layout, Menu, Modal, Popover } from "antd";
const { Header } = Layout;
import {
  BellOutlined,
  NotificationOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./Navbar.module.css";
import MenuUser from "../MenuUser";
import LoginModal from "../LoginModal";
import { useSelector } from "react-redux";

const Navbar = () => {
  const token = useSelector<any>((state) => state.user.token);
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

  return (
    <Header className='header'>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Reader</a>
        </Link>
      </div>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={["2"]}>
        <Menu.Item key='1'>
          <Link href='/catalog'>
            <a>Каталог</a>
          </Link>
        </Menu.Item>
        <Menu.Item key=''>
          <Link href='/popular'>
            <a>В топе</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='3'>
          <Link href='/lateUpdates'>
            <a>Лента</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='4'>
          <SearchOutlined /> Поиск
        </Menu.Item>
        <Menu.Item key='5'>Закладки</Menu.Item>
        <Menu.Item key='6'>
          <BellOutlined />
        </Menu.Item>
        {token ? (
          <Menu.Item key='7'>
            <Popover placement='bottom' content={<MenuUser />} trigger='click'>
              <Avatar size='large' icon={<UserOutlined />} />
            </Popover>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key='7' onClick={showModal}>
              Войти
            </Menu.Item>
            <LoginModal
              isModalVisible={isModalVisible}
              handleOk={handleOk}
              setIsModalVisible={setIsModalVisible}
              handleCancel={handleCancel}
            />
          </>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
