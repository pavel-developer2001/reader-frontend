import { Spin, Tabs } from "antd"
import dynamic from "next/dynamic"
import { GetServerSideProps } from "next"
import { useSelector } from "react-redux"
import { useRouter } from "next/dist/client/router"
import styles from "../../../app/styles/pages/Manga.module.scss"
import {
  selectMangaItem,
  selectMangaLoading,
} from "../../../entities/manga/model/manga.selector"
import { RootState } from "../../../app/store/reducer"
import { wrapper } from "../../../app/store"
import { getManga } from "../../../entities/manga/model/manga.slice"
import { Loader } from "../../../shared/ui/Loader/Loader"

const CommentsBlockList = dynamic(
  () => import("../../../entities/comment/ui/CommentsBlockList"),
  {
    loading: () => <Loader />,
  }
)
const ChapterList = dynamic(
  () => import("../../../entities/chapter/ui/ChapterList"),
  {
    loading: () => <Loader />,
  }
)
const MangaAddition = dynamic(
  () => import("../../../entities/team/ui/MangaAddition"),
  {
    loading: () => <Loader />,
  }
)
const DynamicMainLayout = dynamic(
  () => import("../../../shared/ui/layouts/MainLayout"),
  {
    loading: () => <Loader />,
  }
)
const DynamicMangaData = dynamic(
  () => import("../../../entities/rating/ui/MangaData"),
  {
    loading: () => <Loader />,
  }
)
const DynamicMangaDescriptions = dynamic(
  () => import("../../../entities/manga/ui/MangaDescriptions"),
  {
    loading: () => <Loader />,
  }
)
const DynamicMangaSettings = dynamic(
  () => import("../../../entities/manga/ui/MangaSettings"),
  {
    loading: () => <Loader />,
  }
)

const { TabPane } = Tabs

const PageManga = () => {
  const manga = useSelector<RootState, any>(selectMangaItem)
  const loading = useSelector(selectMangaLoading)
  const router = useRouter()
  return (
    <DynamicMainLayout>
      <div className={styles.wrapper}>
        {loading ? (
          <Spin />
        ) : (
          <>
            <DynamicMangaSettings cover={manga?.mangaCover} id={manga?.id} />
            <div className={styles.main}>
              <DynamicMangaData
                title={manga?.title}
                englishTitle={manga?.englishTitle}
                originalTitle={manga?.originalTitle}
                yearOfIssue={manga?.yearOfIssue}
                ageRating={manga?.ageRatingManga}
                typeManga={manga?.typeManga}
                statusManga={manga?.statusManga}
                watchCount={manga?.watchCount}
              />
              <div className={styles.table}>
                <div className={styles.mainBlock}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Описание" key="1">
                      <DynamicMangaDescriptions
                        mangaDescription={manga?.mangaDescription}
                        tags={manga.tags}
                        genres={manga.genres}
                      />
                      <MangaAddition />
                    </TabPane>
                    <TabPane tab="Главы" key="2">
                      <ChapterList mangaId={router.query.id} />
                    </TabPane>
                    <TabPane tab="Комментарии" key="3">
                      <CommentsBlockList />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DynamicMainLayout>
  )
}
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params, res }) => {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    )
    try {
      await store.dispatch<any>(getManga(params?.id))
      return {
        props: {},
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("ERROR!", error)
      return {
        props: {},
      }
    }
  })
export default PageManga
