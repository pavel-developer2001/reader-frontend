import { ExportOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, message } from "antd";
import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setToken } from "../../../../model/user.slice";
import { dataUser } from "../../../../../../shared/lib/utils/getDataUserFromToken";
import styles from "./MenuUser.module.css";

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
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link href={"/user/" + dataUser}>
            <a>Профиль пользователя</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="create manga" icon={<PlusOutlined />}>
          <Link href="/createManga">
            <a>Добавить мангу</a>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="exit"
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
