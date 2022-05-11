import TextArea from "antd/lib/input/TextArea";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Upload, Modal, Button, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { dataUser } from "../../../../utils/getDataUserFromToken";
import MainLayout from "../../../../layouts/MainLayout";
import { addNewChapter } from "../../../../store/modules/chapter/chapter.slice";
import { getTeamsForUser } from "../../../../store/modules/team/team.slice";
import {
  selectTeamLoading,
  selectTeamsUserData,
} from "../../../../store/modules/team/team.selector";
import { wrapper } from "../../../../store";
import styles from "./Upload.module.scss";

const { Option } = Select;

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const AddNewChapter = () => {
  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val: string) {
    console.log("search:", val);
  }
  const router = useRouter();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imagesList, setImagesList] = useState<any>([]);
  const mangaId: any = router.query.id;
  const uploadButton = (
    <div>
      <div className={styles.plus}>+</div>
    </div>
  );
  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList }: any) => setImagesList(fileList);
  const [teamId, setTeamId] = useState<any>("");
  const teams = useSelector(selectTeamsUserData);
  const loading = useSelector(selectTeamLoading);
  useEffect(() => {
    dispatch(getTeamsForUser(dataUser));
  }, []);
  ////////////////////////////////////////////////////////////////////
  const [numberChapter, setNumberChapter] = useState("");
  const [volumeChapter, setVolumeChapter] = useState("");
  const [titleChapter, setTitleChapter] = useState("");
  const [language, setLanguage] = useState("");
  const languageArray = [
    { lang: "Русский" },
    { lang: "Английский" },
    { lang: "Укрианский" },
    { lang: "Японский" },
    { lang: "Корейский" },
    { lang: "Китайский" },
    { lang: "Испанский" },
    { lang: "Француский" },
    { lang: "Португальский" },
    { lang: "Другой" },
  ];
  const dispatch = useDispatch();
  const handleNewChapter = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (numberChapter === "" && volumeChapter === "") {
        return alert("Введите номер тома и главы");
      }
      const formData = new FormData();
      formData.append("numberChapter", numberChapter);
      formData.append("volumeChapter", volumeChapter);
      formData.append("titleChapter", titleChapter);
      formData.append("language", language);
      formData.append("mangaId", mangaId);
      formData.append("teamId", teamId);
      for (let i = 0; i < imagesList.length; i++) {
        formData.append("imagesList[]", imagesList[i].originFileObj);
      }
      //@ts-ignore
      dispatch(addNewChapter(formData));
      message.success("Глава была успешно добавлена");
      router.push("/manga/" + mangaId);
      setLanguage("");
      setTeamId("");
      setTitleChapter("");
      setNumberChapter("");
      setVolumeChapter("");
      setImagesList([]);
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  return (
    <MainLayout>
      <div className={styles.main}>
        <div
          className={styles.userData}
          onClick={() => router.push("/manga/" + mangaId)}
        >
          Начало после конца
        </div>
        <div className={styles.top}>
          <div className={styles.select}>
            <span className={styles.text}>Топ манги</span>
            <TextArea
              placeholder="Том"
              autoSize
              value={volumeChapter}
              onChange={(e) => setVolumeChapter(e.target.value)}
            />
          </div>
          <div className={styles.select}>
            <span className={styles.text}>Глава манги</span>
            <TextArea
              placeholder="Глава"
              autoSize
              value={numberChapter}
              onChange={(e) => setNumberChapter(e.target.value)}
            />
          </div>
          <div className={styles.select}>
            <span className={styles.text}>Выбрать язык</span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Язык"
              optionFilterProp="children"
              onChange={(value: string) => setLanguage(value)}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {languageArray.map((arr, index) => (
                <Option key={index} value={arr.lang}>
                  {arr.lang}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.selectSecondary}>
            <span className={styles.text}>Загаловок главы</span>
            <TextArea
              placeholder="Загаловок"
              autoSize
              value={titleChapter}
              onChange={(e) => setTitleChapter(e.target.value)}
            />
          </div>
          <div className={styles.selectSecondary}>
            {loading ? (
              <p>loading</p>
            ) : (
              <div className={styles.modalSelect}>
                <span className={styles.text}>
                  Выбрать команду, если вы состоите в команде
                </span>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Выбрать команду"
                  optionFilterProp="children"
                  onChange={(value) => setTeamId(value)}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {teams
                    .filter((item) => item.roleInTeam == "Глава")
                    .map((team) => (
                      <Option key={team.id} value={team.team.id}>
                        {team.team.teamName}
                      </Option>
                    ))}
                </Select>
              </div>
            )}
          </div>
        </div>
        <div className={styles.pages}>
          <span className={styles.text}>Страницы главы</span>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={imagesList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
        <div className={styles.btnCreate}>
          <Button type="primary" onClick={handleNewChapter}>
            Добавить главу
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );
    return {
      props: {},
    };
  });

export default AddNewChapter;
