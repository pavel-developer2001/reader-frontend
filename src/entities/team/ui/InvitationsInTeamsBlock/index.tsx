import { Button, message, Spin } from "antd";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  agreeToJoin,
  getInvitationsForUser,
  refucalToJoin,
} from "../../model/team.slice";
import {
  selectTeamInvitationsData,
  selectTeamLoading,
} from "../../model/team.selector";
import styles from "./InvitationsInTeamsBlock.module.scss";
import dynamic from "next/dynamic";

const DynamicInvitationBtn = dynamic(
  () => import("./components/InvitationBtn"),
  {
    loading: () => <Spin />,
  }
);

interface InvitationsInTeamsBlockItemProps {
  invitationId: number;
  rank: string;
  teamId: number;
  name: string;
  userId: string | string[] | undefined;
}
const InvitationsInTeamsBlockItem: FC<InvitationsInTeamsBlockItemProps> = memo(
  ({ invitationId, rank, teamId, name, userId }) => {
    const dispatch = useDispatch();
    const handleAgreetoJoin = async (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
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
  }
);

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
          <Spin />
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
      <DynamicInvitationBtn />
    </div>
  );
};

export default InvitationsInTeamsBlock;
