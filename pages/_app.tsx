import "../styles/index.scss";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../store";
import { ThemeProvider } from "../provider/ThemeProvider";
import { setToken } from "../store/modules/user/user.slice";
import { selectUserToken } from "../store/modules/user/user.selector";

export function MyApp({ Component, pageProps }: AppProps) {
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToken(localStorage.getItem("token")));
  }, [token]);
  const isBrowser = typeof window !== "undefined";
  return isBrowser ? (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  ) : null;
}
export default wrapper.withRedux(MyApp);
