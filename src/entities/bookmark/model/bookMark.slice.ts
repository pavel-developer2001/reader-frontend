/* eslint-disable eqeqeq */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import BookMarksApi from "../../../shared/api/reader/apis/bookMarksApi"
import { IBookMark } from "../../../shared/api/reader/models"

export const addBookMark = createAsyncThunk(
  "bookMark/addBookMark",
  async (payload: { category: string; mangaId: number }) =>
    await BookMarksApi.addBookMarkForUser(payload)
)
export const updateBookMark = createAsyncThunk(
  "bookMark/updateBookMark",
  async (payload: { category: string; mangaId: number }) =>
    await BookMarksApi.updateBookMark(payload)
)
export const getBookMarks = createAsyncThunk(
  "bookMark/getBookMarks",
  async (id: string | string[] | undefined) =>
    await BookMarksApi.getAllBookMarksForUser(id)
)
export const getBookMarkToManga = createAsyncThunk(
  "bookMark/getBookMarkToManga",
  async (dataManga: { mangaId: string | string[] | undefined }) =>
    await BookMarksApi.getBookMarkForManga(dataManga.mangaId)
)
export const getBookMarkCountToManga = createAsyncThunk(
  "bookMark/getBookMarkCountToManga",
  async (id: string | string[] | undefined) =>
    await BookMarksApi.getBookMarkCountForManga(id)
)

interface BookMarkState {
  bookMarks: IBookMark[]
  bookMark: IBookMark
  loading: boolean
  count: number
  isLoadingForCount: boolean
}
const initialState: BookMarkState = {
  bookMarks: [],
  bookMark: {} as IBookMark,
  count: 0,
  isLoadingForCount: true,
  loading: true,
}
const bookMarkSlice = createSlice({
  name: "bookMark",
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    // @ts-ignore
    builder
      .addCase(HYDRATE, (state, action: any) => {
        state.bookMarks = action.payload.bookMark.bookMarks
        state.loading = false
      })
      // eslint-disable-next-line consistent-return
      .addCase(addBookMark.fulfilled, (state, action) => {
        if (action.payload.data.category == "Удалить из закладок") {
          // eslint-disable-next-line no-return-assign
          return (state.bookMarks = state.bookMarks.filter(
            (item) => item.id !== action.payload.data.id
          ))
        }
        state.bookMarks.push(action.payload.data)
      })
      .addCase(updateBookMark.fulfilled, (state, action) => {
        state.bookMarks = state.bookMarks.filter(
          (item) => item.id != action.payload.data.id
        )
        state.bookMarks.push(action.payload.data)
      })
      .addCase(getBookMarks.fulfilled, (state, action) => {
        state.bookMarks = action.payload.data
        state.loading = false
      })
      .addCase(getBookMarkToManga.fulfilled, (state, action) => {
        state.bookMark = action.payload.data
        state.loading = false
      })
      .addCase(getBookMarkCountToManga.fulfilled, (state, action) => {
        state.count = action.payload.data
        state.isLoadingForCount = false
      }),
})

export default bookMarkSlice.reducer
