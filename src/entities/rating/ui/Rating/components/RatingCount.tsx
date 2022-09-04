import { Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRatingCount,
  selectRatingCountLoading,
} from "../../../model/rating.selector";
import { getRatingCount } from "../../../model/rating.slice";

const RatingCount = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const count = useSelector(selectRatingCount);
  const isLoading = useSelector(selectRatingCountLoading);

  useEffect(() => {
    if (router.query.id) dispatch(getRatingCount(router.query.id));
  }, [router.query.id]);

  if (isLoading) {
    return (
      <>
        <Spin />
      </>
    );
  }

  return <>(голосов: {count})</>;
};

export default RatingCount;
