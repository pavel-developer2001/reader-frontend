import { Avatar } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./FoundBlock.module.scss";

const FoundBlockItem = () => {
  return (
    <div>
      <Link href={"/manga/1"}>
        <a className={styles.main}>
          <Avatar size={30} src="https://joeschmoe.io/api/v1/random" />
          <strong>Токийский гуль</strong>
        </a>
      </Link>
    </div>
  );
};
const FoundBlock = () => {
  return (
    <div className={styles.mainList}>
      <FoundBlockItem />
      <FoundBlockItem />
      <FoundBlockItem />
    </div>
  );
};

export default FoundBlock;
