import {
  ExclamationCircleOutlined,
  HeartOutlined,
  MessageOutlined,
  OrderedListOutlined,
} from "@ant-design/icons"
import React from "react"
import styles from "./SettingsPage.module.scss"

const SettingPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.countPages}>1/8</div>
      <div className={styles.bodyBlock}>
        <div className={styles.item}>
          <OrderedListOutlined />
        </div>
        <div className={styles.item}>
          <MessageOutlined />
        </div>
        <div className={styles.item}>
          <HeartOutlined />
        </div>
      </div>
      <div className={styles.complaint}>
        <ExclamationCircleOutlined />
      </div>
    </div>
  )
}

export default SettingPage
