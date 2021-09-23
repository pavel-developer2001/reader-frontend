import { ExportOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import Link from "next/link";
import styles from "./MenuUser.module.css";
import { setToken } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { dataUser } from "../../utils/getDataUserFromToken";

const MenuUser = () => {
  const dispatch = useDispatch();
  const handleExitUser = () => {
    window.localStorage.removeItem("token");
    dispatch(setToken(""));
  };
  return (
    <div className={styles.block}>
      <Menu>
        <Menu.Item icon={<UserOutlined />}>
          <Link href={"/user/" + dataUser.id}>
            <a>Профиль пользователя</a>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<PlusOutlined />}>
          <Link href='/createManga'>
            <a>Добавить мангу</a>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={handleExitUser} icon={<ExportOutlined />}>
          Выход
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuUser;
