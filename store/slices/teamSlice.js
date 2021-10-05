import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import TeamApi from "../../services/api/teamApi";

export const addNewTeam = createAsyncThunk(
  "team/addNewTeam",
  async (payload) => {
    return await TeamApi.createTeam(payload);
  }
);
export const getTeams = createAsyncThunk("team/getTeams", async () => {
  return await TeamApi.getAllTeam();
});
export const getTeam = createAsyncThunk("team/getTeam", async (id) => {
  return await TeamApi.getTeam(id);
});

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    team: [],
    status: null,
    loading: true,
  },
  reducers: {
    setTeams(state, action) {
      state.teams = action.payload;
      state.loading = false;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action) => {
        state.teams = action.payload.team.teams;
        state.loading = false;
      })
      .addCase(addNewTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload.data);
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.teams = action.payload.data;
        state.loading = false;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.team = action.payload.data;
        state.loading = false;
      }),
});

export default teamSlice.reducer;
export const { setTeams } = teamSlice.actions;
