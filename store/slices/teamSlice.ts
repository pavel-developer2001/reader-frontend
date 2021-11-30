import { IChapter } from "./../../models/IChapter";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IManga } from "../../models/IManga";
import { IMember } from "../../models/IMember";
import {
  ITeam,
  ITeamInvitationsForUser,
  ITeamsForManga,
  ITeamsForUser,
} from "../../models/ITeam";
import TeamApi from "../../services/api/teamApi";

export const addNewTeam = createAsyncThunk(
  "team/addNewTeam",
  async (payload: {
    teamName: string;
    teamSubtitle: string;
    teamDescription: string;
    userId: number;
  }) => {
    return await TeamApi.createTeam(payload);
  }
);
export const getTeams = createAsyncThunk("team/getTeams", async () => {
  return await TeamApi.getAllTeam();
});
export const getTeam = createAsyncThunk(
  "team/getTeam",
  async (id: string | string[] | undefined) => {
    return await TeamApi.getTeam(id);
  }
);
export const getTeamsForUser = createAsyncThunk(
  "team/getTeamsForUser",
  async (id: string | string[] | undefined) => {
    return await TeamApi.getAllTeamsForUser(id);
  }
);
export const connectMangaForTeam = createAsyncThunk(
  "team/connectMangaForTeam",
  async (payload: {
    mangaId: string | string[] | undefined;
    teamId: string | undefined;
  }) => {
    return await TeamApi.addTeamForManga(payload);
  }
);
export const getTeamsForManga = createAsyncThunk(
  "team/getTeamsForManga",
  async (id: string | string[] | undefined) => {
    return await TeamApi.getAllTeamsForManga(id);
  }
);
export const addInvitation = createAsyncThunk(
  "team/addInvitation",
  async (payload: { rank: string; teamId: number; userId: number }) => {
    return await TeamApi.addInvitationForUser(payload);
  }
);
export const getInvitationsForUser = createAsyncThunk(
  "team/getInvitationsForUser",
  async (id: string | string[] | undefined) => {
    return await TeamApi.getAllInvitationsForUser(id);
  }
);
export const agreeToJoin = createAsyncThunk(
  "team/agreeToJoin",
  async (payload: {
    invitationId: number;
    rank: string;
    teamId: number;
    userId: number;
  }) => {
    return await TeamApi.agreeToJoinToTeam(payload);
  }
);
export const refucalToJoin = createAsyncThunk(
  "team/refucalToJoin",
  async (id: number) => {
    return await TeamApi.refucalToJoinTeam(id);
  }
);
export const removeMember = createAsyncThunk(
  "team/removeMember",
  async (id: string) => {
    return await TeamApi.deleteMemberFromTeam(id);
  }
);
interface TeamItems {
  team: ITeam[];
  members: IMember[];
  mangas: IManga[];
  chapters: IChapter[];
}
interface TeamState {
  teams: ITeam[];
  team: TeamItems;
  teamsUser: ITeamsForUser[];
  teamsManga: ITeamsForManga[];
  teamInvitations: ITeamInvitationsForUser[];
  status: null;
  loading: boolean;
}
const initialState: TeamState = {
  teams: [],
  team: { team: [], members: [], mangas: [], chapters: [] },
  teamsUser: [],
  teamsManga: [],
  teamInvitations: [],
  status: null,
  loading: true,
};
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeams(state, action) {
      state.teams = action.payload;
      state.loading = false;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action: any) => {
        state.teams = action.payload.team.teams;
        state.team = action.payload.team.team;
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
        state.team.members.push(action.payload.data.newMember);
        state.teamInvitations = state.teamInvitations.filter(
          (item) => item.id != action.payload.data.deleteInvitation.id
        );
      })
      .addCase(refucalToJoin.fulfilled, (state, action) => {
        state.teamInvitations = state.teamInvitations.filter(
          (item) => item.id != action.payload.data.id
        );
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.team.members = state.team.members.filter(
          (item) => item.id != action.payload.data.id
        );
      }),
});

export default teamSlice.reducer;
export const { setTeams } = teamSlice.actions;
