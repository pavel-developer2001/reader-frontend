import { Button, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./AddMangaForTeam.module.scss";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  connectMangaForTeam,
  getTeamsForUser,
} from "../../../../../../store/modules/team/team.slice";
import { dataUser } from "../../../../../../utils/getDataUserFromToken";
import { useRouter } from "next/dist/client/router";
import {
  selectTeamLoading,
  selectTeamsUserData,
} from "../../../../../../store/modules/team/team.selector";
import { UsergroupAddOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddMangaForTeam = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamId, setTeamId] = useState<string | undefined>("");
  const dispatch = useDispatch();
  const teams = useSelector(selectTeamsUserData);
  const loading = useSelector(selectTeamLoading);
  useEffect(() => {
    dispatch(getTeamsForUser(dataUser));
  }, []);
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
  const handleAddMangaForTeam = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const payload = await { mangaId: router.query.id, teamId };
      await dispatch(connectMangaForTeam(payload));
      message.success("Манга была в список команды для перевода");
      setTeamId("");
      setIsModalVisible(false);
    } catch (error: any) {
      message.error("Произошла ошибка", error);
    }
  };
  return !loading ? (
    <div>
      <Tooltip title='Добавить эту мангу для команды'>
        <Button
          onClick={showModal}
          type='primary'
          shape='circle'
          icon={<UsergroupAddOutlined />}
        />
      </Tooltip>
      <Modal
        title='Добавить эту мангу для команды'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
        <div>
          <Button onClick={handleAddMangaForTeam}>Добавить мангу</Button>
        </div>
      </Modal>
    </div>
  ) : (
    <p>loading</p>
  );
};

export default AddMangaForTeam;
