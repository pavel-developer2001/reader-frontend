import React, { useEffect, useState } from "react";
import { Modal, Button, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import {
  addInvitation,
  getTeamsForUser,
} from "../../../../../../store/modules/team/team.slice";
import { dataUser } from "../../../../../../utils/getDataUserFromToken";
import {
  selectTeamLoading,
  selectTeamsUserData,
} from "../../../../../../store/modules/team/team.selector";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const { Option } = Select;

const InvitationBtnFormSchema = yup.object().shape({
  teamId: yup.string().required("Выберите команду"),
  rank: yup.string().required("Выберите Должность"),
});

const InvitationBtn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(InvitationBtnFormSchema),
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const rankArray = [
    { role: "Переводчик" },
    { role: "Модератор" },
    { role: "Клинер" },
    { role: "Тайпер" },
    { role: "Редактор" },
  ];
  const dispatch = useDispatch();
  const teams = useSelector(selectTeamsUserData);
  const loading = useSelector(selectTeamLoading);
  useEffect(() => {
    if (dataUser) {
      dispatch(getTeamsForUser(dataUser));
    }
  }, []);
  const handleAddInvitation = async (data: any) => {
    try {
      const payload: {
        rank: string;
        teamId: number;
        userId: any;
      } = await {
        rank: data.rank,
        teamId: data.teamId,
        userId: router.query.id,
      };
      dispatch(addInvitation(payload));
      message.success("Приглашение было создано");
      setIsModalVisible(false);
      reset();
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {rankArray.map((rank, index) => (
                  <Option key={index} value={rank.role}>
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
  );
};

export default InvitationBtn;
