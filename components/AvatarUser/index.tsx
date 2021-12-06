import React from "react";
import { useSelector } from "react-redux";
import MenuUser from "./components/MenuUser";
import LoginModal from "./components/LoginModal";
import styles from "./AvatarUser.module.scss";
import { Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { selectUserToken } from "../../store/modules/user/user.selector";

const AvatarUser = () => {
  const token = useSelector(selectUserToken);
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
