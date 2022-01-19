import { Avatar } from "antd";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamsForUser } from "../../../../store/modules/team/team.slice";
import styles from "./UserInTeamsBlock.module.scss";
import {
  selectTeamLoading,
  selectTeamsUserData,
} from "../../../../store/modules/team/team.selector";
import { dataUser } from "../../../../utils/getDataUserFromToken";

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
  const teams = useSelector(selectTeamsUserData);
  const loading = useSelector(selectTeamLoading);

  useEffect(() => {
    dispatch(getTeamsForUser(dataUser));
  }, [router.query.id]);
  return (
    <div className={styles.block}>
      <div className={styles.title}>В составе</div>
      <div className={styles.mainList}>
        {loading ? (
          <p>loading</p>
        ) : teams.length > 0 ? (
          teams.map((team) => (
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
