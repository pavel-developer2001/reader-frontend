import React, { useEffect, useState } from "react";
import styles from "./Rating.module.scss";
import { Modal, Button } from "antd";
import { StarFilled } from "@ant-design/icons";

const Rating = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ratingCount, setRatingCount] = useState<null | number>(null);
  useEffect(() => {
    console.log("effect rating", ratingCount);
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
      {" "}
      <Button type='default' onClick={showModal} className={styles.star}>
        <StarFilled className={styles.starIcon} /> 8.9 (голосов: 610)
      </Button>
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
