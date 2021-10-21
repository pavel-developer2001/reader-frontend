import React, { useState } from "react";
import styles from "./SearchModal.module.scss";
import { Modal, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FoundBlock from "./components/FoundBlock";
const { Search } = Input;

const SearchModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState("");
  console.log("value", value);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setValue("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValue("");
  };
  return (
    <div>
      <div onClick={showModal}>
        <SearchOutlined /> Поиск
      </div>
      <Modal
        className={styles.modalSeacrch}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder='Что ищем, семпай?'
          value={value}
          className={styles.inputSearch}
          size='large'
          onChange={(e) => setValue(e.target.value)}
          prefix={<SearchOutlined />}
        />
        {value ? <FoundBlock /> : null}
      </Modal>
    </div>
  );
};

export default SearchModal;
