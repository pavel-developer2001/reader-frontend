import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITeamsForManga } from "../../../../models/ITeam";
import { RootState } from "../../../../store/reducer";
import { getTeamsForManga } from "../../../../store/slices/teamSlice";
import CardTeam from "../CardTeam";
import styles from "./MangaAddition.module.css";

const MangaAddition = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const teams = useSelector<RootState, ITeamsForManga[]>(
    (state) => state.team.teamsManga
  );

  const loading = useSelector<RootState>((state) => state.team.loading);
  useEffect(() => {
    dispatch(getTeamsForManga(router.query.id));
  }, [router.query.id]);
  return (
    <div className={styles.addition}>
      <div className={styles.title}>Переводчики</div>
      <div className={styles.teamList}>
        {loading ? (
          <p>loading</p>
        ) : teams.length > 0 ? (
          teams.map((team) => (
            <CardTeam
              key={team.id}
              teamId={team.team.id}
              name={team.team.teamName}
              subtitle={team.team.teamSubtitle}
              cover={team.team.teamCover}
            />
          ))
        ) : (
          <p>Пусто</p>
        )}
      </div>

      <div className={styles.title}>Похожее</div>
    </div>
  );
};

export default MangaAddition;
