import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import UserApi from "../../../shared/api/reader/apis/userApi";
import { IUser } from "../../../shared/api/reader/models";

export const registerUsers = createAsyncThunk(
  "user/registerUsers",
  async (
    payload: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      return await UserApi.registration(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loginUsers = createAsyncThunk(
  "user/loginUsers",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      return await UserApi.login(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (id: string | string[] | undefined) => {
    return await UserApi.getUser(id);
  }
);
interface UserState {
  user: IUser;
  token: string;
  status: null | string;
  loading: boolean;
  error: string;
}
const initialState: UserState = {
  user: {} as IUser,
  token: "",
  status: null,
  loading: true,
  error: "",
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
      .addCase(HYDRATE, (state, action: any) => {
        state.user = action.payload.user.user;
        state.loading = false;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.user = action.payload.data;
        window.localStorage.setItem("token", action.payload.data.access_token);
        state.loading = false;
        state.token = action.payload.data.token;
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.error = (action.payload as any).response.data.message;
      })
      .addCase(registerUsers.fulfilled, (state, action) => {
        state.user = action.payload.data;
        window.localStorage.setItem("token", action.payload.data.access_token);
        state.loading = false;
        state.token = action.payload.data.access_token;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.error = (action.payload as any).response.data.message;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      }),
});

export default userSlice.reducer;
export const { setToken } = userSlice.actions;
