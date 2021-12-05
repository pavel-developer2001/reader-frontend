import React, { useEffect, useState } from "react";
import styles from "./InvitationBtn.module.scss";
import { Modal, Button, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addInvitation,
  getTeamsForUser,
} from "../../../../../../store/modules/team/teamSlice";
import { dataUser } from "../../../../../../utils/getDataUserFromToken";
import { RootState } from "../../../../../../store/reducer";
import { ITeamsForUser } from "../../../../../../models/ITeam";
const { Option } = Select;

const InvitationBtn = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamId, setTeamId] = useState<string | undefined>("");
  const [rank, setRank] = useState("");
  const rankArray = [
    { role: "Переводчик" },
    { role: "Модератор" },
    { role: "Клинер" },
    { role: "Тайпер" },
    { role: "Редактор" },
  ];
  const dispatch = useDispatch();
  const teams = useSelector<RootState, ITeamsForUser[]>(
    (state) => state.team.teamsUser
  );
  const loading = useSelector<RootState>((state) => state.team.loading);
  useEffect(() => {
    if (dataUser) {
      dispatch(getTeamsForUser(dataUser.id));
    }
  }, []);
  const handleAddInvitation = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const payload: { rank: string; teamId: number; userId: number } = await {
        rank,
        teamId,
        userId: dataUser.id,
      };
      dispatch(addInvitation(payload));
      message.success("Приглашение было создано");
      setIsModalVisible(false);
      setRank("");
      setTeamId("");
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val: string) {
    console.log("search:", val);
  }

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
      {" "}
      <Button type='primary' onClick={showModal}>
        Пригласить в команду
      </Button>
      <Modal
        title='Приглашение в команду'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>Команда:</div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder='Выбрать команду'
          optionFilterProp='children'
          onChange={(value: string) => setTeamId(value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
        <div>В качестве: </div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder='Должность'
          optionFilterProp='children'
          onChange={(value: string) => setRank(value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {rankArray.map((rank, index) => (
            <Option key={index} value={rank.role}>
              {rank.role}
            </Option>
          ))}
        </Select>
        <div>
          <Button type='primary' onClick={handleAddInvitation}>
            Приглаcить
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default InvitationBtn;
