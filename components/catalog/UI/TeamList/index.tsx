import { Avatar } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../../../store/slices/teamSlice";
import styles from "./TeamList.module.scss";

const TeamListItem: FC<any> = ({ teamId, name, subtitle, cover }) => {
  const router = useRouter();
  return (
    <div className={styles.main} onClick={() => router.push("/team/" + teamId)}>
      <Avatar
        size={100}
        src={
          cover
            ? cover
            : "https://api.remanga.org//media/publishers/254/mid_cover.jpg"
        }
      />
      <div className={styles.content}>
        <strong>{name}</strong>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};
const TeamList = () => {
  const dispatch = useDispatch();
  const teams = useSelector<any>((state) => state.team.teams);
  const loading = useSelector<any>((state) => state.team.loading);
  useEffect(() => {
    dispatch(getTeams());
  }, []);
  return (
    <div className={styles.mainList}>
      {loading ? (
        <p>loading</p>
      ) : teams.length > 0 ? (
        teams.map((team) => (
          <TeamListItem
            key={team.id}
            teamId={team.id}
            name={team.teamName}
            subtitle={team.teamSubtitle}
            cover={team.teamCover}
          />
        ))
      ) : (
        <p>Пусто</p>
      )}
    </div>
  );
};

export default TeamList;