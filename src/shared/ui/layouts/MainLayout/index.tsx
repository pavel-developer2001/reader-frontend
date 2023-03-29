import { Spin } from "antd"
import dynamic from "next/dynamic"
import Head from "next/head"
import React, { ReactNode } from "react"
import Navbar from "../../../../widgets/Navbar"
import styles from "./MainLayout.module.css"

const DynamicMyFooter = dynamic(() => import("../../../../widgets/MyFooter"), {
  loading: () => <Spin />,
})
interface MainLayoutProps {
  children: ReactNode
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
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
    <Navbar />
    <div className={styles.container}>
      <div className="main-container">{children}</div>
    </div>
    <DynamicMyFooter />
  </div>
)

export default MainLayout
