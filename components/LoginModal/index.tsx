import { GoogleOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal";
import { Router, useRouter } from "next/dist/client/router";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUsers } from "../../store/slices/userSlice";

interface LoginModalProps {
  isModalVisible: boolean | undefined;
  handleOk: () => void;
  handleCancel: () => void;
}
const LoginModal: FC<LoginModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const [register, setRegister] = useState<boolean>(false);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleRegistration = async (e: any) => {
    e.preventDefault();
    try {
      if (password === password2) {
        const payload = await {
          name,
          email,
          password,
        };
        console.log(payload);
        dispatch(registerUsers(payload));
        setName("");
        setEmail("");
        setPassword("");
        setPassword2("");
        router.push("/");
      }
    } catch (error) {}
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
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label='Повторить пароль'
            name='password2'
            value={password2}
            onChange={(e: any) => setPassword2(e.target.value)}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type={register ? "primary" : "link"}
              htmlType='submit'
              onClick={handleRegistration}
            >
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
