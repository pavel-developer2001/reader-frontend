import React from "react"
import { useSelector } from "react-redux"
import { Avatar, Popover, Spin } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { selectUserToken } from "../../model/user.selector"
import styles from "./AvatarUser.module.scss"
import dynamic from "next/dynamic"

const DynamicMenuUser = dynamic(() => import("./components/MenuUser"), {
  loading: () => <Spin />,
})
const DynamicAuthModal = dynamic(() => import("../AuthModal"), {
  loading: () => <Spin />,
})
const AvatarUser = () => {
  const token = useSelector(selectUserToken)
  return (
    <>
      {token ? (
        <div className={styles.menu}>
          <Popover
            placement="bottom"
            content={<DynamicMenuUser />}
            trigger="click"
          >
            <Avatar size="large" icon={<UserOutlined />} />
          </Popover>
        </div>
      ) : (
        <DynamicAuthModal />
      )}
    </>
  )
}

export default AvatarUser
