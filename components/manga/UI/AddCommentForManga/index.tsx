import { SendOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import styles from "./AddCommentForManga.module.scss";

const AddCommentForManga = () => {
  const [spoiler, setSpoiler] = useState(false);
  console.log("Spoiler", spoiler);

  return (
    <div className={styles.addComment}>
      <TextArea
        showCount
        placeholder='Оставить комментарий'
        autoSize={{ minRows: 2, maxRows: 3 }}
        maxLength={500}
      />
      <div className={styles.commentSetting}>
        <div className={styles.spoiler}>
          <Switch onChange={(checked) => setSpoiler(checked)} /> Спойлер
        </div>
        <div className={styles.btn}>
          <Button
            type='default'
            shape='circle'
            icon={<SendOutlined />}
            size='large'
          />
        </div>
      </div>
    </div>
  );
};

export default AddCommentForManga;
