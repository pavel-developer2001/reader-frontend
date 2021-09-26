import { useRouter } from "next/dist/client/router";
import React from "react";
import ChapterLayout from "../../../../layouts/ChapterLayout";

const Chapter = () => {
  const router = useRouter();
  console.log(router);
  return <ChapterLayout>asgsfagfsgfsffs</ChapterLayout>;
};

export default Chapter;
