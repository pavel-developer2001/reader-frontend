import { Spin } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const DynamicMainLayout = dynamic(() => import("../../layouts/MainLayout"), {
  loading: () => <Spin size="large" />,
});

const Custom404 = () => {
  return (
    <DynamicMainLayout>
      Произошла ошибка на стороне админов. Извиняемся за неудобства, наши
      специалисты уже разбираются.
    </DynamicMainLayout>
  );
};

export default Custom404;
