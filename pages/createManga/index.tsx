import React from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./CreateManga.module.css";
import { Upload, message, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "rc-textarea";

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
  const [loading, setLoading] = React.useState<boolean | null>();
  const [imageUrl, setImageUrl] = React.useState("");
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };
  const [value, setValue] = React.useState("");
  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
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
            <span>Test</span>
            <TextArea
              placeholder='Autosize height based on content lines'
              autoSize
            />
            <span>Test</span>
            <TextArea
              placeholder='Autosize height based on content lines'
              autoSize
            />
            <span>Test</span>
            <TextArea
              placeholder='Autosize height based on content lines'
              autoSize
            />
          </div>
        </div>
        <div className={styles.body}>
          <span>Описание</span>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Controlled autosize'
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <Button type='primary'>Создать</Button>
      </div>
    </MainLayout>
  );
};

export default CreateManga;
