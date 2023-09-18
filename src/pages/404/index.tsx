import { Spin } from "antd"
import dynamic from "next/dynamic"

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

const Custom404 = () => <DynamicMainLayout>Not found Page</DynamicMainLayout>

export default Custom404
