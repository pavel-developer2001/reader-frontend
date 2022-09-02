import React from "react";

import { Layout } from "antd";
const { Footer } = Layout;

const MyFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <div className="main-container">
        Reader - Читать мангу онлайн на русском
      </div>
    </Footer>
  );
};

export default MyFooter;
