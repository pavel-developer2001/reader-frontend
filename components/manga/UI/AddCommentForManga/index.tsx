import { SendOutlined } from "@ant-design/icons";
import { Button, message, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../../store/modules/comment/comment.slice";
import { dataUser } from "../../../../utils/getDataUserFromToken";
import styles from "./AddCommentForManga.module.scss";

interface AddCommentForMangaProps {
  mangaId: string | string[] | undefined;
}
const AddCommentForManga: FC<AddCommentForMangaProps> = ({ mangaId }) => {
  const dispatch = useDispatch();
  const [spoiler, setSpoiler] = useState(false);
  const [commentText, setCommentText] = useState("");
  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload: {
        commentText: string;
        mangaId: string | string[] | undefined;
        spoiler: boolean;
      } = { commentText, spoiler, mangaId };
      await dispatch(addComment(payload));
      message.success("Комментарий был создан");
      setCommentText("");
      setSpoiler(false);
    } catch (e: any) {
      message.error("Произошла ошибка", e);
    }
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
