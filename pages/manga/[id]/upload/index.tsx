import TextArea from "antd/lib/input/TextArea";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import MainLayout from "../../../../layouts/MainLayout";

import { Upload, Modal, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { dataUser } from "../../../../utils/getDataUserFromToken";
import { useDispatch, useSelector } from "react-redux";
import { addNewChapter } from "../../../../store/slices/chapterSlice";
import styles from "./Upload.module.scss";
import { getTeamsForUser } from "../../../../store/slices/teamSlice";

const { Option } = Select;

function getBase64(file: any) {
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
  console.log(mangaId);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>+</div>
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
  console.log("team id", teamId);
  const teams = useSelector<any>((state) => state.team.teamsUser);
  const loading = useSelector<any>((state) => state.team.loading);
  useEffect(() => {
    dispatch(getTeamsForUser(dataUser.id));
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
  const handleNewChapter = async (e: any) => {
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
      formData.append("userId", dataUser.id);
      formData.append("teamId", teamId);
      for (let i = 0; i < imagesList.length; i++) {
        formData.append("imagesList[]", imagesList[i].originFileObj);
      }
      dispatch(addNewChapter(formData));
      router.push("/manga/" + mangaId);
      setLanguage("");
      setTeamId("");
      setTitleChapter("");
      setNumberChapter("");
      setVolumeChapter("");
      setImagesList([]);
    } catch (error) {}
  };
  return (
    <MainLayout>
      <div onClick={() => router.push("/manga/" + mangaId)}>
        Начало после конца
      </div>
      <div>
        <TextArea
          placeholder='Том манги'
          autoSize
          value={volumeChapter}
          onChange={(e) => setVolumeChapter(e.target.value)}
        />
        <div style={{ margin: "24px 0" }} />
        <TextArea
          placeholder='Глава манги'
          autoSize
          value={numberChapter}
          onChange={(e) => setNumberChapter(e.target.value)}
        />
        <div style={{ margin: "24px 0" }} />
        <TextArea
          placeholder='Загаловок главы'
          autoSize
          value={titleChapter}
          onChange={(e) => setTitleChapter(e.target.value)}
        />
        <div style={{ margin: "24px 0" }} />
        <div className={styles.footerBlock}>
          {loading ? (
            <p>loading</p>
          ) : (
            <div className={styles.select}>
              <div>Выбрать команду, если вы состоите в команде</div>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder='Выбрать команду'
                optionFilterProp='children'
                onChange={(value) => setTeamId(value)}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {teams
                  .filter((item: any) => item.roleInTeam == "Глава")
                  .map((team: any) => (
                    <Option key={team.id} value={team.team.id}>
                      {team.team.teamName}
                    </Option>
                  ))}
              </Select>
            </div>
          )}
          <div className={styles.language}>
            {" "}
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Выбрать язык'
              optionFilterProp='children'
              onChange={(value) => setLanguage(value)}
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
      </div>
      <div>
        {" "}
        <>
          <Upload
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            listType='picture-card'
            fileList={imagesList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {imagesList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt='example' style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </>
      </div>
      <div>
        <Button type='primary' onClick={handleNewChapter}>
          Добавить главу
        </Button>
      </div>
    </MainLayout>
  );
};

export default AddNewChapter;
