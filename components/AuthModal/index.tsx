import React from "react";
import LoginModal from "../AvatarUser/components/LoginModal";
import styles from "./AuthModal.module.scss";

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
      <LoginModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        setIsModalVisible={setIsModalVisible}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default AuthModal;
