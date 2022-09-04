import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChapters } from "../../model/chapter.slice";
import {
  selectChapterError,
  selectChapterLoading,
  selectChaptersData,
} from "../../model/chapter.selector";
import styles from "./ChapterList.module.scss";
import { Spin } from "antd";

interface ChapterListItemProps {
  chapterId: number;
  volume: string;
  number: string;
  likes: string;
  date: string;
}
const ChapterListItem: FC<ChapterListItemProps> = memo(
  ({ chapterId, volume, number, likes, date }) => {
    const router = useRouter();
    return (
      <div className={styles.main}>
        <Link href={"/manga/" + router.query.id + "/chapter/" + chapterId}>
          <a className={styles.numbers}>
            <strong className={styles.volume}>{volume}</strong>
            <span>Глава {number}</span>
          </a>
        </Link>
        <div className={styles.dataChapter}>
          <span className={styles.date}>22/09/2021</span>
          <span>Assley Team</span>
        </div>
        <div className={styles.popular}>
          <HeartOutlined />
          {likes}
        </div>
      </div>
    );
  }
);
interface ChapterListProps {
  mangaId: string | string[] | undefined;
}
const ChapterList: FC<ChapterListProps> = memo(({ mangaId }) => {
  const chapters = useSelector(selectChaptersData);
  const loading = useSelector(selectChapterLoading);
  const dispatch = useDispatch();
  const errorHandling = useSelector(selectChapterError);
  useEffect(() => {
    if (mangaId) {
      dispatch(getChapters(mangaId));
    }
  }, [mangaId]);
  return (
    <div className={styles.mainList}>
      {errorHandling && <div>{errorHandling}</div>}
      {loading ? (
        <Spin />
      ) : chapters.length > 0 ? (
        chapters.map((chapter) => (
          <ChapterListItem
            key={chapter.id}
            chapterId={chapter.id}
            volume={chapter.volumeChapter}
            number={chapter.numberChapter}
            likes={chapter.countLikes}
            date={chapter.createdAt}
          />
        ))
      ) : (
        <p>Нет глав</p>
      )}
    </div>
  );
});

export default ChapterList;
