import "../styles/globals.scss";
import "antd/dist/antd.css";
import React, { FC, useEffect } from "react";
import App, { AppContext, AppProps } from "next/app";
import { wrapper } from "../store";
import { ThemeProvider } from "../provider/ThemeProvider";
import { setToken } from "../store/modules/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducer";

export function MyApp({ Component, pageProps }: AppProps) {
  const token = useSelector<RootState>((state) => state.user.token);
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
