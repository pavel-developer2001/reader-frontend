import { Spin } from "antd"
import dynamic from "next/dynamic"
import React from "react"
import { useSelector } from "react-redux"
import {
  selectMangaLoading,
  selectMangasData,
} from "../../model/manga.selector"
import styles from "./PopularList.module.scss"

const DynamicCardManga = dynamic(() => import("../CardManga"), {
  loading: () => <Spin />,
})

const PopularList = () => {
  const mangas = useSelector(selectMangasData)
  const loading = useSelector(selectMangaLoading)
  return (
    <div className={styles.list}>
      {loading ? (
        <p data-testid="loading">loading</p>
      ) : (
        mangas?.map((manga) => (
          <DynamicCardManga key={manga?.id} manga={manga} />
        ))
      )}
    </div>
  )
}

export default PopularList
