import moment from "moment";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpdateChapters } from "../../../../store/slices/chapterSlice";
import styles from "./UpdateList.module.scss";

export const UpdateListItem: FC<any> = ({
  chapterId,
  volumeChapter,
  numberChapter,
  mangaId,
  cover,
  titleManga,
  date,
}) => {
  const router = useRouter();
  return (
    <div className={styles.item}>
      <div
        className={styles.leftBlock}
        onClick={() => router.push("/manga/" + mangaId)}
      >
        <img src={cover} alt='manga cover' />
      </div>
      <div className={styles.rightBlock}>
        <strong
          className={styles.title}
          onClick={() => router.push("/manga/" + mangaId)}
        >
          {titleManga}
        </strong>
        <p
          className={styles.chapter}
          onClick={() =>
            router.push("/manga/" + mangaId + "/chapter/" + chapterId)
          }
        >
          Том {volumeChapter}. Глава {numberChapter}.
        </p>
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
