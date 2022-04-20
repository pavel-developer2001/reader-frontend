import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTeam } from "../../../../store/modules/team/team.slice";
import { dataUser } from "../../../../utils/getDataUserFromToken";
import styles from "./CreateTeamModal.module.scss";

const CreateTeamModal = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [loading, setLoading] = useState<boolean | null>();
  const [imageUrl, setImageUrl] = useState("");

  /////////////////////////////////////////////
  const [teamCover, setTeamCover] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamSubtitle, setTeamSubtitle] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const handleAddTeam = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (teamName === "") {
        return alert("Напишите название комнаты");
      }
      const formData = new FormData();
      formData.append("teamName", teamName);
      formData.append("teamSubtitle", teamSubtitle);
      formData.append("teamDescription", teamDescription);
      formData.append("teamCover", teamCover);
      dispatch(addNewTeam(formData));
      message.success("Команда была создана");
      setTeamName("");
      setTeamSubtitle("");
      setIsModalVisible(false);
      setTeamDescription("");
      setTeamCover("");
      setImageUrl("");
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  ////////////////////////////////////////////////
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
    setTeamCover(e.file.originFileObj);
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
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        size="large"
      >
        Создать новую
      </Button>
      <Modal
        title="Создать новую команду"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
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
        <TextArea
          placeholder="Название команды"
          autoSize
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <div style={{ margin: "24px 0" }} />
        <TextArea
          placeholder="Подзагаловок команды"
          autoSize
          value={teamSubtitle}
          onChange={(e) => setTeamSubtitle(e.target.value)}
        />
        <div style={{ margin: "24px 0" }} />
        <TextArea
          placeholder="Описание"
          value={teamDescription}
          onChange={(e) => setTeamDescription(e.target.value)}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <div style={{ margin: "24px 0" }} />
        <Button type="primary" size="large" onClick={handleAddTeam}>
          Создать команду
        </Button>
      </Modal>
    </div>
  );
};

export default CreateTeamModal;
