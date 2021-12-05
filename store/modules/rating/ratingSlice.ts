import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IRating } from "../../../models/IRating";
import RatingApi from "../../../services/api/ratingApi";

export const addRating = createAsyncThunk(
  "rating/addRating",
  async (payload: {
    rating: number | null;
    mangaId: string | string[] | undefined;
    userId: number;
  }) => {
    return await RatingApi.addRatingForManga(payload);
  }
);
export const updateRating = createAsyncThunk(
  "rating/updateRating",
  async (payload: {
    rating: number | null;
    mangaId: string | string[] | undefined;
    userId: number;
  }) => {
    return await RatingApi.updateRatingForManga(payload);
  }
);
export const getRating = createAsyncThunk(
  "rating/getRating",
  async (dataManga: { id: string | string[] | undefined; userId: number }) => {
    return await RatingApi.getRatingForManga(dataManga.id, dataManga.userId);
  }
);
interface RatingState {
  rating: IRating[];
  ratings: IRating[];
  status: null;
  loading: boolean;
}
const initialState: RatingState = {
  rating: [],
  ratings: [],
  status: null,
  loading: true,
};
const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action: any) => {
        state.ratings = action.payload.rating.ratings;
        state.loading = false;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.rating = action.payload.data;
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        state.rating = action.payload.data;
      })
      .addCase(getRating.fulfilled, (state, action) => {
        state.rating = action.payload.data;
        state.loading = false;
      }),
});

export default ratingSlice.reducer;
export const {} = ratingSlice.actions;
