import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button, Spin, Tabs } from "antd"

import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import styles from "../../app/styles/pages/Notification.module.scss"
import { wrapper } from "../../app/store"
import { getMangas } from "../../entities/manga/model/manga.slice"

const { TabPane } = Tabs

const DynamicMainLayout = dynamic(
  () => import("../../shared/ui/layouts/MainLayout"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin size="large" />
      </div>
    ),
  }
)

const Notification = () => (
  <DynamicMainLayout>
    <div className={styles.header}>
      <div className={styles.leftBlog}>
        <h2> Уведомления</h2>
      </div>
      <div className={styles.rightBlog}>
        <div>
          <Button
            type="primary"
            shape="circle"
            icon={<CheckCircleOutlined />}
          />
        </div>
        <div>
          <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
        </div>
        <div />
      </div>
    </div>
    <div className={styles.body}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Обновление" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Социальное" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Важное" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  </DynamicMainLayout>
)
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    )
    try {
      await store.dispatch<any>(getMangas())
      return {
        props: {},
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("ERROR!")
      return {
        props: {},
      }
    }
  })
export default Notification
