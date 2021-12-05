import { ExportOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, message } from "antd";
import React from "react";
import Link from "next/link";
import styles from "./MenuUser.module.css";
import { setToken } from "../../../../store/modules/user/userSlice";
import { useDispatch } from "react-redux";
import { dataUser } from "../../../../utils/getDataUserFromToken";

const MenuUser = () => {
  const dispatch = useDispatch();
  const handleExitUser = () => {
    window.localStorage.removeItem("token");
    dispatch(setToken(""));
    message.success("Вы вышли из аккаунта");
  };
  return (
    <div className={styles.block}>
      <Menu>
        <Menu.Item key='profile' icon={<UserOutlined />}>
          <Link href={"/user/" + dataUser.id}>
            <a>Профиль пользователя</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='create manga' icon={<PlusOutlined />}>
          <Link href='/createManga'>
            <a>Добавить мангу</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key='exit'
          onClick={handleExitUser}
          icon={<ExportOutlined />}
        >
          Выход
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuUser;
