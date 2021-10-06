import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;
import React, { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./Team.module.css";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { getTeam } from "../../store/slices/teamSlice";
import MemberBlock from "../../components/team/UI/MemberBlock";

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

const Team = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const team = useSelector<any>((state) => state.team.team);
  const loading = useSelector<any>((state) => state.team.loading);
  console.log("Team", team, loading);
  useEffect(() => {
    dispatch(getTeam(router.query.id));
  }, [router.query.id]);
  return (
    <MainLayout>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          {" "}
          <div className={styles.header}>
            <div className={styles.avatar}>
              <Avatar
                shape='square'
                size={150}
                src={
                  team?.team?.teamCover
                    ? team?.team?.teamCover
                    : "https://api.remanga.org//media/publishers/1910/high_cover.jpg"
                }
              />
              <span>{team?.team?.teamRank} Переводчик</span>
            </div>
            <div>
              <Title level={2}>{team?.team?.teamName}</Title>
              <Paragraph>{team?.team?.teamSubtitle}</Paragraph>
              <Text strong>30 тайтлов 823.8K лайков 81 глав/мес</Text>
            </div>
          </div>
          <div>
            {" "}
            <Tabs defaultActiveKey='1' onChange={callback}>
              <TabPane tab='Профиль' key='1'>
                <Paragraph>{team?.team?.teamDescription}</Paragraph>
                <MemberBlock members={team?.members} />
              </TabPane>
              <TabPane tab='Тайтлы' key='2'>
                Тайтлы
              </TabPane>
              <TabPane tab='Лента' key='3'>
                Лента
              </TabPane>
            </Tabs>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Team;
