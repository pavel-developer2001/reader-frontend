import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./CreateManga.module.css";
import { Upload, message, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "rc-textarea";
import { dataUser } from "../../utils/getDataUserFromToken";
import { useDispatch } from "react-redux";
import { addNewManga } from "../../store/slices/mangaSlice";
import { useRouter } from "next/dist/client/router";

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
const CreateManga = () => {
  ////////////////////
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [mangaDescription, setMangaDescription] = useState("");
  const [yearOfIssue, setYearOfIssue] = useState("");
  const [mangaCover, setMangaCover] = useState("");
  const handleCreateNewManga = async (e: any) => {
    e.preventDefault();
    try {
      if (title === "") {
        return alert("Напишите название комнаты");
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("englishTitle", englishTitle);
      formData.append("originalTitle", originalTitle);
      formData.append("mangaDescription", mangaDescription);
      formData.append("yearOfIssue", yearOfIssue);
      formData.append("userId", dataUser.id);
      formData.append("mangaCover", mangaCover);
      dispatch(addNewManga(formData));
      setTitle("");
      setEnglishTitle("");
      setOriginalTitle("");
      setMangaDescription("");
      setYearOfIssue("");
      setImageUrl("");
      router.push("/");
    } catch (error) {}
  };
  ////////////////////////
  const [loading, setLoading] = useState<boolean | null>();
  const [imageUrl, setImageUrl] = useState("");
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className={styles.uploadText}>Добавить обложку для манги</div>
    </div>
  );
  const handleChange = (e: any) => {
    setMangaCover(e.file.originFileObj);
    if (e.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (e.file.status === "done") {
      getBase64(e.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };
  return (
    <MainLayout>
      <div className={styles.content}>
        <h2 className={styles.title}>Добавить мангу на сайт</h2>
        <div className={styles.header}>
          <div>
            <Upload
              className={styles.customUpload}
              name='file'
              listType='picture-card'
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt='avatar' style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div className={styles.info}>
            <div className={styles.block}>
              <span>Русское название</span>
              <TextArea
                placeholder='название'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span>Английское названия</span>
              <TextArea
                placeholder='Англиское название'
                value={englishTitle}
                onChange={(e) => setEnglishTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span>Оригинальное названия</span>
              <TextArea
                placeholder='Оригинальное название '
                value={originalTitle}
                onChange={(e) => setOriginalTitle(e.target.value)}
                autoSize
              />
            </div>
            <div className={styles.block}>
              <span>Год выпуска</span>
              <TextArea
                placeholder='Год'
                autoSize
                value={yearOfIssue}
                onChange={(e) => setYearOfIssue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <span>Описание</span>
          <TextArea
            value={mangaDescription}
            onChange={(e) => setMangaDescription(e.target.value)}
            placeholder='Описание'
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <Button type='primary' onClick={handleCreateNewManga}>
          Создать
        </Button>
      </div>
    </MainLayout>
  );
};

export default CreateManga;
