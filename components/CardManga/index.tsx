import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IManga } from "../../store/modules/manga/types/IManga";
import styles from "./CardManga.module.scss";

interface CardMangaProps {
  manga: IManga;
}

export const CardManga: FC<CardMangaProps> = ({ manga }) => {
  return (
    <Link href={"/manga/" + manga.id}>
      <a>
        <div className={styles.main}>
          <Image
            src={manga && manga.mangaCover}
            width={144}
            height={216}
            className={styles.img}
          />
          <strong>{manga.title}</strong>
          <span>{manga.typeManga}</span>
        </div>
      </a>
    </Link>
  );
};
