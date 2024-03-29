import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import { wrapper } from "../../app/store"
import { getUserData } from "../../entities/user/model/user.slice"
import { UserInfo } from "../../widgets/UserInfo/UserInfo"
import { Loader } from "../../shared/ui/Loader/Loader"

const DynamicMainLayout = dynamic(
  () => import("../../shared/ui/layouts/MainLayout"),
  {
    loading: () => <Loader />,
  }
)

const User = () => (
  <DynamicMainLayout>
    <UserInfo />
  </DynamicMainLayout>
)
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params, res }) => {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    )
    try {
      await store.dispatch<any>(getUserData(params?.id))
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
export default User
