import Image from "next/image"

import styles from "./AuthorBlock.module.scss"

const AuthorBlock = () => (
  <div className={styles.main}>
    <Image
      src="https://api.remanga.org//media/users/41127/avatar_6q5hYps.jpg"
      width={64}
      height={64}
      alt="Author Avatar"
      className={styles.img}
    />
    <div className={styles.data}>
      <strong>TurtleMe</strong>
      <span>Автор</span>
    </div>
  </div>
)

export default AuthorBlock
