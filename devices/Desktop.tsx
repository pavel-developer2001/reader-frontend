import { useDesktopMediaQuery } from "../hooks/useDesktopMediaQuery";

export const Desktop = ({ children }: any) => {
  const isDesktop = useDesktopMediaQuery();
  return isDesktop ? children : null;
};
