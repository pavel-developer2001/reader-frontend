import { GoogleOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal";
import React from "react";

interface LoginModalProps {
  isModalVisible: boolean | undefined;
  handleOk: () => void;
  handleCancel: () => void;
}
const LoginModal: React.FC<LoginModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const [register, setRegister] = React.useState<boolean>(false);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title={register ? "Регистрация" : "Войти"}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {register ? (
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Логин'
            name='name'
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Пароль'
            name='password'
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label='Повторить пароль'
            name='password2'
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type={register ? "primary" : "link"} htmlType='submit'>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <>
          <div>
            <Button type='primary' icon={<GoogleOutlined />} size='large' />
            <Button type='primary' icon={<TwitterOutlined />} size='large' />
          </div>
          <Form
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label='Логин'
              name='username'
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Пароль'
              name='password'
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Войти
              </Button>
              <Button
                onClick={() => setRegister(true)}
                type='link'
                htmlType='submit'
              >
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>{" "}
        </>
      )}
    </Modal>
  );
};

export default LoginModal;
