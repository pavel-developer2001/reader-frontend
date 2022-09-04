import moment from "moment";
import Link from "next/link";
import React, { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getUpdateChapters } from "../../model/chapter.slice";
import {
  selectChapterError,
  selectChapterLoading,
  selectUpdateChapterData,
} from "../../model/chapter.selector";
import styles from "./UpdateList.module.scss";
import { Spin } from "antd";

interface UpdateListItemProps {
  chapterId: number;
  volumeChapter: string;
  numberChapter: string;
  mangaId: number;
  cover: string;
  titleManga: string;
  date: string;
}
export const UpdateListItem: FC<UpdateListItemProps> = memo(
  ({
    chapterId,
    volumeChapter,
    numberChapter,
    mangaId,
    cover,
    titleManga,
    date,
  }) => {
    return (
      <div className={styles.item}>
        <Link href={"/manga/" + mangaId}>
          <a className={styles.leftBlock}>
            <Image width={64} height={96} src={cover} alt="manga cover" />
          </a>
        </Link>

        <div className={styles.rightBlock}>
          <Link href={"/manga/" + mangaId}>
            <a className={styles.title}>{titleManga}</a>
          </Link>

          <Link href={"/manga/" + mangaId + "/chapter/" + chapterId}>
            <a className={styles.chapter}>
              Том {volumeChapter}. Глава {numberChapter}.
            </a>
          </Link>

          <span className={styles.date}>{moment().from(date)} назад</span>
        </div>
      </div>
    );
  }
);

const UpdateList = () => {
  const dispatch = useDispatch();
  const updateChapter = useSelector(selectUpdateChapterData);
  const loading = useSelector(selectChapterLoading);
  const errorHandling = useSelector(selectChapterError);
  useEffect(() => {
    dispatch(getUpdateChapters());
  }, []);
  return (
    <div className={styles.list}>
      {errorHandling && <div>{errorHandling}</div>}
      {loading ? (
        <Spin />
      ) : updateChapter.length > 0 ? (
        updateChapter.map((lateChapter) => (
          <UpdateListItem
            key={lateChapter.id}
            chapterId={lateChapter.id}
            volumeChapter={lateChapter.volumeChapter}
            numberChapter={lateChapter.numberChapter}
            mangaId={lateChapter.manga.id}
            cover={lateChapter.manga.mangaCover}
            titleManga={lateChapter.manga.title}
            date={lateChapter.createdAt}
          />
        ))
      ) : (
        <p>Нет глав</p>
      )}
    </div>
  );
};

export default UpdateList;
