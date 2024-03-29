import { GetServerSideProps } from "next"
import Image from "next/image"
import { useRouter } from "next/dist/client/router"
import { useSelector } from "react-redux"
import { Spin } from "antd"
import dynamic from "next/dynamic"
import styles from "../../../../app/styles/pages/Chapter.module.scss"
import {
  selectChapterError,
  selectChapterImagesData,
  selectChapterLoading,
} from "../../../../entities/chapter/model/chapter.selector"
import { wrapper } from "../../../../app/store"
import { getImages } from "../../../../entities/chapter/model/chapter.slice"
import { Loader } from "../../../../shared/ui/Loader/Loader"

const DynamicChapterLayout = dynamic(
  () => import("../../../../shared/ui/layouts/ChapterLayout"),
  {
    loading: () => <Loader />,
  }
)
const Chapter = () => {
  const router = useRouter()
  const mangaId = router.query?.id
  const images = useSelector(selectChapterImagesData)
  const errorHandling = useSelector(selectChapterError)
  const loading = useSelector(selectChapterLoading)

  return loading ? (
    <Spin />
  ) : (
    <DynamicChapterLayout
      title={images[0]?.manga?.title}
      id={mangaId}
      page={images[0]?.chapter?.numberChapter}
    >
      <div className={styles.main}>
        {errorHandling && <div>{errorHandling}</div>}
        {images?.map((image) => (
          <Image
            key={image.id}
            className={styles.page}
            width={900}
            height={900}
            alt="chapter page"
            src={image.imageChapter}
          />
        ))}
      </div>
    </DynamicChapterLayout>
  )
}
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params, res }) => {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    )
    try {
      await store.dispatch<any>(getImages(params?.chapterId))
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
export default Chapter
