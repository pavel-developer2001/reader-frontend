import { UserOutlined } from "@ant-design/icons";
import { Avatar, Empty } from "antd";
import { Typography } from "antd";
import { Tabs } from "antd";

const { TabPane } = Tabs;
const { Title } = Typography;
import React from "react";
import CardManga from "../../components/CardManga";
import CreateTeamModal from "../../components/CreateTeamModal";
import MainLayout from "../../layouts/MainLayout";
import styles from "./Users.module.css";

const User = () => {
  const [haveAvatar, setHaveAvatar] = React.useState(true);
  const info = [
    { count: "13.9K", text: "Прочитано глав" },
    { count: "10.8K", text: "Лайков к главам" },
    { count: "687", text: "Комментариев" },
  ];
  function callback(key: string) {
    console.log(key);
  }

  return (
    <MainLayout>
      <div>
        {haveAvatar ? (
          <Avatar
            size={156}
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          />
        ) : (
          <Avatar size={156} icon={<UserOutlined />} />
        )}
        <div>
          <Title level={3}>Heodark</Title>
          {info.map((obj, index) => (
            <div key={index}>
              {obj.count} {obj.text}
            </div>
          ))}
          <div>
            <span>В составе комманд: пусто</span>
            <CreateTeamModal />
          </div>
        </div>
        <div>
          <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab='Профиль' key='1'>
              id: 21319 Пол: Мужской
            </TabPane>
            <TabPane tab='Закладки' key='2'>
              <div className={styles.list}>
                <CardManga />
                <CardManga />
                <CardManga />
                <CardManga />
              </div>
            </TabPane>
            <TabPane tab='Подписки' key='3'>
              <Empty description={<span>Пусто</span>} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default User;
