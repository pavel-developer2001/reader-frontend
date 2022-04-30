import { Spin } from "antd";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { wrapper } from "../../store";

const DynamicMainLayout = dynamic(() => import("../../layouts/MainLayout"), {
  loading: () => <Spin size="large" />,
});

const Popular = () => {
  return <DynamicMainLayout>Toп</DynamicMainLayout>;
};
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );
    try {
      //@ts-ignore
      await store.dispatch(getMangas());
      return {
        props: {},
      };
    } catch (error) {
      console.log("ERROR!");
      return {
        props: {},
      };
    }
  });
export default Popular;
