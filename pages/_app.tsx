import "../styles/globals.css";
import "antd/dist/antd.css";
import React from "react";
import App, { AppContext } from "next/app";
import { wrapper } from "../store";

class MyApp extends App {
  static async getServer({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
