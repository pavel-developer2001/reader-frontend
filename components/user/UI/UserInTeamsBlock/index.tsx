import { Avatar } from "antd";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamsForUser } from "../../../../store/slices/teamSlice";
import styles from "./UserInTeamsBlock.module.scss";

interface UserInTeamsBlockItemProps {
  cover: string;
  name: string;
  teamId: number;
}
const UserInTeamsBlockItem: FC<UserInTeamsBlockItemProps> = ({
  cover,
  name,
  teamId,
}) => {
  return (
    <Link href={"/team/" + teamId}>
      <a className={styles.main}>
        <Avatar
          shape='square'
          size={72}
          src={
            cover
              ? cover
              : "https://api.remanga.org//static/images/publishers/no-image.jpg"
          }
        />
        <strong>{name}</strong>
      </a>
    </Link>
  );
};
const UserInTeamsBlock = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const teams = useSelector<any>((state) => state.team.teamsUser);
  const loading = useSelector<any>((state) => state.team.loading);

  useEffect(() => {
    dispatch(getTeamsForUser(router.query.id));
  }, [router.query.id]);
  return (
    <div className={styles.block}>
      <div className={styles.title}>В составе</div>
      <div className={styles.mainList}>
        {loading ? (
          <p>loading</p>
        ) : teams.length > 0 ? (
          teams.map((team: any) => (
            <UserInTeamsBlockItem
              key={team.id}
              cover={team.team.teamCover}
              name={team.team.teamName}
              teamId={team.team.id}
            />
          ))
        ) : (
          <p>Пусто</p>
        )}
      </div>
    </div>
  );
};

export default UserInTeamsBlock;
