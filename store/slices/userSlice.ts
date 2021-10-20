import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IUser } from "../../models/IUser";
import UserApi from "../../services/api/userApi";

export const registerUsers = createAsyncThunk(
  "user/registerUsers",
  async (payload: { name: string; email: string; password: string }) => {
    return await UserApi.registration(payload);
  }
);
export const loginUsers = createAsyncThunk(
  "user/loginUsers",
  async (payload: { email: string; password: string }) => {
    return await UserApi.login(payload);
  }
);
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (id: string | string[] | undefined) => {
    return await UserApi.getUser(id);
  }
);
interface UserState {
  user: IUser[];
  token: string;
  status: null | string;
  loading: boolean;
}
const initialState: UserState = {
  user: [],
  token: "",
  status: null,
  loading: true,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.user.push(action.payload.data.user);
        window.localStorage.setItem("token", action.payload.data.token);
        state.loading = false;
        state.token = action.payload.data.token;
      })
      .addCase(registerUsers.fulfilled, (state, action) => {
        state.user.push(action.payload.data.user);
        window.localStorage.setItem("token", action.payload.data.token);
        state.loading = false;
        state.token = action.payload.data.token;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      }),
  // .addCase(HYDRATE, (state, action) => {
  //   state.posts = action.payload.user.posts;
  // }),
});

export default userSlice.reducer;
export const { setToken } = userSlice.actions;