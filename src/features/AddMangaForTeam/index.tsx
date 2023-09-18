import { Button, message, Modal, Spin, Tooltip, Select, Typography } from "antd"
import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/dist/client/router"
import { UsergroupAddOutlined } from "@ant-design/icons"
import * as yup from "yup"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  connectMangaForTeam,
  getTeamsForUser,
} from "../../entities/team/model/team.slice"
import { dataUser } from "../../shared/lib/utils/getDataUserFromToken"
import {
  selectTeamLoading,
  selectTeamsUserData,
} from "../../entities/team/model/team.selector"

const { Option } = Select

const AddMangaForTeamFormSchema = yup.object().shape({
  teamId: yup.string().required("Выберите команду"),
})
type FormValues = {
  teamId: string
}

const AddMangaForTeam = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(AddMangaForTeamFormSchema),
  })
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  const teams = useSelector(selectTeamsUserData)
  const loading = useSelector(selectTeamLoading)
  useEffect(() => {
    dispatch(getTeamsForUser(dataUser))
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleAddMangaForTeam: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = await { mangaId: router.query.id, teamId: data.teamId }
      await dispatch(connectMangaForTeam(payload))
      message.success("Манга была в список команды для перевода")
      setIsModalVisible(false)
      reset()
    } catch (error: any) {
      message.error("Произошла ошибка", error)
    }
  }
  return !loading ? (
    <div>
      <Tooltip title="Добавить эту мангу для команды">
        <Button
          onClick={showModal}
          type="primary"
          shape="circle"
          icon={<UsergroupAddOutlined />}
        />
      </Tooltip>
      <Modal
        title="Добавить эту мангу для команды"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit(handleAddMangaForTeam)}>
          <Controller
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                style={{ width: 200 }}
                placeholder="Выбрать команду"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {teams
                  .filter((item) => item.roleInTeam === "Глава")
                  .map((team) => (
                    <Option key={team.id} value={team.team.id}>
                      {team.team.teamName}
                    </Option>
                  ))}
              </Select>
            )}
            name="teamId"
            control={control}
            defaultValue=""
          />
          {!!errors?.teamId && (
            <Typography.Text type="danger">
              {errors?.teamId?.message}
            </Typography.Text>
          )}

          <div>
            <Button htmlType="submit">Добавить мангу</Button>
          </div>
        </form>
      </Modal>
    </div>
  ) : (
    <Spin />
  )
}

export default AddMangaForTeam
