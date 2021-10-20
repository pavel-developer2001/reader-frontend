import { Avatar, Typography } from "antd";
const { Title, Paragraph, Text } = Typography;
import React, { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./Team.module.css";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { getTeam } from "../../store/slices/teamSlice";
import MemberBlock from "../../components/team/UI/MemberBlock";
import CardManga from "../../components/CardManga";
import { UpdateListItem } from "../../components/lateUpdates/UI/UpdateList";

const { TabPane } = Tabs;

function callback(key: string) {
  console.log(key);
}

const Team = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const team = useSelector<any>((state) => state.team.team);
  const loading = useSelector<any>((state) => state.team.loading);
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
                <div className={styles.mangaList}>
                  {team?.mangas?.map((manga: any) => (
                    <CardManga key={manga.id} manga={manga.manga} />
                  ))}
                </div>
              </TabPane>
              <TabPane tab='Лента' key='3'>
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
    </MainLayout>
  );
};

export default Team;
