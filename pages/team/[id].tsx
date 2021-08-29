import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./Team.module.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

const Team = () => {
  return (
    <MainLayout>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Avatar shape='square' size={150} icon={<UserOutlined />} />
          <span>Бронзовый Переводчик</span>
        </div>
        <div>
          <Title level={2}>Covenant Ямато</Title>
          <Paragraph>
            Каждый в цирке думает, что знает в цирке, но не каждый, что в цирке
            знает, что в цирке не каждый знает думает.
          </Paragraph>
          <Text strong>30 тайтлов 823.8K лайков 81 глав/мес</Text>
        </div>
      </div>
      <div>
        {" "}
        <Tabs defaultActiveKey='1' onChange={callback}>
          <TabPane tab='Профиль' key='1'>
            Профиль Состав команды
          </TabPane>
          <TabPane tab='Тайтлы' key='2'>
            Тайтлы
          </TabPane>
          <TabPane tab='Лента' key='3'>
            Лента
          </TabPane>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Team;
