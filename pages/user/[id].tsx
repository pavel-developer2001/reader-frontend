import React, { useEffect} from "react";
import { Avatar, Empty, Spin } from "antd";
import { Typography } from "antd";
import { Tabs } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { wrapper } from "../../store";
import { getBookMarks } from "../../store/modules/bookMark/bookMark.slice";
import { getUserData } from "../../store/modules/user/user.slice";
import {
  selectUserData,
  selectUserLoading,
  selectUserToken,
} from "../../store/modules/user/user.selector";
import {
  selectBookMarkLoading,
  selectBookMarksData,
} from "../../store/modules/bookMark/bookMark.selector";
import styles from "./Users.module.scss";

const CreateTeamModal = dynamic(
  () => import("../../components/pages/user/CreateTeamModal"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin />
      </div>
    ),
  }
);
const InvitationsInTeamsBlock = dynamic(
  () => import("../../components/pages/user/InvitationsInTeamsBlock"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin />
      </div>
    ),
  }
);
const UserInTeamsBlock = dynamic(
  () => import("../../components/pages/user/UserInTeamsBlock"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin />
      </div>
    ),
  }
);
const DynamicCardManga = dynamic(
  () => import("../../components/UI/CardManga"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin />
      </div>
    ),
  }
);
const DynamicMainLayout = dynamic(() => import("../../layouts/MainLayout"), {
  loading: () => (
    <div className="loader-block">
      <Spin size="large" />
    </div>
  ),
});

const { TabPane } = Tabs;
const { Title } = Typography;

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector(selectUserToken);
  const user = useSelector(selectUserData);
  const loading = useSelector(selectUserLoading);
  const bookMarks = useSelector(selectBookMarksData);
  const loadingMark = useSelector(selectBookMarkLoading);

  useEffect(() => {
    dispatch(getBookMarks(router.query.id));
  }, [router.query.id]);
  const info = [
    { count: "13.9K", text: "Прочитано глав" },
    { count: "10.8K", text: "Лайков к главам" },
    { count: "687", text: "Комментариев" },
  ];

  return (
    <DynamicMainLayout>
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
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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
              <Tabs tabPosition={"left"}>
                <TabPane tab="Профиль" key="1">
                  id: {user.id} Пол: Мужской
                </TabPane>
                <TabPane tab="Закладки" key="2">
                  <div className={styles.markList}>
                    {" "}
                    {loadingMark ? (
                      <Spin />
                    ) : bookMarks.length > 0 ? (
                      bookMarks.map((mark, index) => (
                        <DynamicCardManga key={mark.id} manga={mark.manga} />
                      ))
                    ) : (
                      <Empty description={<span>Пусто</span>} />
                    )}
                  </div>
                </TabPane>
                <TabPane tab="Команды" key="3">
                  <div>
                    <UserInTeamsBlock />
                    {token && (
                      <>
                        <InvitationsInTeamsBlock /> <CreateTeamModal />
                      </>
                    )}
                  </div>
                </TabPane>
                <TabPane tab="Сообщения" key="4">
                  <div>сообщения</div>
                </TabPane>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </DynamicMainLayout>
  );
};
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params, res }) => {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );
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
