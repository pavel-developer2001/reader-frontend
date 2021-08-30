import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

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
  const [value, setValue] = React.useState<string>("");
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
