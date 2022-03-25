import { EditOutlined, PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import Image from "next/image";
import { Select } from "antd";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookMark,
  getBookMarkToManga,
  updateBookMark,
} from "../../../../store/modules/bookMark/bookMark.slice";
import AddMangaForTeam from "./components/AddMangaForTeam";
import styles from "./MangaSettings.module.scss";
import {
  selectBookMarkItemData,
  selectBookMarkLoading,
} from "../../../../store/modules/bookMark/bookMark.selector";
import { selectUserToken } from "../../../../store/modules/user/user.selector";

interface MangaSettingsProps {
  cover: string;
  id: number;
}
const MangaSettings: FC<MangaSettingsProps> = ({ cover, id }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);
  const bookMark = useSelector(selectBookMarkItemData);
  const loading = useSelector(selectBookMarkLoading);
  const { Option } = Select;

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }
  const changeMark = async (value: string) => {
    setCategory(value);
    const payload = await { category: value, mangaId: id };
    if (!bookMark) {
      await dispatch(addBookMark(payload));
      message.success("Манга добавлена в закладки");
    }
    if (bookMark && payload.category != "Удалить из закладок") {
      await dispatch(updateBookMark(payload));
      message.success("Манга была добавлена в другую категорию закладкок");
    }
    if (payload.category == "Удалить из закладок") {
      await dispatch(addBookMark(payload));
      message.success("Манга была удалена из закладок");
    }
  };

  function onSearch(val: string) {
    console.log("search:", val);
  }
  const router = useRouter();
  const [category, setCategory] = useState("");

  const dataManga: { mangaId: string | string[] | undefined } = {
    mangaId: router.query.id,
  };
  useEffect(() => {
    if (token) {
      dispatch(getBookMarkToManga(dataManga));
    }
  }, [router, loading]);
  return (
    <>
      <div className={styles.card}>
        <Image
          width={250}
          height={350}
          src={cover}
          alt='cover manga'
          className={styles.img}
        />
        {token && (
          <div className={styles.settings}>
            <div className={styles.features}>
              <div className={styles.feature}>
                <Link href={"/manga/" + id + "/upload"}>
                  <a>
                    <Tooltip title='Добавить новые главы'>
                      <Button
                        type='primary'
                        shape='circle'
                        icon={<PlusOutlined />}
                      />
                    </Tooltip>
                  </a>
                </Link>
              </div>
              <div className={styles.feature}>
                <AddMangaForTeam />
              </div>
              <div className={styles.feature}>
                <Tooltip title='Сообщение модератору'>
                  <Button
                    type='primary'
                    shape='circle'
                    icon={<WarningOutlined />}
                  />
                </Tooltip>
              </div>
              <div className={styles.feature}>
                <Tooltip title='Редактировать мангу'>
                  <Button
                    type='primary'
                    shape='circle'
                    icon={<EditOutlined />}
                  />
                </Tooltip>
              </div>
            </div>
            <div className={styles.item}>
              {" "}
              {loading ? (
                <p>loading</p>
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
                  optionFilterProp='children'
                  onChange={changeMark}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value='Читаю'>Читаю</Option>
                  <Option value='Прочитано'>Прочитано</Option>
                  <Option value='Буду читать'>Буду читать</Option>
                  <Option value='Брошено'>Брошено</Option>
                  <Option value='Неинтересно'>Неинтересно</Option>
                  <Option value='Отложено'>Отложено</Option>
                  {bookMark != null ? (
                    bookMark?.category ? (
                      <Option value='Удалить из закладок'>
                        Удалить из закладок
                      </Option>
                    ) : null
                  ) : null}
                </Select>
              )}
            </div>
            <div className={styles.item}>
              <Button type='primary' shape='round' size='large'>
                Читать
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MangaSettings;
