import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChapters } from "../../../../../store/slices/chapterSlice";
import styles from "./ChapterList.module.scss";

const ChapterListItem: FC<any> = ({
  chapterId,
  volume,
  number,
  likes,
  date,
}) => {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div
        className={styles.numbers}
        onClick={() =>
          router.push("/manga/" + router.query.id + "/chapter/" + chapterId)
        }
      >
        <strong className={styles.volume}>{volume}</strong>
        <span>Глава {number}</span>
      </div>
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
};
const ChapterList: FC<any> = ({ mangaId }) => {
  const chapters = useSelector<any>((state) => state.chapter.chapters);
  const loading = useSelector<any>((state) => state.chapter.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChapters(mangaId));
  }, [mangaId]);
  return (
    <div className={styles.mainList}>
      {loading ? (
        <p>loading</p>
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
};

export default ChapterList;
