import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./AddMangaForTeam.module.scss";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  connectMangaForTeam,
  getTeamsForUser,
} from "../../../../../../store/slices/teamSlice";
import { dataUser } from "../../../../../../utils/getDataUserFromToken";
import { useRouter } from "next/dist/client/router";

const { Option } = Select;

const AddMangaForTeam = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamId, setTeamId] = useState<string | undefined>("");
  const dispatch = useDispatch();
  const teams = useSelector<any>((state) => state.team.teamsUser);
  const loading = useSelector<any>((state) => state.team.loading);
  useEffect(() => {
    dispatch(getTeamsForUser(dataUser.id));
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
  const handleAddMangaForTeam = async (e: any) => {
    e.preventDefault();
    try {
      const payload = await { mangaId: router.query.id, teamId };
      await dispatch(connectMangaForTeam(payload));
      setTeamId("");
      setIsModalVisible(false);
    } catch (error) {}
  };
  return !loading ? (
    <div>
      <Button type='primary' onClick={showModal}>
        Добавить эту мангу для команды
      </Button>
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
          onChange={(value) => setTeamId(value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {teams
            .filter((item: any) => item.roleInTeam == "Глава")
            .map((team: any) => (
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
