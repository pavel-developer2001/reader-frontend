import Title from "antd/lib/typography/Title"
import { useSelector } from "react-redux"
import { Space, Spin, Tabs } from "antd"
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
import {
  selectMangaLoading,
  selectMangasData,
} from "../../entities/manga/model/manga.selector"
import { wrapper } from "../../app/store"
import { getMangas } from "../../entities/manga/model/manga.slice"
import { Loader } from "../../shared/ui/Loader/Loader"

const { TabPane } = Tabs

const DynamicCardManga = dynamic(
  () => import("../../entities/manga/ui/CardManga"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin />
      </div>
    ),
  }
)
const DynamicTeamList = dynamic(
  () => import("../../entities/team/ui/TeamList"),
  {
    loading: () => <Loader />,
  }
)

const DynamicMainLayout = dynamic(
  () => import("../../shared/ui/layouts/MainLayout"),
  {
    loading: () => <Loader />,
  }
)

const Catalog = () => {
  const mangas = useSelector(selectMangasData)
  const loading = useSelector(selectMangaLoading)

  return (
    <DynamicMainLayout>
      <Title level={2}>Каталог</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Тайтлы" key="1">
          <Space>
            <Space wrap>
              {loading ? (
                <Spin />
              ) : (
                mangas?.map((manga) => (
                  <DynamicCardManga key={manga.id} manga={manga} />
                ))
              )}
            </Space>
          </Space>
        </TabPane>
        <TabPane tab="Команды переводчиков" key="2">
          <DynamicTeamList />
        </TabPane>
      </Tabs>
    </DynamicMainLayout>
  )
}
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

export default Catalog
