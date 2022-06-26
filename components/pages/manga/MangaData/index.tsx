import { EyeFilled, HeartFilled } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { selectRatingItemData } from "../../../../store/modules/rating/rating.selector";
import { selectUserToken } from "../../../../store/modules/user/user.selector";
import Rating from "../Rating";
import CountMarks from "./components/CountMarks";
import styles from "./MangaData.module.scss";

interface MangaDataProps {
  title: string;
  englishTitle: string;
  originalTitle: string;
  yearOfIssue: string;
  ageRating: string;
  statusManga: string;
  typeManga: string;
  watchCount: string;
}
const MangaData: FC<MangaDataProps> = memo(
  ({
    title,
    englishTitle,
    originalTitle,
    yearOfIssue,
    ageRating,
    statusManga,
    typeManga,
    watchCount,
  }) => {
    const rating = useSelector(selectRatingItemData);
    const token = useSelector(selectUserToken);

    return (
      <div>
        <div>
          <Title level={5} className={styles.originalTitle}>
            {englishTitle} / {originalTitle}
          </Title>
          <div className={styles.dataTitle}>
            <Title className={styles.title}>{title}</Title>
            <span className={styles.status}>[{statusManga}]</span>
          </div>
        </div>
        <div className={styles.static}>
          <div className={styles.rating}>
            {token ? <Rating /> : rating.rating}
          </div>
          <div className={styles.likes}>
            <HeartFilled /> 17.2K{" "}
          </div>
          <div className={styles.watch}>
            <EyeFilled /> {watchCount}
          </div>
          <CountMarks />
          <div className={styles.ageRating}>{ageRating}</div>
          <div className={styles.type}>{typeManga}</div>
          <div className={styles.date}>{yearOfIssue}</div>
        </div>
      </div>
    );
  }
);

export default MangaData;
