import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import MangaApi from "../../../shared/api/reader/apis/mangaApi"
import { IGenre, IManga, ITag } from "../../../shared/api/reader/models"

export const addNewManga = createAsyncThunk(
  "manga/addNewManga",
  async (payload: FormData) => await MangaApi.createManga(payload)
)
export const getMangas = createAsyncThunk(
  "manga/getMangas",
  async () => await MangaApi.getAllManga()
)
export const getManga = createAsyncThunk(
  "manga/getManga",
  async (id: string | string[] | undefined, thunkAPI) => {
    try {
      return await MangaApi.getManga(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const searchManga = createAsyncThunk(
  "manga/searchManga",
  async (query: { title: string }) => await MangaApi.searchManga(query)
)
interface MangaItems {
  manga: IManga[]
  genre: IGenre[]
  tag: ITag[]
}
interface MangaState {
  mangas: IManga[]
  manga: MangaItems
  searchMangas: IManga[]
  isSearchLoading: boolean
  status: null | string
  loading: boolean
  error: string
}
const initialState: MangaState = {
  mangas: [],
  manga: { manga: [], genre: [], tag: [] },
  searchMangas: [],
  isSearchLoading: true,
  status: null,
  loading: true,
  error: "",
}
const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action: any) => {
        state.mangas = action.payload.manga.mangas
        state.manga = action.payload.manga.manga
        state.loading = false
      })
      .addCase(addNewManga.fulfilled, (state, action: any) => {
        state.mangas.push(action.payload)
      })
      .addCase(getMangas.fulfilled, (state, action) => {
        state.mangas = action.payload.data
        state.loading = false
      })
      .addCase(getManga.fulfilled, (state, action) => {
        state.manga = action.payload.data
        state.loading = false
      })
      .addCase(getManga.rejected, (state, action) => {
        state.error = (action.payload as any).message
        state.loading = false
      })
      .addCase(searchManga.fulfilled, (state, action) => {
        state.searchMangas = action.payload.data
        state.isSearchLoading = false
      }),
})

export default mangaSlice.reducer
