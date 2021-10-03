import { SendOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../../store/slices/commentSlice";
import { dataUser } from "../../../../utils/getDataUserFromToken";
import styles from "./AddCommentForManga.module.scss";

const AddCommentForManga: FC<any> = ({ mangaId }) => {
  const dispatch = useDispatch();
  const [spoiler, setSpoiler] = useState(false);
  const [commentText, setCommentText] = useState("");
  const handleAddComment = async (e: any) => {
    e.preventDefault();
    try {
      const payload = { commentText, spoiler, mangaId, userId: dataUser.id };
      await dispatch(addComment(payload));
      setCommentText("");
      setSpoiler(false);
    } catch (error) {}
  };
  return (
    <div className={styles.addComment}>
      <TextArea
        showCount
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
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
            onClick={handleAddComment}
            icon={<SendOutlined />}
            size='large'
          />
        </div>
      </div>
    </div>
  );
};

export default AddCommentForManga;
