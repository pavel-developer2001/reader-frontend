import { Layout, Spin } from "antd"
import Link from "next/link"
import dynamic from "next/dynamic"
import { FormatPainterOutlined } from "@ant-design/icons"
import styles from "./Navbar.module.scss"
import { Theme } from "../../app/context/ThemeContext"
import { useTheme } from "../../shared/lib/hooks/useTheme"

const { Header } = Layout

const DynamicDesktop = dynamic(
  () => import("../../shared/ui/devices/Desktop"),
  {
    loading: () => <Spin />,
  }
)
const DynamicMobile = dynamic(() => import("../../shared/ui/devices/Mobile"), {
  loading: () => <Spin />,
})
const DynamicAvatarDrawer = dynamic(() => import("./components/AvatarDrawer"), {
  loading: () => <Spin />,
})
const DynamicSearchModal = dynamic(() => import("../../features/SearchModal"), {
  loading: () => <Spin />,
})
const DynamicAvatarUser = dynamic(
  () => import("../../entities/user/ui/AvatarUser"),
  {
    loading: () => <Spin />,
  }
)
const Navbar = () => {
  const theme = useTheme()

  function changeTheme() {
    theme.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
  }
  const menuArrays = {
    left: [
      {
        title: "Каталог",
        link: "/catalog",
      },
    ],
    right: [],
  }
  return (
    <Header className={styles.header}>
      <DynamicDesktop>
        <div className="main-container">
          <div className={styles.wrapper}>
            <div className={styles.leftHeader}>
              <div className={styles.logo}>
                <Link href="/">
                  <a>Reader</a>
                </Link>
              </div>
              {menuArrays.left.map((menu) => (
                <div key={menu.link} className={styles.menu}>
                  <Link href={menu.link}>
                    <a>{menu.title}</a>
                  </Link>
                </div>
              ))}
            </div>
            <div className={styles.rightHeader}>
              <div className={styles.menu}>
                <DynamicSearchModal />
              </div>

              <div className={styles.menu}>
                <FormatPainterOutlined onClick={changeTheme} />
              </div>
              <DynamicAvatarUser />
            </div>
          </div>
        </div>
      </DynamicDesktop>
      <DynamicMobile>
        <div className="main-container">
          <div className={styles.wrapper}>
            <div className={styles.leftHeader}>
              <div className={styles.logo}>
                <Link href="/">
                  <a>Reader</a>
                </Link>
              </div>
            </div>
            <div className={styles.rightHeader}>
              <div className={styles.menu}>
                <DynamicSearchModal />
              </div>

              <DynamicAvatarDrawer
                changeTheme={changeTheme}
                menuArrays={menuArrays}
              />
            </div>
          </div>
        </div>
      </DynamicMobile>
    </Header>
  )
}

export default Navbar
