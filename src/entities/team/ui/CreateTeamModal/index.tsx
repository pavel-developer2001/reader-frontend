import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, message, Modal, Typography, Upload } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useState } from "react"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import styles from "./CreateTeamModal.module.scss"
import { addNewTeam } from "../../model/team.slice"

const CreateTeamModalFormSchema = yup.object().shape({
  teamName: yup.string().required("Введите название команды"),
  teamSubtitle: yup.string().required("Введите подзагаловок команды"),
  teamDescription: yup.string().required("Введите описание команды"),
})
type FormValues = {
  teamName: string
  teamSubtitle: string
  teamDescription: string
}

const CreateTeamModal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(CreateTeamModalFormSchema),
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const [loading, setLoading] = useState<boolean | null>()
  const [imageUrl, setImageUrl] = useState("")

  /// //////////////////////////////////////////
  const [teamCover, setTeamCover] = useState("")

  const handleAddTeam: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = new FormData()
      formData.append("teamName", data.teamName)
      formData.append("teamSubtitle", data.teamSubtitle)
      formData.append("teamDescription", data.teamDescription)
      formData.append("teamCover", teamCover)

      dispatch(addNewTeam(formData))
      message.success("Команда была создана")
      reset()
      setIsModalVisible(false)
      setTeamCover("")
      setImageUrl("")
    } catch (error: any) {
      message.error("Произошла ошибка", error)
    }
  }
  /// /////////////////////////////////////////////
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className={styles.uploadText}>Добавить обложку для команды</div>
    </div>
  )

  function getBase64(img: Blob, callback: any) {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  function beforeUpload(file: File) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
  }
  const handleChange = (e: any) => {
    setTeamCover(e.file.originFileObj)
    if (e.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (e.file.status === "done") {
      getBase64(e.file.originFileObj, (imageUrl: string) => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }
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
        <form onSubmit={handleSubmit(handleAddTeam)}>
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
          <Controller
            render={({ field }) => (
              <TextArea {...field} placeholder="Название команды" autoSize />
            )}
            name="teamName"
            control={control}
            defaultValue=""
          />
          {!!errors?.teamName && (
            <Typography.Text type="danger">
              {errors?.teamName?.message}
            </Typography.Text>
          )}

          <div style={{ margin: "24px 0" }} />
          <Controller
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Подзагаловок команды"
                autoSize
              />
            )}
            name="teamSubtitle"
            control={control}
            defaultValue=""
          />
          {!!errors?.teamSubtitle && (
            <Typography.Text type="danger">
              {errors?.teamSubtitle?.message}
            </Typography.Text>
          )}

          <div style={{ margin: "24px 0" }} />
          <Controller
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Описание"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            )}
            name="teamDescription"
            control={control}
            defaultValue=""
          />
          {!!errors?.teamDescription && (
            <Typography.Text type="danger">
              {errors?.teamDescription?.message}
            </Typography.Text>
          )}

          <div style={{ margin: "24px 0" }} />
          <Button type="primary" size="large" htmlType="submit">
            Создать команду
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default CreateTeamModal
