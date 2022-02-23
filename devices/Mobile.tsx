import { useMobileMediaQuery } from "../hooks/useMobileMediaQuery";

export const Mobile = ({ children }: any) => {
  const isMobile = useMobileMediaQuery();
  return isMobile ? children : null;
};
