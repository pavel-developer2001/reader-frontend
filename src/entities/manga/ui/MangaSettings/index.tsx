/* eslint-disable no-console */
import { EditOutlined, PlusOutlined, WarningOutlined } from "@ant-design/icons"
import { Button, message, Spin, Tooltip, Select } from "antd"
import Image from "next/image"

import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import dynamic from "next/dynamic"
import {
  addBookMark,
  getBookMarkToManga,
  updateBookMark,
} from "../../../bookmark/model/bookMark.slice"
import {
  selectBookMarkItemData,
  selectBookMarkLoading,
} from "../../../bookmark/model/bookMark.selector"
import { selectUserToken } from "../../../user/model/user.selector"
import styles from "./MangaSettings.module.scss"

const DynamicAddMangaForTeam = dynamic(
  () => import("../../../../features/AddMangaForTeam"),
  {
    loading: () => <Spin />,
  }
)
interface MangaSettingsProps {
  cover: string
  id: number
}
const MangaSettings: FC<MangaSettingsProps> = ({ cover, id }) => {
  const router = useRouter()
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState("")
  const dispatch = useDispatch()
  const token = useSelector(selectUserToken)
  const bookMark = useSelector(selectBookMarkItemData)
  const loading = useSelector(selectBookMarkLoading)
  const { Option } = Select

  function onBlur() {
    console.log("blur")
  }

  function onFocus() {
    console.log("focus")
  }
  const changeMark = async (value: string) => {
    setCategory(value)
    const payload = await { category: value, mangaId: id }
    if (!bookMark) {
      await dispatch(addBookMark(payload))
      message.success("Манга добавлена в закладки")
    }
    if (bookMark && payload.category !== "Удалить из закладок") {
      await dispatch(updateBookMark(payload))
      message.success("Манга была добавлена в другую категорию закладкок")
    }
    if (payload.category === "Удалить из закладок") {
      await dispatch(addBookMark(payload))
      message.success("Манга была удалена из закладок")
    }
  }

  function onSearch(val: string) {
    console.log("search:", val)
  }

  const dataManga: { mangaId: string | string[] | undefined } = {
    mangaId: router.query.id,
  }
  useEffect(() => {
    if (token) {
      dispatch(getBookMarkToManga(dataManga))
    }
  }, [router, loading])
  return (
    <div className={styles.card}>
      {cover && (
        <Image
          width={250}
          height={350}
          src={cover}
          alt="cover manga"
          className={styles.img}
        />
      )}

      {token && (
        <div className={styles.settings}>
          <div className={styles.features}>
            <div className={styles.feature}>
              <Link href={`/manga/${id}/upload`}>
                <a>
                  <Tooltip title="Добавить новые главы">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<PlusOutlined />}
                    />
                  </Tooltip>
                </a>
              </Link>
            </div>
            <div className={styles.feature}>
              <DynamicAddMangaForTeam />
            </div>
            <div className={styles.feature}>
              <Tooltip title="Сообщение модератору">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<WarningOutlined />}
                />
              </Tooltip>
            </div>
            <div className={styles.feature}>
              <Tooltip title="Редактировать мангу">
                <Button type="primary" shape="circle" icon={<EditOutlined />} />
              </Tooltip>
            </div>
          </div>
          <div className={styles.item}>
            {" "}
            {loading ? (
              <Spin />
            ) : (
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder={
                  loading
                    ? "Добавить в закладки"
                    : bookMark != null
                    ? bookMark?.category
                    : "Добавить в закладки"
                }
                optionFilterProp="children"
                onChange={changeMark}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Читаю">Читаю</Option>
                <Option value="Прочитано">Прочитано</Option>
                <Option value="Буду читать">Буду читать</Option>
                <Option value="Брошено">Брошено</Option>
                <Option value="Неинтересно">Неинтересно</Option>
                <Option value="Отложено">Отложено</Option>
                {bookMark != null ? (
                  bookMark?.category ? (
                    <Option value="Удалить из закладок">
                      Удалить из закладок
                    </Option>
                  ) : null
                ) : null}
              </Select>
            )}
          </div>
          <div className={styles.item}>
            <Button type="primary" shape="round" size="large">
              Читать
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MangaSettings
