import { Avatar, Empty } from "antd";
import { Typography } from "antd";
import { Tabs } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";

const { TabPane } = Tabs;
const { Title } = Typography;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardManga from "../../components/CardManga";
import CreateTeamModal from "../../components/user/UI/CreateTeamModal";
import InvitationsInTeamsBlock from "../../components/user/UI/InvitationsInTeamsBlock";
import UserInTeamsBlock from "../../components/user/UI/UserInTeamsBlock";
import MainLayout from "../../layouts/MainLayout";
import { wrapper } from "../../store";
import { getBookMarks } from "../../store/modules/bookMark/bookMark.slice";
import { getUserData } from "../../store/modules/user/user.slice";
import styles from "./Users.module.scss";
import {
  selectUserData,
  selectUserLoading,
} from "../../store/modules/user/user.selector";
import {
  selectBookMarkLoading,
  selectBookMarksData,
} from "../../store/modules/bookMark/bookMark.selector";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUserData);
  const loading = useSelector(selectUserLoading);
  const bookMarks = useSelector(selectBookMarksData);
  const loadingMark = useSelector(selectBookMarkLoading);
  const [tabPosition, setTabPosition] = useState("left");

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
                  {info.map((obj, index) => (
                    <div className={styles.text} key={index}>
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
                      bookMarks.map((mark, index) => (
                        <CardManga key={mark.id} manga={mark.manga} />
                      ))
                    ) : (
                      <Empty description={<span>Пусто</span>} />
                    )}
                  </div>
                </TabPane>
                <TabPane tab='Команды' key='3'>
                  <div>
                    <UserInTeamsBlock />
                    <InvitationsInTeamsBlock />
                    <CreateTeamModal />
                  </div>
                </TabPane>
                <TabPane tab='Сообщения' key='4'>
                  <div>сообщения</div>
                </TabPane>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    try {
      //@ts-ignore
      await store.dispatch(getUserData(params.id));
      return {
        props: {},
      };
    } catch (error) {
      console.log("ERROR!", error);
      return {
        props: {},
      };
    }
  });
export default User;
