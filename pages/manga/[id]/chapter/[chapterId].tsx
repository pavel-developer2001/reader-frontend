import { useRouter } from "next/dist/client/router";
import React from "react";
import ChapterLayout from "../../../../layouts/ChapterLayout";
import styles from "./Chapter.module.scss";

const Chapter = () => {
  const router = useRouter();
  console.log(router);
  return (
    <ChapterLayout title={"Поднятие уровня в одиночку"} id={1} page={"169"}>
      <div className={styles.main}>
        {" "}
        <img
          className={styles.page}
          alt='chapter page'
          src='https://img.remanga.org/images/solo-leveling/07775295b7167369c2c1a57877986418/ea7eb6a2be9d9329f4136831b0076828.jpeg'
        />
        <img
          className={styles.page}
          alt='chapter page'
          src='https://img.remanga.org/images/solo-leveling/07775295b7167369c2c1a57877986418/ea7eb6a2be9d9329f4136831b0076828.jpeg'
        />
        <img
          className={styles.page}
          alt='chapter page'
          src='https://img.remanga.org/images/solo-leveling/07775295b7167369c2c1a57877986418/ea7eb6a2be9d9329f4136831b0076828.jpeg'
        />
      </div>
    </ChapterLayout>
  );
};

export default Chapter;
