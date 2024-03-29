import { FC, MouseEventHandler, useState } from "react"
import { Drawer, Spin, message } from "antd"
import {
  ExportOutlined,
  FormatPainterOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons"
import Avatar from "antd/lib/avatar/avatar"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"

import dynamic from "next/dynamic"
import { setToken } from "../../../../entities/user/model/user.slice"
import { selectUserToken } from "../../../../entities/user/model/user.selector"
import { dataUser } from "../../../../shared/lib/utils/getDataUserFromToken"
import styles from "./AvatarDrawer.module.scss"

const DynamicAuthModal = dynamic(
  () => import("../../../../entities/user/ui/AuthModal"),
  {
    loading: () => <Spin />,
  }
)

const AvatarHeader = ({ token }: { token: string }) => (
  <div className={styles.header}>
    {token ? (
      <>
        <div className={styles.headerUser}>
          <Link href={`/user/${dataUser}`}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Link>

          <div className={styles.headerData}>
            {" "}
            <strong>
              <Link href={`/user/${dataUser}`}>UserName</Link>
            </strong>{" "}
            <span>0 ₽</span>
          </div>
        </div>
        <div>Пополнить Баланс</div>
      </>
    ) : (
      <DynamicAuthModal />
    )}
  </div>
)
interface AvatarDrawerProps {
  changeTheme: MouseEventHandler<HTMLDivElement> | undefined
  menuArrays: { left: Array<{ title: string; link: string }>; right: any }
}

const AvatarDrawer: FC<AvatarDrawerProps> = ({ changeTheme, menuArrays }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector(selectUserToken)

  const onClose = () => {
    setVisible(false)
  }
  const showDrawer = () => {
    setVisible(true)
  }
  const handleExitUser = () => {
    window.localStorage.removeItem("token")
    dispatch(setToken(""))
    message.success("Вы вышли из аккаунта")
  }
  return (
    <div className={styles.main}>
      <div onClick={showDrawer}>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>

      <Drawer
        title={<AvatarHeader token={token} />}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        key="right"
      >
        {menuArrays.left.map((menu) => (
          <p key={menu.link} className={styles.menu}>
            <Link href={menu.link}>
              <a>{menu.title}</a>
            </Link>
          </p>
        ))}
        {token && (
          <p>
            <Link href="/createManga">
              <a>
                <PlusOutlined />
                Добавить мангу
              </a>
            </Link>
          </p>
        )}

        <p>
          <div className={styles.menu} onClick={changeTheme}>
            <FormatPainterOutlined /> Сменить цвет
          </div>
        </p>
        {token && (
          <p onClick={handleExitUser}>
            <ExportOutlined /> Выход
          </p>
        )}
      </Drawer>
    </div>
  )
}

export default AvatarDrawer
