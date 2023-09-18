import { GetServerSideProps } from "next"
import MainLayout from "../../shared/ui/layouts/MainLayout"
import { wrapper } from "../../app/store"
import { FormsManga } from "../../widgets/FormsManga/FormsManga"

const CreateManga = () => (
  <MainLayout>
    <FormsManga />
  </MainLayout>
)

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async (ctx) => {
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    )
    return {
      props: {},
    }
  })

export default CreateManga
