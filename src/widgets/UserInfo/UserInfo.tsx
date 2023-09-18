import { useEffect } from "react"
import { Avatar, Empty, Spin, Typography, Tabs } from "antd"
import { useRouter } from "next/dist/client/router"
import { useDispatch, useSelector } from "react-redux"
import dynamic from "next/dynamic"
import styles from "./UserInfo.module.scss"
import {
  selectUserData,
  selectUserLoading,
  selectUserToken,
} from "../../entities/user/model/user.selector"
import {
  selectBookMarkLoading,
  selectBookMarksData,
} from "../../entities/bookmark/model/bookMark.selector"
import { getBookMarks } from "../../entities/bookmark/model/bookMark.slice"

const CreateTeamModal = dynamic(
  () => import("../../entities/team/ui/CreateTeamModal"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin />
      </div>
    ),
  }
)
const InvitationsInTeamsBlock = dynamic(
  () => import("../../entities/team/ui/InvitationsInTeamsBlock"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin />
      </div>
    ),
  }
)
const UserInTeamsBlock = dynamic(
  () => import("../../entities/team/ui/UserInTeamsBlock"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin />
      </div>
    ),
  }
)
const DynamicCardManga = dynamic(
  () => import("../../entities/manga/ui/CardManga"),
  {
    loading: () => (
      <div className="loader-block">
        <Spin />
      </div>
    ),
  }
)

const { TabPane } = Tabs
const { Title } = Typography

export const UserInfo = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const token = useSelector(selectUserToken)
  const user = useSelector(selectUserData)
  const loading = useSelector(selectUserLoading)
  const bookMarks = useSelector(selectBookMarksData)
  const loadingMark = useSelector(selectBookMarkLoading)

  useEffect(() => {
    dispatch(getBookMarks(router.query.id))
  }, [router.query.id])
  const info = [
    { count: "13.9K", text: "Прочитано глав" },
    { count: "10.8K", text: "Лайков к главам" },
    { count: "687", text: "Комментариев" },
  ]

  return (
    <div className={styles.main}>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <div className={styles.header}>
            {" "}
            {user.avatar ? (
              <Avatar size={156} src={user.avatar} />
            ) : (
              <Avatar
                size={156}
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            )}
            <div className={styles.userData}>
              <Title level={3} className={styles.name}>
                {user.name}
              </Title>
              <div className={styles.count}>
                {info.map((obj) => (
                  <div className={styles.text} key={obj.text}>
                    <strong>{obj.count}</strong> {obj.text}
                  </div>
                ))}
              </div>
            </div>
          </div>{" "}
          <div className={styles.body}>
            <Tabs tabPosition="left">
              <TabPane tab="Профиль" key="1">
                id: {user.id} Пол: Мужской
              </TabPane>
              <TabPane tab="Закладки" key="2">
                <div className={styles.markList}>
                  {loadingMark ? (
                    <Spin />
                  ) : bookMarks.length > 0 ? (
                    bookMarks.map((mark) => (
                      <DynamicCardManga key={mark.id} manga={mark.manga} />
                    ))
                  ) : (
                    <Empty description={<span>Пусто</span>} />
                  )}
                </div>
              </TabPane>
              <TabPane tab="Команды" key="3">
                <div>
                  <UserInTeamsBlock />
                  {token && (
                    <>
                      <InvitationsInTeamsBlock /> <CreateTeamModal />
                    </>
                  )}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </>
      )}
    </div>
  )
}
