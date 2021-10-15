import { Avatar, Button } from "antd";
import Link from "next/link";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { removeMember } from "../../../../store/slices/teamSlice";
import styles from "./MemberBlock.module.scss";

const MemberBlockItem: FC<any> = ({ id, role, userId, name, avatar }) => {
  const dispatch = useDispatch();
  const handleRemoveMember = async () => {
    await dispatch(removeMember(id));
  };
  return (
    <div>
      {" "}
      <Link href={"/user/" + userId}>
        <a className={styles.main}>
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
        </a>
      </Link>
      <div>
        {role != "Глава" ? (
          <Button type='primary' onClick={handleRemoveMember}>
            Удалить
          </Button>
        ) : null}
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
            id={member.id}
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
