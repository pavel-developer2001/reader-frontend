import { memo } from "react";
import { useDesktopMediaQuery } from "../hooks/useDesktopMediaQuery";

const Desktop = memo(({ children }: any) => {
  const isDesktop = useDesktopMediaQuery();
  return isDesktop ? children : null;
});
export default Desktop;
