import { memo } from "react";
import { useMobileMediaQuery } from "../hooks/useMobileMediaQuery";

const Mobile = memo(({ children }: any) => {
  const isMobile = useMobileMediaQuery();
  return isMobile ? children : null;
});
export default Mobile;
