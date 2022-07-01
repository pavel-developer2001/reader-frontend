import React, { useEffect, useState } from "react";
import { Modal, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useDebounce } from "../../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { searchManga } from "../../../store/modules/manga/manga.slice";
import styles from "./SearchModal.module.scss";

const DynamicFoundBlock = dynamic(() => import("./components/FoundBlock"), {
  loading: () => <Spin />,
});

const SearchModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const params = { title: value };
      //@ts-ignore
      dispatch(searchManga(params));
    }
  }, [debouncedSearchTerm]);

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
          placeholder="Что ищем, семпай?"
          value={value}
          className={styles.inputSearch}
          size="large"
          onChange={(e) => setValue(e.target.value)}
          prefix={<SearchOutlined />}
        />
        {value ? <DynamicFoundBlock /> : null}
      </Modal>
    </div>
  );
};

export default SearchModal;
