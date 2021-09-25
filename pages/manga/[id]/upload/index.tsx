import TextArea from "antd/lib/input/TextArea";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import MainLayout from "../../../../layouts/MainLayout";

import { Upload, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const AddNewChapter = () => {
  const router = useRouter();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const mangaId = router.query.id;
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
  const handleChange = ({ fileList }: any) => setFileList(fileList);
  return (
    <MainLayout>
      <div onClick={() => router.push("/manga/" + mangaId)}>
        Начало после конца
      </div>
      <div>
        <TextArea placeholder='Том манги' autoSize />
        <div style={{ margin: "24px 0" }} />
        <TextArea placeholder='Глава манги' autoSize />
        <div style={{ margin: "24px 0" }} />
      </div>
      <div>
        {" "}
        <>
          <Upload
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            listType='picture-card'
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
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
        <Button type='primary'>Добавить главу</Button>
      </div>
    </MainLayout>
  );
};

export default AddNewChapter;
