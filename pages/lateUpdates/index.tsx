import React from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./LateUpdates.module.scss";
import { Typography } from "antd";
import UpdateList from "../../components/lateUpdates/UI/UpdateList";

const { Title } = Typography;

const LateUpdates = () => {
  return (
    <MainLayout>
      <Title className={styles.title} level={1}>
        Обновления
      </Title>
      <UpdateList />
    </MainLayout>
  );
};

export default LateUpdates;
