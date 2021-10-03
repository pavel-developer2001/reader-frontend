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
import CardTeam from "../../components/CardTeam";
import CreateTeamModal from "../../components/user/UI/CreateTeamModal";
import MainLayout from "../../layouts/MainLayout";
import { getBookMarks } from "../../store/slices/bookMarkSlice";
import { getUserData } from "../../store/slices/userSlice";
import styles from "./Users.module.scss";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector<any>((state) => state.user.user);
  const loading = useSelector<any>((state) => state.user.loading);
  const bookMarks = useSelector<any>((state) => state.bookMark.bookMarks);
  const loadingMark = useSelector<any>((state) => state.bookMark.loading);
  const [tabPosition, setTabPosition] = useState("left");

  useEffect(() => {
    dispatch(getUserData(router.query.id));
  }, [router.query.id]);
  useEffect(() => {
    dispatch(getBookMarks(router.query.id));
  }, [router.query.id]);
  const info = [
    { count: "13.9K", text: "Прочитано глав" },
    { count: "10.8K", text: "Лайков к главам" },
    { count: "687", text: "Комментариев" },
  ];

  return (
    <MainLayout>
      <div className={styles.main}>
        {loading ? (
          <p>loading</p>
        ) : (
          <>
            <div className={styles.header}>
              {" "}
              {user.avatar ? (
                <Avatar size={156} src={user.avatar} />
              ) : (
                <Avatar
                  size={156}
                  src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                />
              )}
              <div className={styles.userData}>
                <Title level={3} className={styles.name}>
                  {user.name}
                </Title>
                <div className={styles.count}>
                  {info.map((obj) => (
                    <div className={styles.text}>
                      <strong>{obj.count}</strong> {obj.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>{" "}
            <div className={styles.body}>
              <Tabs tabPosition={tabPosition}>
                <TabPane tab='Профиль' key='1'>
                  id: {user.id} Пол: Мужской
                </TabPane>
                <TabPane tab='Закладки' key='2'>
                  <div className={styles.markList}>
                    {" "}
                    {loadingMark ? (
                      <p>loading</p>
                    ) : bookMarks.length > 0 ? (
                      bookMarks.map((mark: any, index) => (
                        <CardManga key={mark.id} manga={mark.manga} />
                      ))
                    ) : (
                      <Empty description={<span>Пусто</span>} />
                    )}
                  </div>
                </TabPane>
                <TabPane tab='Команды' key='3'>
                  <div>
                    <span>В составе комманд: пусто</span>
                    <CardTeam />
                    <CreateTeamModal />
                  </div>
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
