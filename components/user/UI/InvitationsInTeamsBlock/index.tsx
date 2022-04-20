import { Button, message } from "antd";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  agreeToJoin,
  getInvitationsForUser,
  refucalToJoin,
} from "../../../../store/modules/team/team.slice";
import { dataUser } from "../../../../utils/getDataUserFromToken";
import {
  selectTeamInvitationsData,
  selectTeamLoading,
} from "../../../../store/modules/team/team.selector";
import InvitationBtn from "./components/InvitationBtn";
import styles from "./InvitationsInTeamsBlock.module.scss";

interface InvitationsInTeamsBlockItemProps {
  invitationId: number;
  rank: string;
  teamId: number;
  name: string;
  userId: string | string[] | undefined;
}
const InvitationsInTeamsBlockItem: FC<InvitationsInTeamsBlockItemProps> = ({
  invitationId,
  rank,
  teamId,
  name,
  userId,
}) => {
  const dispatch = useDispatch();
  const handleAgreetoJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload = await {
        invitationId,
        rank,
        teamId,
        userId,
      };
      await dispatch(agreeToJoin(payload));
      message.success("Вы были успешно приняты в команду");
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  const handleRefucalToJoin = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await dispatch(refucalToJoin(invitationId));
      message.success("Отказ был принят");
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  return (
    <div className={styles.item}>
      <p>
        Хотите вступить в команду{" "}
        <Link href={"/team/" + teamId}>
          <a className={styles.nameTeam}>{name}</a>
        </Link>
        в качестве
        <span> "{rank}а"</span>?
        <div className={styles.answer}>
          <Button type="primary" onClick={handleAgreetoJoin}>
            Да
          </Button>
          <Button onClick={handleRefucalToJoin}>Нет</Button>
        </div>
      </p>
    </div>
  );
};

const InvitationsInTeamsBlock = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const invitaions = useSelector(selectTeamInvitationsData);
  const loading = useSelector(selectTeamLoading);
  useEffect(() => {
    dispatch(getInvitationsForUser(router.query.id));
  }, [router]);
  return (
    <div className={styles.block}>
      <div className={styles.title}>Приглашения в команды</div>
      <div className={styles.list}>
        {loading ? (
          <p>loading</p>
        ) : invitaions?.length > 0 ? (
          invitaions?.map((invitation) => (
            <InvitationsInTeamsBlockItem
              key={invitation.id}
              invitationId={invitation.id}
              rank={invitation.rank}
              teamId={invitation.team?.id}
              name={invitation.team.teamName}
              userId={router.query.id}
            />
          ))
        ) : (
          <p>Нет приглашений</p>
        )}
      </div>
      <InvitationBtn />
    </div>
  );
};

export default InvitationsInTeamsBlock;
