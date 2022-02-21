import React, { useState } from "react";
import styles from "./AvatarDrawer.module.scss";
import { Drawer } from "antd";
import {
  ExportOutlined,
  FormatPainterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { setToken } from "../../../../../../store/modules/user/user.slice";
import { selectUserToken } from "../../../../../../store/modules/user/user.selector";
import AuthModal from "../../../../../../components/AuthModal";

const AvatarHeader = ({ token }: any) => {
  return (
    <div className={styles.header}>
      {token ? (
        <>
          <div className={styles.headerUser}>
            <Avatar size='large' icon={<UserOutlined />} />
            <div className={styles.headerData}>
              <strong>UserName</strong>
              <span>0 ₽</span>
            </div>
          </div>
          <div>Пополнить Баланс</div>
        </>
      ) : (
        <AuthModal />
      )}
    </div>
  );
};

const AvatarDrawer = ({ changeTheme, menuArrays }: any) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);

  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const handleExitUser = () => {
    window.localStorage.removeItem("token");
    dispatch(setToken(""));
    message.success("Вы вышли из аккаунта");
  };
  return (
    <div className={styles.main}>
      <Avatar size='large' icon={<UserOutlined />} onClick={showDrawer} />
      <Drawer
        title={<AvatarHeader token={token} />}
        placement={"right"}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={"right"}
      >
        {menuArrays.left.map((menu: any, index: number) => (
          <p key={index} className={styles.menu}>
            <Link href={menu.link}>
              <a>{menu.title}</a>
            </Link>
          </p>
        ))}
        <p>
          <div className={styles.menu} onClick={changeTheme}>
            <FormatPainterOutlined /> Сменить цвет
          </div>
        </p>
        {token && (
          <p onClick={handleExitUser}>
            <ExportOutlined /> Выход
          </p>
        )}
      </Drawer>
    </div>
  );
};

export default AvatarDrawer;