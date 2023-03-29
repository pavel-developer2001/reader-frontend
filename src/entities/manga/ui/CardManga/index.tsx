import Image from "next/image"
import Link from "next/link"
import { FC, memo } from "react"
import { IManga } from "../../../../shared/api/reader/models"
import styles from "./CardManga.module.scss"

interface CardMangaProps {
  manga: IManga
}

const CardManga: FC<CardMangaProps> = memo(({ manga }) => (
  <div data-testid="cardManga" className={styles.main}>
    <Link href={`/manga/${manga.id}`}>
      <a>
        <Image
          src={manga && manga.mangaCover}
          alt="MangaCover"
          priority
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
))
export default CardManga
