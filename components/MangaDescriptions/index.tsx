import { Tag } from "antd";
import React, { FC } from "react";

const MangaDescriptions: FC<any> = ({ mangaDescription }) => {
  return (
    <div>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <Tag color='purple'>purple</Tag>
      <p>{mangaDescription}</p>
    </div>
  );
};

export default MangaDescriptions;
