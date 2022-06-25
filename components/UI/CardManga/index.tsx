import Image from "next/image";
import Link from "next/link";
import React, { FC, memo } from "react";
import { IManga } from "../../../store/modules/manga/types/IManga";
import styles from "./CardManga.module.scss";

interface CardMangaProps {
  manga: IManga;
}

const CardManga: FC<CardMangaProps> = memo(({ manga }) => {
  return (
    <div className={styles.main}>
      <Link href={"/manga/" + manga.id}>
        <a>
          <Image
            src={manga && manga.mangaCover}
            alt="MangaCover"
            width={144}
            height={216}
            className={styles.img}
          />
          <div className={styles.data}>
            <strong>{manga.title}</strong>
            <span>{manga.typeManga}</span>
          </div>
        </a>
      </Link>
    </div>
  );
});
export default CardManga;
