import Title from "antd/lib/typography/Title";
import React, { FC } from "react";

const MangaData: FC<any> = ({
  title,
  englishTitle,
  originalTitle,
  yearOfIssue,
}) => {
  return (
    <div>
      <div>
        <Title>{title}</Title>
        <Title level={5}>
          {englishTitle} / {originalTitle}
        </Title>
      </div>
      <div>8.9 (голосов: 610) 17.2K 95.4K 13.8K Маньхуа {yearOfIssue}</div>
    </div>
  );
};

export default MangaData;
