import React, { FC, useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./UploadImageForManga.module.scss";

function getBase64(img: Blob, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file: File) {
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

interface UploadImageForMangaProps {
  imageUrl: string;
  setImageUrl: (arg: string) => void;
  setMangaCover: (arg: string) => void;
}

const UploadImageForManga: FC<UploadImageForMangaProps> = ({
  imageUrl,
  setImageUrl,
  setMangaCover,
}) => {
  const [loading, setLoading] = useState<boolean | null>();
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
      getBase64(e.file.originFileObj, (imageUrl: string) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };
  return (
    <div className={styles.upload}>
      <Upload
        className={styles.customUpload}
        name="file"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default UploadImageForManga;
