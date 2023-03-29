import { Avatar, Spin } from "antd"
import Link from "next/link"
import  { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTeams } from "../../model/team.slice"
import { selectTeamLoading, selectTeamsData } from "../../model/team.selector"
import styles from "./TeamList.module.scss"

interface TeamListItemProps {
  teamId: number
  name: string
  subtitle: string
  cover: string
}
const TeamListItem: FC<TeamListItemProps> = ({
  teamId,
  name,
  subtitle,
  cover,
}) => (
  <Link href={`/team/${teamId}`}>
    <a className={styles.main}>
      <Avatar
        size={100}
        src={
          cover || "https://api.remanga.org//media/publishers/254/mid_cover.jpg"
        }
      />
      <div className={styles.content}>
        <strong>{name}</strong>
        <p>{subtitle}</p>
      </div>
    </a>
  </Link>
)
const TeamList = () => {
  const dispatch = useDispatch()
  const teams = useSelector(selectTeamsData)
  const loading = useSelector(selectTeamLoading)
  useEffect(() => {
    dispatch(getTeams())
  }, [])
  return (
    <div className={styles.mainList}>
      {loading ? (
        <Spin />
      ) : teams.length > 0 ? (
        teams.map((team) => (
          <TeamListItem
            key={team.id}
            teamId={team.id}
            name={team.teamName}
            subtitle={team.teamSubtitle}
            cover={team.teamCover}
          />
        ))
      ) : (
        <p>Пусто</p>
      )}
    </div>
  )
}

export default TeamList
