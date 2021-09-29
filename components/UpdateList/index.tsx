import React from "react";
import styles from "./UpdateList.module.scss";

const UpdateListItem = () => {
  return (
    <div className={styles.item}>
      <div className={styles.leftBlock}>
        <img
          src='https://api.remanga.org//media/titles/the-strongest-mercenary/adae270223c08b384497549e5f3b02c5.jpg'
          alt='manga cover'
        />
      </div>
      <div className={styles.rightBlock}>
        <strong className={styles.title}>Прирожденный наёмник</strong>
        <p className={styles.chapter}>Том 1. Глава 52.</p>
        <span className={styles.date}>5 часов назад</span>
      </div>
    </div>
  );
};

const UpdateList = () => {
  return (
    <div className={styles.list}>
      <UpdateListItem />
      <UpdateListItem />
      <UpdateListItem />
    </div>
  );
};

export default UpdateList;
