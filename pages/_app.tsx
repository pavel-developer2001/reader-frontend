import "../styles/globals.scss";
import "antd/dist/antd.css";
import React from "react";
import App, { AppContext } from "next/app";
import { wrapper } from "../store";
import { ThemeProvider } from "../provider/ThemeProvider";

class MyApp extends App {
  static async getServer({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  //@ts-ignore
  render() {
    const { Component, pageProps } = this.props;
    const isBrowser = typeof window !== "undefined";
    return isBrowser ? (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    ) : null;
  }
}

export default wrapper.withRedux(MyApp);
