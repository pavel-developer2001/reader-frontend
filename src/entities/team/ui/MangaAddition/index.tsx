import { useRouter } from "next/dist/client/router"
import  { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Spin } from "antd"
import { getTeamsForManga } from "../../model/team.slice"
import CardTeam from "../CardTeam"
import {
  selectTeamLoading,
  selectTeamsMangaData,
} from "../../model/team.selector"
import styles from "./MangaAddition.module.scss"

const MangaAddition = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const teams = useSelector(selectTeamsMangaData)

  const loading = useSelector(selectTeamLoading)
  useEffect(() => {
    dispatch(getTeamsForManga(router.query.id))
  }, [router.query.id])
  return (
    <div className={styles.addition}>
      <div className={styles.title}>Переводчики</div>
      <div className={styles.teamList}>
        {loading ? (
          <Spin />
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
  )
}

export default MangaAddition
