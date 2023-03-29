import { useEffect, useState } from "react"
import { Modal, Button, Select, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/dist/client/router"
import * as yup from "yup"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  addInvitation,
  getTeamsForInvitations,
} from "../../../../model/team.slice"
import { dataUser } from "../../../../../../shared/lib/utils/getDataUserFromToken"
import { selectTeamsForInvitationsData } from "../../../../model/team.selector"

const { Option } = Select

const InvitationBtnFormSchema = yup.object().shape({
  teamId: yup.string().required("Выберите команду"),
  rank: yup.string().required("Выберите Должность"),
})
type FormValues = {
  rank: string
  teamId: string
  userId: string
}

const InvitationBtn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(InvitationBtnFormSchema),
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const router = useRouter()
  const rankArray = [
    { role: "Переводчик" },
    { role: "Модератор" },
    { role: "Клинер" },
    { role: "Тайпер" },
    { role: "Редактор" },
  ]
  const dispatch = useDispatch()
  const teams = useSelector(selectTeamsForInvitationsData)
  useEffect(() => {
    if (dataUser) dispatch(getTeamsForInvitations(dataUser))
  }, [])
  const handleAddInvitation: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = await {
        rank: data.rank,
        teamId: data.teamId,
        userId: router.query.id,
      }
      dispatch(addInvitation(payload))
      message.success("Приглашение было создано")
      setIsModalVisible(false)
      reset()
    } catch (error: any) {
      message.error("Произошла ошибка", error)
    }
  }
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Пригласить в команду
      </Button>
      <Modal
        title="Приглашение в команду"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit(handleAddInvitation)}>
          <div>Команда:</div>
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
            <p className="error-field">{errors?.teamId?.message}</p>
          )}

          <div>В качестве: </div>
          <Controller
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                style={{ width: 200 }}
                placeholder="Должность"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {rankArray.map((rank) => (
                  <Option key={rank.role} value={rank.role}>
                    {rank.role}
                  </Option>
                ))}
              </Select>
            )}
            name="rank"
            control={control}
            defaultValue=""
          />
          {!!errors?.rank && (
            <p className="error-field">{errors?.rank?.message}</p>
          )}

          <div>
            <Button type="primary" htmlType="submit">
              Приглаcить
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default InvitationBtn
