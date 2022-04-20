import { GoogleOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Modal from "antd/lib/modal";
import { useRouter } from "next/dist/client/router";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginUsers,
  registerUsers,
} from "../../../../store/modules/user/user.slice";

interface LoginModalProps {
  isModalVisible: boolean | undefined;
  handleOk: () => void;
  handleCancel: () => void;
  setIsModalVisible: any;
}
const LoginModal: FC<LoginModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  setIsModalVisible,
}) => {
  const [register, setRegister] = useState<boolean>(false);
  const onFinish = (values: string) => {
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

  const handleRegistration = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (password === password2) {
        const payload = await {
          name,
          email,
          password,
        };
        dispatch(registerUsers(payload));
        message.success("Вы успешно создали свои аккаунт");
        setName("");
        setEmail("");
        setPassword("");
        setPassword2("");
        setIsModalVisible(false);
        router.push("/");
      }
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload = await {
        email,
        password,
      };
      dispatch(loginUsers(payload));
      message.success("Вы успешно вошли в свой аккаунт");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
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
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Логин"
            name="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
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
            label="Пароль"
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Повторить пароль"
            name="password2"
            value={password2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword2(e.target.value)
            }
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type={register ? "primary" : "link"}
              htmlType="submit"
              onClick={handleRegistration}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <>
          <div>
            <Button type="primary" icon={<GoogleOutlined />} size="large" />
            <Button type="primary" icon={<TwitterOutlined />} size="large" />
          </div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
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
              label="Пароль"
              name="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" onClick={handleLogin} htmlType="submit">
                Войти
              </Button>
              <Button
                onClick={() => setRegister(true)}
                type="link"
                htmlType="submit"
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
