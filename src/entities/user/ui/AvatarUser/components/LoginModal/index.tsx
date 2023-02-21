import Modal from "antd/lib/modal"
import React, { FC, useState } from "react"
import LoginComponent from "./components/Login"
import RegisterComponent from "./components/Register"

interface LoginModalProps {
  isModalVisible: boolean | undefined
  handleOk: () => void
  handleCancel: () => void
  setIsModalVisible: (arg: boolean) => void
}
const LoginModal: FC<LoginModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  setIsModalVisible,
}) => {
  const [register, setRegister] = useState<boolean>(false)
  return (
    <Modal
      title={register ? "Регистрация" : "Войти"}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {register ? (
        <RegisterComponent
          register={register}
          setIsModalVisible={setIsModalVisible}
        />
      ) : (
        <LoginComponent setRegister={setRegister} />
      )}
    </Modal>
  )
}

export default LoginModal
