import React, { FC } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import { registerUsers } from "../../../../../store/modules/user/user.slice";

interface RegisterComponent {
  register: boolean;
  setIsModalVisible: (arg: false) => void;
}

const RegisterComponentFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "​Минимальная длина 4 символа")
    .required("Введите логин"),
  email: yup.string().email("Неверная почта").required("Введите почту"),
  password: yup
    .string()
    .min(6, "​Минимальная длина пароля 6 символов")
    .required(),
  password2: yup
    .string()
    .min(6, "​Минимальная длина пароля 6 символов")
    .required(),
});

const RegisterComponent: FC<RegisterComponent> = ({
  register,
  setIsModalVisible,
}) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(RegisterComponentFormSchema),
  });
  const handleRegistration = async (data: any) => {
    try {
      if (data.password !== data.password2) return alert("Пароли не совпадают");
      if (data.password === data.password2) {
        const payload = await {
          name: data.name,
          email: data.email,
          password: data.password,
        };
        dispatch(registerUsers(payload));
        reset();
        message.success("Вы успешно создали свои аккаунт");
        setIsModalVisible(false);
      }
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <Controller
        render={({ field }) => (
          <Form.Item {...field} label="Логин" name="name">
            <Input />
          </Form.Item>
        )}
        name="name"
        control={control}
        defaultValue=""
      />
      {!!errors?.name && <p className="error">{errors?.name?.message}</p>}

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
      <Controller
        render={({ field }) => (
          <Form.Item {...field} label="Повторить пароль" name="password">
            <Input.Password />
          </Form.Item>
        )}
        name="password2"
        control={control}
        defaultValue=""
      />
      {!!errors?.password2 && (
        <p className="error">{errors?.password2?.message}</p>
      )}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type={register ? "primary" : "link"} htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </form>
  );
};

export default RegisterComponent;
