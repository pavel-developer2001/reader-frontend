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

const Custom404 = () => (
  <DynamicMainLayout>
    Произошла ошибка на стороне админов. Извиняемся за неудобства, наши
    специалисты уже разбираются.
  </DynamicMainLayout>
)

export default Custom404
