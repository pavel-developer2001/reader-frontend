import { Spin } from "antd";
import dynamic from "next/dynamic";
import React from "react";

const DynamicMainLayout = dynamic(() => import("../../layouts/MainLayout"), {
  loading: () => <Spin size="large" />,
});

const Custom500 = () => {
  return (
    <DynamicMainLayout>
      Произошла ошибка в облачном хранилище. Извиняемся за неудобства, наши
      специалисты уже разбираются.
    </DynamicMainLayout>
  );
};

export default Custom500;
