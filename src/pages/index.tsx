import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
import { Spin } from "antd"
import { wrapper } from "../app/store"
import { getMangas } from "../entities/manga/model/manga.slice"

const MainLayout = dynamic(() => import("../shared/ui/layouts/MainLayout"), {
  loading: () => (
    <span className="loader-block">
      <Spin size="large" />
    </span>
  ),
})
const PopularList = dynamic(() => import("../entities/manga/ui/PopularList"), {
  loading: () => (
    <span className="loader-block">
      <Spin />
    </span>
  ),
})
const UpdateList = dynamic(() => import("../entities/chapter/ui/UpdateList"), {
  loading: () => (
    <span className="loader-block">
      <Spin />
    </span>
  ),
})

const Home: NextPage = () => (
  <MainLayout>
    <PopularList />
    <UpdateList />
  </MainLayout>
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
export default Home
