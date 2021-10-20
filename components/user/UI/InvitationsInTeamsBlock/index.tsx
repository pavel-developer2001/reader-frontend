import { Button } from "antd";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  agreeToJoin,
  getInvitationsForUser,
  refucalToJoin,
} from "../../../../store/slices/teamSlice";
import { dataUser } from "../../../../utils/getDataUserFromToken";
import InvitationBtn from "./components/InvitationBtn";
import styles from "./InvitationsInTeamsBlock.module.scss";

interface InvitationsInTeamsBlockItemProps {
  invitationId: number;
  rank: string;
  teamId: number;
  name: string;
}
const InvitationsInTeamsBlockItem: FC<InvitationsInTeamsBlockItemProps> = ({
  invitationId,
  rank,
  teamId,
  name,
}) => {
  const dispatch = useDispatch();
  const handleAgreetoJoin = async (e: any) => {
    e.preventDefault();
    try {
      const payload = await { invitationId, rank, teamId, userId: dataUser.id };
      await dispatch(agreeToJoin(payload));
    } catch (error) {}
  };
  const handleRefucalToJoin = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(refucalToJoin(invitationId));
    } catch (error) {}
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
          <Button type='primary' onClick={handleAgreetoJoin}>
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
  const invitaions = useSelector<any>((state) => state.team.teamInvitations);
  const loading = useSelector<any>((state) => state.team.loading);
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
          invitaions?.map((invitation: any) => (
            <InvitationsInTeamsBlockItem
              key={invitation.id}
              invitationId={invitation.id}
              rank={invitation.rank}
              teamId={invitation.team?.id}
              name={invitation.team.teamName}
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
