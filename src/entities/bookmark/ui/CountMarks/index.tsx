import { CopyFilled } from "@ant-design/icons"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Spin } from "antd"
import {
  selectBookMarkCount,
  selectBookMarkLoadingForCount,
} from "../../model/bookMark.selector"
import { getBookMarkCountToManga } from "../../model/bookMark.slice"
import styles from "./CountMarks.module.scss"

const CountMarks = () => {
  const router = useRouter()
  const countMarks = useSelector(selectBookMarkCount)
  const isCountMarksLoading = useSelector(selectBookMarkLoadingForCount)
  const dispatch = useDispatch()
  useEffect(() => {
    if (router.query.id) dispatch(getBookMarkCountToManga(router.query.id))
  }, [router.query.id])
  return (
    <div className={styles.bookmarks}>
      {isCountMarksLoading ? (
        <Spin />
      ) : (
        <>
          <CopyFilled /> {countMarks}
        </>
      )}
    </div>
  )
}

export default CountMarks
