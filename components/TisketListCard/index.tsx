import { Card } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./TisketListCard.module.css";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { addCounter, getPosts } from "../../store/slices/userSlice";

import { wrapper } from "../../store";
import { GetServerSideProps } from "next";

const TisketListCard = () => {
  const { posts } = useSelector<any>((state) => state.user);
  const { counter } = useSelector<any>((state) => state.user);
  const state = useSelector<any>((state) => state);
  console.log(state);
  const dispatch = useDispatch();
  const add = () => {
    dispatch(addCounter());
  };
  console.log(posts);
  console.log(counter);
  // React.useEffect(() => {
  //   dispatch(getPosts());
  // }, []);
  return (
    <>
      <div className={styles.block}>
        <img
          className={styles.img}
          src='https://api.remanga.org//media/titles/tales_of_demons_and_gods/high_cover.jpg'
          alt='img card'
        />
        <button onClick={add}>+</button>
        <p>{counter}</p>
        <Link href='/manga/1'>
          <a>
            {" "}
            <Card
              title='Peak martian'
              className={styles.card}
              extra='2020'
              bordered={false}
              style={{ width: 310, margin: 10 }}
            ></Card>
          </a>
        </Link>
      </div>
      <div>
        {posts.map((post: any) => (
          <p>{post.title}</p>
        ))}
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps =
  //@ts-ignore
  wrapper.getServerSideProps(async (ctx) => {
    try {
      ctx.store.dispatch(getPosts());
      return {
        props: {},
      };
    } catch (error) {
      console.log("ERROR!");
      return {
        props: {
          rooms: [],
        },
      };
    }
  });

export default TisketListCard;
