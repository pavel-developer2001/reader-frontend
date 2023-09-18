import { Spin } from "antd"
import styles from "./Loader.module.scss"

export const Loader = () => (
  <div className={styles.wrapper}>
    <Spin />
  </div>
)
