import React, { useState } from "react";
import { Comment, Tooltip, Avatar, Switch, Button } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import styles from "./CommentsBlockList.module.scss";
import Link from "next/link";
import AddCommentForManga from "../AddCommentForManga";
import TextArea from "rc-textarea";

const CommentsBlock = () => {
  const [likes, setLikes] = useState(0);
  const [spoiler, setSpoiler] = useState(false);
  console.log("SPOILER", spoiler);
  const [edit, setEdit] = useState(false);
  const [action, setAction] = React.useState<string | null>(null);

  const like = () => {
    setLikes(likes + 1);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(likes - 1);
  };

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span onClick={like}>
        {React.createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
      </span>
    </Tooltip>,
  ];
  const handleRemoveComment = () => {
    console.log("REMOVE");
  };
  const handleUpdateComment = () => {
    console.log("UPDATE");
  };
  return (
    <div>
      <Comment
        actions={!edit ? actions : null}
        author={<Link href={"/user/19"}>Han Solo</Link>}
        avatar={
          <Avatar
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            alt='Han Solo'
          />
        }
        content={
          <div className={styles.content}>
            {!edit ? (
              <div className={styles.edit} onClick={() => setEdit(true)}>
                <EditOutlined size={30} />
              </div>
            ) : (
              <div onClick={handleUpdateComment} className={styles.ready}>
                <Button shape='circle' icon={<CheckOutlined />} />
              </div>
            )}
            {!edit ? (
              <p className={styles.text}>
                e supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.W
              </p>
            ) : (
              <div className={styles.editBlock}>
                <TextArea
                  showCount
                  autoSize={{ minRows: 2, maxRows: 3 }}
                  className={styles.area}
                  maxLength={500}
                  defaultValue='e supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.W'
                />

                <div className={styles.footer}>
                  <div className={styles.left}>
                    <div
                      className={styles.delete}
                      onClick={handleRemoveComment}
                    >
                      {" "}
                      <Button shape='circle' icon={<DeleteOutlined />} />
                    </div>
                    <div className={styles.spoiler}>
                      <Switch onChange={(checked) => setSpoiler(checked)} />{" "}
                      Спойлер
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.btn}>
                      <Button onClick={() => setEdit(false)}>Отмена</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().from("2021-10-02T13:05:23.593Z")}</span>
          </Tooltip>
        }
      />
    </div>
  );
};
const CommentBlockList = () => {
  return (
    <div className={styles.list}>
      <div className={styles.title}>Комментарии 89</div>
      <AddCommentForManga />
      <div className={styles.commentList}>
        <CommentsBlock />
        <CommentsBlock />
        <CommentsBlock />
        <CommentsBlock />
      </div>
    </div>
  );
};

export default CommentBlockList;
