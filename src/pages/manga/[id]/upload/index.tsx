import TextArea from "antd/lib/input/TextArea"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import { Upload, Modal, Button, Select, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { GetServerSideProps } from "next"
import * as yup from "yup"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SelectValue } from "antd/lib/select"
import { UploadFile } from "antd/lib/upload/interface"
import styles from "../../../../app/styles/pages/Upload.module.scss"
import {
  selectTeamLoading,
  selectTeamsUserData,
} from "../../../../entities/team/model/team.selector"
import { getTeamsForUser } from "../../../../entities/team/model/team.slice"
import { dataUser } from "../../../../shared/lib/utils/getDataUserFromToken"
import MainLayout from "../../../../shared/ui/layouts/MainLayout"
import { wrapper } from "../../../../app/store"
import { addNewChapter } from "../../../../entities/chapter/model/chapter.slice"

const { Option } = Select

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const AddNewChapterFormSchema = yup.object().shape({
  numberChapter: yup
    .number()
    .typeError("Введите номер главы")
    .required("Введите номер главы"),
  volumeChapter: yup.number().typeError("Введите том").required("Введите том"),
  titleChapter: yup.string().required("Введите загаловок главы"),
  language: yup.string().required("Выберите язык перевода"),
})
type FormValues = {
  numberChapter: any
  volumeChapter: any
  titleChapter: string
  language: string
}

const AddNewChapter = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(AddNewChapterFormSchema),
  })
  const router = useRouter()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | undefined>("")
  const [previewTitle, setPreviewTitle] = useState<string | undefined>("")
  const [imagesList, setImagesList] = useState<UploadFile<any>[]>([])
  const mangaId = router.query.id
  const uploadButton = (
    <div>
      <div className={styles.plus}>+</div>
    </div>
  )
  const handleCancel = () => {
    setPreviewVisible(false)
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      ;(file.preview as unknown) = await getBase64(file.originFileObj as Blob)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(
      file.name || file.url?.substring(file.url.lastIndexOf("/") + 1)
    )
  }
  const handleChange = ({ fileList }: { fileList: UploadFile<any>[] }) =>
    setImagesList(fileList)
  const [teamId, setTeamId] = useState<SelectValue>("")
  const teams = useSelector(selectTeamsUserData)
  const loading = useSelector(selectTeamLoading)
  useEffect(() => {
    dispatch(getTeamsForUser(dataUser))
  }, [])
  /// /////////////////////////////////////////////////////////////////

  const languageArray = [
    { lang: "Русский" },
    { lang: "Английский" },
    { lang: "Укрианский" },
    { lang: "Японский" },
    { lang: "Корейский" },
    { lang: "Китайский" },
    { lang: "Испанский" },
    { lang: "Француский" },
    { lang: "Португальский" },
    { lang: "Другой" },
  ]
  const dispatch = useDispatch()
  const handleNewChapter: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = new FormData()
      formData.append("numberChapter", data.numberChapter)
      formData.append("volumeChapter", data.volumeChapter)
      formData.append("titleChapter", data.titleChapter)
      formData.append("language", data.language)
      formData.append("mangaId", mangaId as string)
      formData.append("teamId", teamId as string | Blob)
      for (let i = 0; i < imagesList.length; i++) {
        formData.append(
          "imagesList[]",
          imagesList[i].originFileObj as string | Blob
        )
      }

      dispatch(addNewChapter(formData))
      message.success("Глава была успешно добавлена")
      router.push(`/manga/${mangaId}`)
      reset()
      setTeamId("")
      setImagesList([])
    } catch (error: any) {
      message.error("Произошла ошибка", error)
    }
  }
  return (
    <MainLayout>
      <form onSubmit={handleSubmit(handleNewChapter)}>
        <div className={styles.main}>
          <div
            className={styles.userData}
            onClick={() => router.push(`/manga/${mangaId}`)}
          >
            Начало после конца
          </div>
          <div className={styles.top}>
            <div className={styles.select}>
              <span className={styles.text}>Топ манги</span>
              <Controller
                render={({ field }) => (
                  <TextArea {...field} placeholder="Том" autoSize />
                )}
                name="volumeChapter"
                control={control}
                defaultValue=""
              />
              {!!errors?.volumeChapter && (
                <p className="error-field">{errors?.volumeChapter?.message}</p>
              )}
            </div>
            <div className={styles.select}>
              <span className={styles.text}>Глава манги</span>
              <Controller
                render={({ field }) => (
                  <TextArea {...field} placeholder="Глава" autoSize />
                )}
                name="numberChapter"
                control={control}
                defaultValue=""
              />
              {!!errors?.numberChapter && (
                <p className="error-field">{errors?.numberChapter?.message}</p>
              )}
            </div>
            <div className={styles.select}>
              <span className={styles.text}>Выбрать язык</span>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Язык"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {languageArray.map((arr, index) => (
                      <Option key={index} value={arr.lang}>
                        {arr.lang}
                      </Option>
                    ))}
                  </Select>
                )}
                name="language"
                control={control}
                defaultValue=""
              />
              {!!errors?.language && (
                <p className="error-field">{errors?.language?.message}</p>
              )}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.selectSecondary}>
              <span className={styles.text}>Загаловок главы</span>
              <Controller
                render={({ field }) => (
                  <TextArea {...field} placeholder="Загаловок" autoSize />
                )}
                name="titleChapter"
                control={control}
                defaultValue=""
              />
              {!!errors?.titleChapter && (
                <p className="error-field">{errors?.titleChapter?.message}</p>
              )}
            </div>
            <div className={styles.selectSecondary}>
              {loading ? (
                <p>loading</p>
              ) : (
                <div className={styles.modalSelect}>
                  <span className={styles.text}>
                    Выбрать команду(необязательно)
                  </span>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Выбрать команду"
                    optionFilterProp="children"
                    onChange={(value) => setTeamId(value)}
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {teams
                      .filter((item) => item.roleInTeam == "Глава")
                      .map((team) => (
                        <Option key={team.id} value={team.team.id}>
                          {team.team.teamName}
                        </Option>
                      ))}
                  </Select>
                </div>
              )}
            </div>
          </div>
          <div className={styles.pages}>
            <span className={styles.text}>Страницы главы</span>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={imagesList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
          <div className={styles.btnCreate}>
            <Button type="primary" htmlType="submit">
              Добавить главу
            </Button>
          </div>
        </div>
      </form>
    </MainLayout>
  )
}
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    )
    return {
      props: {},
    }
  })

export default AddNewChapter
