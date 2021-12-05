import { Avatar } from "antd";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITeam } from "../../../../models/ITeam";
import { RootState } from "../../../../store/reducer";
import { getTeams } from "../../../../store/modules/team/teamSlice";
import styles from "./TeamList.module.scss";

interface TeamListItemProps {
  teamId: number;
  name: string;
  subtitle: string;
  cover: string;
}
const TeamListItem: FC<TeamListItemProps> = ({
  teamId,
  name,
  subtitle,
  cover,
}) => {
  return (
    <Link href={"/team/" + teamId}>
      <a className={styles.main}>
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
      </a>
    </Link>
  );
};
const TeamList = () => {
  const dispatch = useDispatch();
  const teams = useSelector<RootState, ITeam[]>((state) => state.team.teams);
  const loading = useSelector<RootState>((state) => state.team.loading);
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
