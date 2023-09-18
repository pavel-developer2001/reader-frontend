import dynamic from "next/dynamic"
import { Loader } from "../../shared/ui/Loader/Loader"

const DynamicMainLayout = dynamic(
  () => import("../../shared/ui/layouts/MainLayout"),
  {
    loading: () => <Loader />,
  }
)

const Custom404 = () => <DynamicMainLayout>Not found Page</DynamicMainLayout>

export default Custom404
