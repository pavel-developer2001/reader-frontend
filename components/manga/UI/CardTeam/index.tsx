import { Avatar } from "antd";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./CardTeam.module.scss";

interface CardTeamProps {
  teamId: number;
  name: string;
  subtitle: string;
  cover: string;
}
const CardTeam: FC<CardTeamProps> = ({ teamId, name, subtitle, cover }) => {
  return (
    <Link href={"/team/" + teamId}>
      <a className={styles.main}>
        {" "}
        <div className={styles.left}>
          <Avatar
            shape='square'
            className={styles.avatar}
            size={56}
            src={
              cover
                ? cover
                : "https://api.remanga.org//media/publishers/syndicate_manga_team/low_cover.jpg"
            }
          />
        </div>
        <div className={styles.right}>
          <strong>{name}</strong>
          <p>{subtitle}</p>
        </div>
      </a>
    </Link>
  );
};

export default CardTeam;
