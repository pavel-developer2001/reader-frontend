import React, { useEffect, useState } from "react";
import { Modal, message, Spin } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import {
  addRating,
  getRating,
  updateRating,
} from "../../../../store/modules/rating/rating.slice";
import {
  selectRatingItemData,
  selectRatingLoading,
} from "../../../../store/modules/rating/rating.selector";
import styles from "./Rating.module.scss";

const Rating = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ratingCount, setRatingCount] = useState<null | number>(null);
  const rating = useSelector(selectRatingItemData);
  const loading = useSelector(selectRatingLoading);
  const dataManga: { id: string | string[] | undefined } = {
    id: router.query.id,
  };
  useEffect(() => {
    dispatch(getRating(dataManga));
  }, [router]);
  const payload: {
    rating: number | null;
    mangaId: string | string[] | undefined;
  } = {
    rating: ratingCount,
    mangaId: router.query.id,
  };
  useEffect(() => {
    if (ratingCount && !rating) {
      setIsModalVisible(false);
      dispatch(addRating(payload));
      message.success("Ваша оценка для манги была добавлена");
    }
    if (ratingCount && rating) {
      dispatch(updateRating(payload));
      message.success("Ваша оценка была успешна обновлена");
      setIsModalVisible(false);
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
        <Spin />
      ) : (
        <div onClick={showModal} className={styles.star}>
          <StarFilled className={styles.starIcon} />
          {rating == null ? "Оценить тайтл" : rating.rating} (голосов: 610)
        </div>
      )}

      <Modal
        title="Поставить оценку"
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
