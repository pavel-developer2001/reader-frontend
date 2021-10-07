import { Avatar } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import styles from "./CardTeam.module.scss";

const CardTeam: FC<any> = ({ teamId, name, subtitle, cover }) => {
  const router = useRouter();
  return (
    <div className={styles.main} onClick={() => router.push("/team/" + teamId)}>
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
    </div>
  );
};

export default CardTeam;
