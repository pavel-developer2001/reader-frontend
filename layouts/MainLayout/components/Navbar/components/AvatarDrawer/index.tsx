import React, { FC, useState } from "react";
import styles from "./AvatarDrawer.module.scss";
import { Drawer, Spin } from "antd";
import {
  ExportOutlined,
  FormatPainterOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { setToken } from "../../../../../../store/modules/user/user.slice";
import { selectUserToken } from "../../../../../../store/modules/user/user.selector";
import { dataUser } from "../../../../../../utils/getDataUserFromToken";
import dynamic from "next/dynamic";

const DynamicAuthModal = dynamic(
  () => import("../../../../../../components/UI/AuthModal"),
  {
    loading: () => <Spin />,
  }
);

const AvatarHeader = ({ token }: any) => {
  return (
    <div className={styles.header}>
      {token ? (
        <>
          <div className={styles.headerUser}>
            <Link href={"/user/" + dataUser}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Link>

            <div className={styles.headerData}>
              {" "}
              <strong>
                <Link href={"/user/" + dataUser}>UserName</Link>
              </strong>{" "}
              <span>0 ₽</span>
            </div>
          </div>
          <div>Пополнить Баланс</div>
        </>
      ) : (
        <DynamicAuthModal />
      )}
    </div>
  );
};
interface AvatarDrawerProps {
  changeTheme: any;
  menuArrays: any;
}

const AvatarDrawer: FC<AvatarDrawerProps> = ({ changeTheme, menuArrays }) => {
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
      <Avatar size="large" icon={<UserOutlined />} onClick={showDrawer} />
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
        {token && (
          <p>
            <Link href="/createManga">
              <a>
                <PlusOutlined />
                Добавить мангу
              </a>
            </Link>
          </p>
        )}

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
