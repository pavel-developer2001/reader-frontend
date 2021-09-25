import { UserOutlined } from "@ant-design/icons";
import { Avatar, Empty } from "antd";
import { Typography } from "antd";
import { Tabs } from "antd";
import { useRouter } from "next/dist/client/router";

const { TabPane } = Tabs;
const { Title } = Typography;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardManga from "../../components/CardManga";
import CreateTeamModal from "../../components/CreateTeamModal";
import MainLayout from "../../layouts/MainLayout";
import { getUserData } from "../../store/slices/userSlice";
import styles from "./Users.module.css";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector<any>((state) => state.user.user);
  const loading = useSelector<any>((state) => state.user.loading);

  useEffect(() => {
    dispatch(getUserData(router.query.id));
  }, []);
  const info = [
    { count: "13.9K", text: "Прочитано глав" },
    { count: "10.8K", text: "Лайков к главам" },
    { count: "687", text: "Комментариев" },
  ];

  return (
    <MainLayout>
      <div>
        {loading ? (
          <p>loading</p>
        ) : (
          <>
            {user.avatar ? (
              <Avatar size={156} src={user.avatar} />
            ) : (
              <Avatar
                size={156}
                src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              />
            )}
            <div>
              <Title level={3}>{user.name}</Title>
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
              <Tabs defaultActiveKey='1'>
                <TabPane tab='Профиль' key='1'>
                  id: {user.id} Пол: Мужской
                </TabPane>
                <TabPane tab='Закладки' key='2'>
                  <div className={styles.list}>
                    {/* <CardManga />
                    <CardManga />
                    <CardManga />
                    <CardManga /> */}
                  </div>
                </TabPane>
                <TabPane tab='Подписки' key='3'>
                  <Empty description={<span>Пусто</span>} />
                </TabPane>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default User;
