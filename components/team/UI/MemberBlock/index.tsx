import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";
import styles from "./MemberBlock.module.scss";

const MemberBlockItem: FC<any> = ({ role, userId, name, avatar }) => {
  const router = useRouter();
  return (
    <div className={styles.main} onClick={() => router.push("/user/" + userId)}>
      <Avatar
        size={54}
        src={
          avatar
            ? avatar
            : "https://api.remanga.org//media/users/2814/avatar.jpg"
        }
      />
      <div className={styles.data}>
        <strong>{name}</strong>
        <p>{role}</p>
      </div>
    </div>
  );
};

const MemberBlock: FC<any> = ({ members }) => {
  return (
    <div className={styles.mainBlock}>
      <div className={styles.title}>Состав</div>
      <div className={styles.mainList}>
        {members?.map((member: any) => (
          <MemberBlockItem
            key={member.id}
            role={member.roleInTeam}
            userId={member.user.id}
            name={member.user.name}
            avatar={member.user.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberBlock;
