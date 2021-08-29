import { ExportOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import Link from "next/link";
import styles from "./MenuUser.module.css";

const MenuUser = () => {
  return (
    <div className={styles.block}>
      <Menu>
        <Menu.Item icon={<UserOutlined />}>
          <Link href='/user/1'>
            <a>Профиль пользователя</a>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<PlusOutlined />}>
          <Link href='/createManga'>
            <a>Добавить мангу</a>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<ExportOutlined />}>Выход</Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuUser;
