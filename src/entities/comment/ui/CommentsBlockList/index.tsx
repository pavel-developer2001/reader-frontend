import {
  createElement,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react"
import { Comment, Tooltip, Avatar, Switch, Button, message, Spin } from "antd"
import moment from "moment"
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import TextArea from "rc-textarea"
import { useRouter } from "next/dist/client/router"
import { useDispatch, useSelector } from "react-redux"
import AddCommentForManga from "../../../../features/AddCommentForManga"
import {
  deleteComment,
  getComments,
  updateComment,
} from "../../model/comment.slice"
import {
  selectCommentLoading,
  selectCommentsData,
} from "../../model/comment.selector"
import { selectUserToken } from "../../../user/model/user.selector"
import styles from "./CommentsBlockList.module.scss"

interface CommentsBlockProps {
  commentId: number
  text: string
  commentSpoiler: boolean
  commentLikes: number
  date: string
  userAvatar: string
  userName: string
  userId: number
  token: string
}
export const CommentsBlock: FC<CommentsBlockProps> = ({
  commentId,
  text,
  commentSpoiler,
  commentLikes,
  date,
  userAvatar,
  userName,
  userId,
  token,
}) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(commentLikes)
  const [spoiler, setSpoiler] = useState(commentSpoiler)
  const [commentText, setCommentText] = useState(text)
  const [edit, setEdit] = useState(false)
  const [action, setAction] = useState<string | null>(null)

  const like = () => {
    setLikes(likes + 1)
    setAction("liked")
  }

  const dislike = () => {
    setLikes(likes - 1)
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like} className={styles.likeBtn}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className={styles.like}>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike} className={styles.likeBtn}>
        {createElement(action === "disliked" ? DislikeFilled : DislikeOutlined)}
      </span>
    </Tooltip>,
  ]
  const handleRemoveComment = async () => {
    try {
      await dispatch(deleteComment(commentId))
      message.success("Комментарий был удалён")
    } catch (error: any) {
      message.error("Произошла ошибка", error)
    }
  }
  const handleUpdateComment: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault()
    try {
      const data = { id: commentId, payload: { commentText, spoiler } }
      await dispatch(updateComment(data))
      message.success("Комментарий был обновлён")
      setEdit(false)
    } catch (error: any) {
      message.error("Произошла ошибка", error)
    }
  }
  return (
    <div data-testid="comment-item">
      <Comment
        actions={!edit ? actions : undefined}
        author={
          <Link href={"/user/" + userId}>
            <a className={styles.userName}>{userName}</a>
          </Link>
        }
        avatar={
          <Avatar
            className={styles.avatar}
            src={
              userAvatar
                ? userAvatar
                : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
            alt={userName}
          />
        }
        content={
          <div className={styles.content}>
            {!edit ? (
              <div className={styles.edit} onClick={() => setEdit(true)}>
                {token && <EditOutlined size={30} />}
              </div>
            ) : (
              token && (
                <div onClick={handleUpdateComment} className={styles.ready}>
                  <Button shape="circle" icon={<CheckOutlined />} />
                </div>
              )
            )}
            {!edit ? (
              spoiler ? (
                <Button
                  className={styles.spoiler}
                  onClick={() => setSpoiler(false)}
                >
                  Спойлер
                </Button>
              ) : (
                <p className={styles.text}>{text}</p>
              )
            ) : (
              <div className={styles.editBlock}>
                <TextArea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  autoSize={{ minRows: 2, maxRows: 3 }}
                  className={styles.area}
                  maxLength={500}
                  defaultValue={text}
                />

                <div className={styles.footer}>
                  <div className={styles.left}>
                    <div
                      className={styles.delete}
                      onClick={handleRemoveComment}
                    >
                      {" "}
                      <Button shape="circle" icon={<DeleteOutlined />} />
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
            <span>{moment().from(date)} назад</span>
          </Tooltip>
        }
      />
    </div>
  )
}
const CommentBlockList = () => {
  const token = useSelector(selectUserToken)
  const router = useRouter()
  const dispatch = useDispatch()
  const mangaId = router.query.id
  const comments = useSelector(selectCommentsData)
  const loading = useSelector(selectCommentLoading)
  useEffect(() => {
    if (mangaId) {
      dispatch(getComments(mangaId))
    }
  }, [mangaId])
  return (
    <div className={styles.list} data-testid="div">
      {loading ? (
        <Spin data-testid="loading" />
      ) : (
        <>
          <div className={styles.title}>Комментарии {comments.length}</div>
          {token && <AddCommentForManga mangaId={mangaId} />}

          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentsBlock
                data-testid="comment-item"
                token={token}
                key={comment.id}
                commentId={comment.id}
                text={comment.commentText}
                commentSpoiler={comment.spoiler}
                commentLikes={comment.countLikes}
                date={comment.createdAt}
                userAvatar={comment?.user?.avatar}
                userName={comment?.user?.name}
                userId={comment?.user?.id}
              />
            ))
          ) : (
            <p>Пусто</p>
          )}
        </>
      )}
    </div>
  )
}

export default CommentBlockList
