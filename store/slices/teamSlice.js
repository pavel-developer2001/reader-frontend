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
export const getTeamsForUser = createAsyncThunk(
  "team/getTeamsForUser",
  async (id) => {
    return await TeamApi.getAllTeamsForUser(id);
  }
);
export const connectMangaForTeam = createAsyncThunk(
  "team/connectMangaForTeam",
  async (payload) => {
    return await TeamApi.addTeamForManga(payload);
  }
);
export const getTeamsForManga = createAsyncThunk(
  "team/getTeamsForManga",
  async (id) => {
    return await TeamApi.getAllTeamsForManga(id);
  }
);
export const addInvitation = createAsyncThunk(
  "team/addInvitation",
  async (payload) => {
    return await TeamApi.addInvitationForUser(payload);
  }
);
export const getInvitationsForUser = createAsyncThunk(
  "team/getInvitationsForUser",
  async (id) => {
    return await TeamApi.getAllInvitationsForUser(id);
  }
);
export const agreeToJoin = createAsyncThunk(
  "team/agreeToJoin",
  async (payload) => {
    return await TeamApi.agreeToJoinToTeam(payload);
  }
);
export const refucalToJoin = createAsyncThunk(
  "team/refucalToJoin",
  async (id) => {
    return await TeamApi.refucalToJoinTeam(id);
  }
);
const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    team: { team: [], members: [], mangas: [] },
    teamsUser: [],
    teamsManga: [],
    teamInvitations: [],
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
      .addCase(getTeamsForUser.fulfilled, (state, action) => {
        state.teamsUser = action.payload.data;
        state.loading = false;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.team = action.payload.data;
        state.loading = false;
      })
      .addCase(getTeamsForManga.fulfilled, (state, action) => {
        state.teamsManga = action.payload.data;
        state.loading = false;
      })
      .addCase(getInvitationsForUser.fulfilled, (state, action) => {
        state.teamInvitations = action.payload.data;
        state.loading = false;
      })
      .addCase(connectMangaForTeam.fulfilled, (state, action) => {
        state.team.mangas.push(action.payload.data);
      })
      .addCase(addInvitation.fulfilled, (state, action) => {
        state.teamInvitations.push(action.payload.data);
      })
      .addCase(agreeToJoin.fulfilled, (state, action) => {
        console.log("agree SLICE data - ", action.payload.data);
        state.teamInvitations.filter(
          (item) => item.id != action.payload.data.deleteInvitation.id
        );
        state.team.team.members.push(action.payload.data.newMember);
      })
      .addCase(refucalToJoin.fulfilled, (state, action) => {
        console.log("refusal SLICE data - ", action.payload.data);
        state.teamInvitations.filter(
          (item) => item.id != action.payload.data.id
        );
      }),
});

export default teamSlice.reducer;
export const { setTeams } = teamSlice.actions;
