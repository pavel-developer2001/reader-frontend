import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import RatingApi from "../../../shared/api/reader/apis/ratingApi"
import { IRating } from "../../../shared/api/reader/models"

export const addRating = createAsyncThunk(
  "rating/addRating",
  async (payload: {
    rating: number | null
    mangaId: string | string[] | undefined
  }) => await RatingApi.addRatingForManga(payload)
)
export const updateRating = createAsyncThunk(
  "rating/updateRating",
  async (payload: {
    rating: number | null
    mangaId: string | string[] | undefined
  }) => await RatingApi.updateRatingForManga(payload)
)
export const getRating = createAsyncThunk(
  "rating/getRating",
  async (dataManga: { id: string | string[] | undefined }) =>
    await RatingApi.getRatingForManga(dataManga.id)
)
export const getRatingCount = createAsyncThunk(
  "rating/getRatingCount",
  async (id: string | string[] | undefined) =>
    await RatingApi.getRatingCountForManga(id)
)
interface RatingState {
  rating: IRating
  ratings: IRating[]
  status: null
  loading: boolean
  count: number
  isLoadingForRating: boolean
}
const initialState: RatingState = {
  rating: {} as IRating,
  ratings: [],
  status: null,
  loading: true,
  count: 0,
  isLoadingForRating: true,
}
const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action: any) => {
        state.ratings = action.payload.rating.ratings
        state.loading = false
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.rating = action.payload.data
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        state.rating = action.payload.data
      })
      .addCase(getRating.fulfilled, (state, action) => {
        state.rating = action.payload.data
        state.loading = false
      })
      .addCase(getRatingCount.fulfilled, (state, action) => {
        state.count = action.payload.data
        state.isLoadingForRating = false
      }),
})

export default ratingSlice.reducer
