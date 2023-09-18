import { Avatar, Spin } from "antd"
import Link from "next/link"
import { FC } from "react"
import { useSelector } from "react-redux"
import { IManga } from "../../../../shared/api/reader/models"
import {
  selectSearchListManga,
  selectSearchLoading,
} from "../../model/manga.selector"

import styles from "./FoundBlock.module.scss"

const FoundBlockItem: FC<{ manga: IManga }> = ({ manga }) => (
  <div>
    <Link href={`/manga/${manga.id}`}>
      <a className={styles.main}>
        <Avatar
          size={30}
          src={
            manga.mangaCover
              ? manga.mangaCover
              : "https://joeschmoe.io/api/v1/random"
          }
        />
        <strong>{manga.title}</strong>
      </a>
    </Link>
  </div>
)
const FoundBlock = () => {
  const mangas = useSelector(selectSearchListManga)
  const isLoading = useSelector(selectSearchLoading)
  if (isLoading) {
    return (
      <div className={styles.mainList}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.mainList}>
      {mangas.length > 0 ? (
        mangas.map((manga) => <FoundBlockItem manga={manga} />)
      ) : (
        <div className={styles.mainList}>Пусто</div>
      )}
    </div>
  )
}

export default FoundBlock
