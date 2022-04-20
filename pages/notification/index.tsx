import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Tabs } from "antd";
import MainLayout from "../../layouts/MainLayout";
import styles from "./Notification.module.scss";

const { TabPane } = Tabs;

function callback(key: string) {
  console.log(key);
}
const Notification = () => {
  return (
    <MainLayout>
      <div className={styles.header}>
        <div className={styles.leftBlog}>
          <h2> Уведомления</h2>
        </div>
        <div className={styles.rightBlog}>
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<CheckCircleOutlined />}
            />
          </div>
          <div>
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
          </div>
          <div></div>
        </div>
      </div>
      <div className={styles.body}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Обновление" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Социальное" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Важное" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Notification;
