import { Spin } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import styles from "./AuthModal.module.scss";

const DynamicLoginModal = dynamic(
  () => import("../AvatarUser/components/LoginModal"),
  { loading: () => <Spin /> }
);

const AuthModal = () => {
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
      <div className={styles.menu} onClick={showModal}>
        Войти
      </div>
      <DynamicLoginModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        setIsModalVisible={setIsModalVisible}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default AuthModal;
