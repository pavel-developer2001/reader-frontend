import React from "react";
import { useSelector } from "react-redux";
import MenuUser from "../MenuUser";
import LoginModal from "../LoginModal";
import styles from "./AvatarUser.module.scss";
import { Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AvatarUser = () => {
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
    <>
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
    </>
  );
};

export default AvatarUser;
