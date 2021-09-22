import React from "react";
import TisketListCard from "../TisketListCard";
import styles from "./TisketList.module.scss";

const TisketList = () => {
  return (
    <div className={styles.tisket}>
      <h3>Top</h3>
      <TisketListCard />
      <TisketListCard />
      <TisketListCard />
      <TisketListCard />
      <TisketListCard />
    </div>
  );
};

export default TisketList;
