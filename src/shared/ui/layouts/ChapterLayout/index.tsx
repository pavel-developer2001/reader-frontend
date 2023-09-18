import Head from "next/head"
import { memo, ReactNode } from "react"
import { Spin } from "antd"
import dynamic from "next/dynamic"
import styles from "./ChapterLayout.module.scss"

const DynamicMyFooter = dynamic(() => import("../../../../widgets/MyFooter"), {
  loading: () => <Spin />,
  ssr: false,
})
const DynamicChapterNavbar = dynamic(
  () => import("../../../../widgets/ChapterNavbar"),
  {
    loading: () => <Spin />,
    ssr: false,
  }
)

interface ChapterLayoutProps {
  children: ReactNode
  title: string
  page: string
  id: string | string[] | undefined
}
const ChapterLayout: React.FC<ChapterLayoutProps> = memo(
  ({ title, page, children, id }) => (
    <div className={styles.wrapper}>
      <Head>
        <title>Reader - читалка</title>
        <meta
          name="description"
          content="Читай популярные комиксы, мангу, маньхуа, манхва и т.п."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="Музыка, треки, артисты, общения, друзья, знакомства"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DynamicChapterNavbar title={title} page={page} id={id} />
      <div className={styles.main}>
        <div className={styles.container}>{children}</div>
        <div className={styles.right} />
      </div>
      <DynamicMyFooter />
    </div>
  )
)

export default ChapterLayout
