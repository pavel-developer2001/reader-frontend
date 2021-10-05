import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "./CardTeam.module.scss";

const CardTeam = () => {
  const router = useRouter();
  return (
    <div className={styles.main} onClick={() => router.push("/team/1")}>
      <div className={styles.left}>
        <Avatar
          shape='square'
          className={styles.avatar}
          size={56}
          src='https://api.remanga.org//media/publishers/syndicate_manga_team/low_cover.jpg'
        />
      </div>
      <div className={styles.right}>
        <strong>ArticaProject</strong>
        <p>Всё что мы делаем - это поступок. Без поступка нас не существует.</p>
      </div>
    </div>
  );
};

export default CardTeam;
