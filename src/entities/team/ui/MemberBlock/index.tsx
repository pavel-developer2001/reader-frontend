import { Avatar, Button } from "antd"
import Link from "next/link"
import React, { FC, memo } from "react"
import { useDispatch } from "react-redux"
import { IMember } from "../../../../shared/api/reader/models"
import { removeMember } from "../../model/team.slice"
import styles from "./MemberBlock.module.scss"

interface MemberBlockItemProps {
  id: number
  role: string
  userId: number
  name: string
  avatar: string
}
const MemberBlockItem: FC<MemberBlockItemProps> = memo(
  ({ id, role, userId, name, avatar }) => {
    const dispatch = useDispatch()
    const handleRemoveMember = async () => {
      await dispatch(removeMember(id))
    }
    return (
      <div>
        {" "}
        <Link href={`/user/${userId}`}>
          <a className={styles.main}>
            <Avatar
              size={54}
              src={
                avatar || "https://api.remanga.org//media/users/2814/avatar.jpg"
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
            <Button type="primary" onClick={handleRemoveMember}>
              Удалить
            </Button>
          ) : null}
        </div>
      </div>
    )
  }
)
interface MemberBlockProps {
  members: IMember[]
}
const MemberBlock: FC<MemberBlockProps> = ({ members }) => (
  <div className={styles.mainBlock}>
    <div className={styles.title}>Состав</div>
    <div className={styles.mainList}>
      {members?.map((member) => (
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
)

export default MemberBlock
