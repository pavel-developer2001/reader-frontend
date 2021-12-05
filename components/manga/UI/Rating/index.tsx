import React, { useEffect, useState } from "react";
import styles from "./Rating.module.scss";
import { Modal, Button, message } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { dataUser } from "../../../../utils/getDataUserFromToken";
import {
  addRating,
  getRating,
  updateRating,
} from "../../../../store/modules/rating/ratingSlice";
import { RootState } from "../../../../store/reducer";
import { IRating } from "../../../../models/IRating";

const Rating = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ratingCount, setRatingCount] = useState<null | number>(null);
  const rating = useSelector<RootState, IRating[]>(
    (state) => state.rating.rating
  );
  const loading = useSelector<RootState>((state) => state.rating.loading);
  const dataManga: { id: string | string[] | undefined; userId: number } = {
    id: router.query.id,
    userId: dataUser.id,
  };
  useEffect(() => {
    dispatch(getRating(dataManga));
  }, [router]);
  const payload: {
    rating: number | null;
    mangaId: string | string[] | undefined;
    userId: number;
  } = {
    rating: ratingCount,
    mangaId: router.query.id,
    userId: dataUser.id,
  };
  useEffect(() => {
    if (ratingCount !== null) {
      setIsModalVisible(false);
      dispatch(addRating(payload));
      message.success("Ваша оценка для манги была добавлена");
    }
    if (ratingCount !== null && rating) {
      dispatch(updateRating(payload));
      message.success("Ваша оценка была успешна обновлена");
    }
  }, [ratingCount]);
  const ratingArray = [
    { count: 5, text: "ЭТО ШЕДЕВР!" },
    { count: 4, text: "Отлично" },
    { count: 3, text: "Нормас" },
    { count: 2, text: "Убожество" },
    { count: 1, text: "Не стоит потраченного времени" },
  ];
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
      {loading ? (
        <p>loading </p>
      ) : (
        <div onClick={showModal} className={styles.star}>
          <StarFilled className={styles.starIcon} />
          {rating == null ? "Оценить тайтл" : rating.rating} (голосов: 610)
        </div>
      )}

      <Modal
        title='Поставить оценку'
        className={styles.modal}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {ratingArray.map((rating) => (
          <div key={rating.count} className={styles.changeRating}>
            <p
              className={styles.text}
              onClick={() => setRatingCount(rating.count)}
            >
              {rating.count} <StarFilled className={styles.starIcon} />{" "}
              {rating.text}
            </p>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default Rating;
