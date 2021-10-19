import moment from "moment";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpdateChapters } from "../../../../store/slices/chapterSlice";
import styles from "./UpdateList.module.scss";

interface UpdateListItemProps {
  chapterId: number;
  volumeChapter: string;
  numberChapter: string;
  mangaId: number;
  cover: string;
  titleManga: string;
  date: string;
}
export const UpdateListItem: FC<UpdateListItemProps> = ({
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
          <img src={cover} alt='manga cover' />
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
};

const UpdateList = () => {
  const dispatch = useDispatch();
  const updateChapter = useSelector<any>(
    (state) => state.chapter.updateChapter
  );
  const loading = useSelector<any>((state) => state.chapter.loading);
  useEffect(() => {
    dispatch(getUpdateChapters());
  }, []);
  return (
    <div className={styles.list}>
      {loading ? (
        <p>Loading</p>
      ) : updateChapter.length > 0 ? (
        updateChapter.map((lateChapter: any) => (
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
