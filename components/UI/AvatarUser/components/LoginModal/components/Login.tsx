import { Button, Form, Input, message } from "antd";
import React, { FC } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUsers } from "../../../../../../store/modules/user/user.slice";
import { useDispatch } from "react-redux";

interface LoginProps {
  setRegister: (arg: boolean) => void;
}

const LoginComponentFormSchema = yup.object().shape({
  email: yup.string().email("Неверная почта").required("Введите почту"),
  password: yup
    .string()
    .min(6, "​Минимальная длина пароля 6 символов")
    .required(),
});

const LoginComponent: FC<LoginProps> = ({ setRegister }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginComponentFormSchema),
  });
  const handleLogin = async (data: any) => {
    try {
      const payload = await {
        email: data.email,
        password: data.password,
      };
      dispatch(loginUsers(payload));
      message.success("Вы успешно вошли в свой аккаунт");
      reset();
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Controller
        render={({ field }) => (
          <Form.Item {...field} label="Email" name="email">
            <Input />
          </Form.Item>
        )}
        name="email"
        control={control}
        defaultValue=""
      />
      {!!errors?.email && <p className="error">{errors?.email?.message}</p>}
      <Controller
        render={({ field }) => (
          <Form.Item {...field} label="Пароль" name="password">
            <Input.Password />
          </Form.Item>
        )}
        name="password"
        control={control}
        defaultValue=""
      />
      {!!errors?.password && (
        <p className="error">{errors?.password?.message}</p>
      )}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
        <Button onClick={() => setRegister(true)} htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </form>
  );
};

export default LoginComponent;
