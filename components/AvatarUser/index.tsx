import React from "react";
import { useSelector } from "react-redux";
import MenuUser from "./components/MenuUser";
import styles from "./AvatarUser.module.scss";
import { Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { selectUserToken } from "../../store/modules/user/user.selector";
import AuthModal from "../AuthModal";

const AvatarUser = () => {
  const token = useSelector(selectUserToken);
  return (
    <>
      {token ? (
        <div className={styles.menu}>
          <Popover placement='bottom' content={<MenuUser />} trigger='click'>
            <Avatar size='large' icon={<UserOutlined />} />
          </Popover>
        </div>
      ) : (
        <AuthModal />
      )}
    </>
  );
};

export default AvatarUser;
