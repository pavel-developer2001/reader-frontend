import { Spin } from "antd"
import dynamic from "next/dynamic"
import { FC, memo } from "react"
import styles from "./TisketList.module.scss"

const DynamicTisketListCard = dynamic(
  () => import("../../entities/manga/ui/TisketListCard"),
  {
    loading: () => <Spin />,
  }
)

interface TisketListProps {
  popularTitle: string
}
const TisketList: FC<TisketListProps> = memo(({ popularTitle }) => (
  <div className={styles.tisket}>
    <h3 className={styles.popularCategory}>{popularTitle}</h3>
    <DynamicTisketListCard />
    <DynamicTisketListCard />
    <DynamicTisketListCard />
    <DynamicTisketListCard />
    <DynamicTisketListCard />
    <DynamicTisketListCard />
  </div>
))

export default TisketList
