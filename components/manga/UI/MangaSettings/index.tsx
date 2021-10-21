import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, message } from "antd";
import { Select } from "antd";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBookMark } from "../../../../models/IBookMark";
import { RootState } from "../../../../store/reducer";
import {
  addBookMark,
  getBookMarkToManga,
  updateBookMark,
} from "../../../../store/slices/bookMarkSlice";
import { dataUser } from "../../../../utils/getDataUserFromToken";
import AddMangaForTeam from "./components/AddMangaForTeam";
import styles from "./MangaSettings.module.scss";

interface MangaSettingsProps {
  cover: string;
  id: number;
}
const MangaSettings: FC<MangaSettingsProps> = ({ cover, id }) => {
  const dispatch = useDispatch();
  const bookMark = useSelector<RootState, IBookMark[]>(
    (state) => state.bookMark.bookMark
  );
  const loading = useSelector<RootState>((state) => state.bookMark.loading);
  const { Option } = Select;

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }
  const changeMark = async (value: string) => {
    setCategory(value);
    const payload = await { category: value, mangaId: id, userId: dataUser.id };
    if (bookMark == null) {
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

  const dataManga: { mangaId: string | string[] | undefined; userId: number } =
    { mangaId: router.query.id, userId: dataUser.id };
  useEffect(() => {
    dispatch(getBookMarkToManga(dataManga));
  }, [router, loading]);
  return (
    <div className={styles.card}>
      <Image width={250} height={350} src={cover} />
      <div className={styles.settings}>
        <div className={styles.item}>
          <Button type='primary' shape='round' size='large'>
            Читать
          </Button>
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          <Button type='link'>Редактировать</Button>
        </div>
        <div className={styles.item}>
          <Link href={"/manga/" + id + "/upload"}>
            <a>
              <Button type='primary' icon={<PlusOutlined />} size='large'>
                Добавить новые главы
              </Button>
            </a>
          </Link>
        </div>
        <div className={styles.item}>
          <AddMangaForTeam />
        </div>
      </div>
    </div>
  );
};

export default MangaSettings;
