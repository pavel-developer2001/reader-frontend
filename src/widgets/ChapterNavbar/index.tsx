import { FC, memo } from "react"
import { CaretRightOutlined, FormatPainterOutlined } from "@ant-design/icons"
import { Header } from "antd/lib/layout/layout"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Spin } from "antd"
import styles from "./ChapterNavbar.module.scss"
import { Theme } from "../../app/context/ThemeContext"
import { useTheme } from "../../shared/lib/hooks/useTheme"

const DynamicMobile = dynamic(() => import("../../shared/ui/devices/Mobile"), {
  loading: () => <Spin />,
})
const DynamicDesktop = dynamic(
  () => import("../../shared/ui/devices/Desktop"),
  {
    loading: () => <Spin />,
  }
)
const DynamicAvatarDrawer = dynamic(
  () => import("../Navbar/components/AvatarDrawer"),
  {
    loading: () => <Spin />,
  }
)
const DynamicAvatarUser = dynamic(
  () => import("../../entities/user/ui/AvatarUser"),
  {
    loading: () => <Spin />,
  }
)

interface ChapterNavbarProps {
  title: string
  page: string
  id: string | string[] | undefined
}
const ChapterNavbar: FC<ChapterNavbarProps> = memo(({ title, page, id }) => {
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
      {
        title: "В топе",
        link: "/popular",
      },
    ],
    right: [],
  }
  return (
    <Header className={styles.header}>
      <DynamicDesktop>
        <div className="main-container">
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <div className={styles.logo}>
                <Link href="/">
                  <a>Reader</a>
                </Link>
              </div>
              <Link href={`/manga/${id}`}>
                <a className={styles.title}> {title}</a>
              </Link>
            </div>
            <div className={styles.center}>
              {/* {id <= 0 ? null : <CaretLeftOutlined />} */}
              <span># {page}</span>
              <CaretRightOutlined />
            </div>
            <div className={styles.right}>
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
            <div className={styles.left}>
              <div className={styles.logo}>
                <Link href="/">
                  <a>Reader</a>
                </Link>
              </div>
              <Link href={`/manga/${id}`}>
                <a className={styles.title}> {title}</a>
              </Link>
            </div>
            <div className={styles.center}>
              {/* {id <= 0 ? null : <CaretLeftOutlined />} */}
              <span># {page}</span>
              <CaretRightOutlined />
            </div>
            <div className={styles.right}>
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
})

export default ChapterNavbar
