import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import RatingApi from "../../services/api/ratingApi";

export const addRating = createAsyncThunk(
  "rating/addRating",
  async (payload) => {
    return await RatingApi.addRatingForManga(payload);
  }
);
export const updateRating = createAsyncThunk(
  "rating/updateRating",
  async (payload) => {
    return await RatingApi.updateRatingForManga(payload);
  }
);
export const getRating = createAsyncThunk(
  "rating/getRating",
  async (dataManga) => {
    return await RatingApi.getRatingForManga(dataManga.id, dataManga.userId);
  }
);
const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    rating: [],
    ratings: [],
    status: null,
    loading: true,
  },
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => {
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
