import React, { FC } from "react";
import TisketListCard from "../TisketListCard";
import styles from "./TisketList.module.scss";

interface TisketListProps {
  popularTitle: string;
}
const TisketList: FC<TisketListProps> = ({ popularTitle }) => {
  return (
    <div className={styles.tisket}>
      <h3 className={styles.popularCategory}>{popularTitle}</h3>
      <TisketListCard />
      <TisketListCard />
      <TisketListCard />
      <TisketListCard />
      <TisketListCard />
    </div>
  );
};

export default TisketList;
