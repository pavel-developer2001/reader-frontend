import { memo } from "react"
import { useDesktopMediaQuery } from "../../lib/hooks/useDesktopMediaQuery"

const Desktop = memo(({ children }: any) => {
  const isDesktop = useDesktopMediaQuery()
  return isDesktop ? children : null
})
export default Desktop
