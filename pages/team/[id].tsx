import { Avatar, Spin, Typography } from "antd";
const { Title, Paragraph, Text } = Typography;
import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { getTeam } from "../../store/modules/team/team.slice";
import { UpdateListItem } from "../../components/home/UI/UpdateList";
import { wrapper } from "../../store";
import {
  selectTeamItemData,
  selectTeamLoading,
} from "../../store/modules/team/team.selector";
import styles from "./Team.module.css";

const MemberBlock = dynamic(
  () => import("../../components/team/UI/MemberBlock"),
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
const DynamicCardManga = dynamic(() => import("../../components/CardManga"), {
  loading: () => (
    <div className="loader-block">
      <Spin />
    </div>
  ),
});

const { TabPane } = Tabs;

function callback(key: string) {
  console.log(key);
}

const Team = () => {
  const team = useSelector(selectTeamItemData);
  const loading = useSelector(selectTeamLoading);
  return (
    <DynamicMainLayout>
      {loading ? (
        <Spin />
      ) : (
        <>
          {" "}
          <div className={styles.header}>
            <div className={styles.avatar}>
              <Avatar
                shape="square"
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
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Профиль" key="1">
                <Paragraph>{team?.team?.teamDescription}</Paragraph>
                <MemberBlock members={team?.members} />
              </TabPane>
              <TabPane tab="Тайтлы" key="2">
                <div className={styles.mangaList}>
                  {team?.mangas?.map((manga: any) => (
                    <DynamicCardManga key={manga.id} manga={manga.manga} />
                  ))}
                </div>
              </TabPane>
              <TabPane tab="Лента" key="3">
                <div className={styles.update}>
                  {team?.chapters?.length > 0 ? (
                    team?.chapters?.map((chapter: any) => (
                      <UpdateListItem
                        key={chapter.id}
                        chapterId={chapter.chapter.id}
                        mangaId={chapter.manga.id}
                        cover={chapter.manga.mangaCover}
                        titleManga={chapter.manga.title}
                        numberChapter={chapter.chapter.numberChapter}
                        volumeChapter={chapter.chapter.volumeChapter}
                        date={chapter.chapter.createdAt}
                      />
                    ))
                  ) : (
                    <p>Команда не добавляла главы</p>
                  )}{" "}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </>
      )}
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
      await store.dispatch(getTeam(params.id));
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
export default Team;
