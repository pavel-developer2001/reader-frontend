import dynamic from "next/dynamic"
import { Loader } from "../../shared/ui/Loader/Loader"

const DynamicMainLayout = dynamic(
  () => import("../../shared/ui/layouts/MainLayout"),
  {
    loading: () => <Loader />,
  }
)

const Custom500 = () => (
  <DynamicMainLayout>
    Произошла ошибка в облачном хранилище. Извиняемся за неудобства, наши
    специалисты уже разбираются.
  </DynamicMainLayout>
)

export default Custom500
