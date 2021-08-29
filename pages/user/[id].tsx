import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Empty, Modal } from "antd";
import { Typography } from "antd";
import { Tabs } from "antd";
import TextArea from "antd/lib/input/TextArea";

const { TabPane } = Tabs;
const { Title } = Typography;
import React from "react";
import CardManga from "../../components/CardManga";
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
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [value, setValue] = React.useState<string>("");
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
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={showModal}
              size='large'
            >
              Создать новую
            </Button>
            <Modal
              title='Создать новую команду'
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <TextArea placeholder='Название команды' autoSize />
              <div style={{ margin: "24px 0" }} />
              <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Описание'
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              <div style={{ margin: "24px 0" }} />
              <Button type='primary' size='large'>
                Создать
              </Button>
            </Modal>
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
