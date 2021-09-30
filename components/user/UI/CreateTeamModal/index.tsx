import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import styles from "./CreateTeamModal.module.scss";

const CreateTeamModal = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean | null>();
  const [imageUrl, setImageUrl] = useState("");
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className={styles.uploadText}>Добавить обложку для команды</div>
    </div>
  );

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
  const handleChange = (e: any) => {
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
    <div>
      <Button
        type='primary'
        icon={<PlusOutlined />}
        onClick={showModal}
        size='large'
      >
        Создать новую
      </Button>
      <Modal
        title='Создать новую команду'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
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
        <TextArea placeholder='Название команды' autoSize />
        <div style={{ margin: "24px 0" }} />
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Описание'
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <div style={{ margin: "24px 0" }} />
        <Button type='primary' size='large'>
          Создать
        </Button>
      </Modal>
    </div>
  );
};

export default CreateTeamModal;
