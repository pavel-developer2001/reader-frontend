import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import TeamApi from "../../../shared/api/reader/apis/teamApi"
import { ITeam } from "../../../shared/api/reader/models"
import { TeamState } from "./team.types"

export const addNewTeam = createAsyncThunk(
  "team/addNewTeam",
  async (payload: FormData) => await TeamApi.createTeam(payload)
)
export const getTeams = createAsyncThunk(
  "team/getTeams",
  async () => await TeamApi.getAllTeam()
)
export const getTeam = createAsyncThunk(
  "team/getTeam",
  async (id: string | string[] | undefined) => await TeamApi.getTeam(id)
)
export const getTeamsForUser = createAsyncThunk(
  "team/getTeamsForUser",
  async (id: number | null) => await TeamApi.getAllTeamsForUser(id)
)
export const getTeamsForInvitations = createAsyncThunk(
  "team/getTeamsForInvitations",
  async (id: number | null) => await TeamApi.getAllTeamsForUser(id)
)
export const connectMangaForTeam = createAsyncThunk(
  "team/connectMangaForTeam",
  async (payload: {
    mangaId: string | string[] | undefined
    teamId: string | undefined
  }) => await TeamApi.addTeamForManga(payload)
)
export const getTeamsForManga = createAsyncThunk(
  "team/getTeamsForManga",
  async (id: string | string[] | undefined) =>
    await TeamApi.getAllTeamsForManga(id)
)
export const addInvitation = createAsyncThunk(
  "team/addInvitation",
  async (payload: {
    rank: string
    teamId: string
    userId: string | string[] | undefined
  }) => await TeamApi.addInvitationForUser(payload)
)
export const getInvitationsForUser = createAsyncThunk(
  "team/getInvitationsForUser",
  async (id: string | string[] | undefined) =>
    await TeamApi.getAllInvitationsForUser(id)
)
export const agreeToJoin = createAsyncThunk(
  "team/agreeToJoin",
  async (payload: {
    invitationId: number
    rank: string
    teamId: number
    userId: string | string[] | undefined
  }) => await TeamApi.agreeToJoinToTeam(payload)
)
export const refucalToJoin = createAsyncThunk(
  "team/refucalToJoin",
  async (id: number) => await TeamApi.refucalToJoinTeam(id)
)
export const removeMember = createAsyncThunk(
  "team/removeMember",
  async (id: number) => await TeamApi.deleteMemberFromTeam(id)
)

const initialState: TeamState = {
  teams: [],
  team: {
    team: {} as ITeam,
    members: [],
    mangas: [],
    chapters: [],
  },
  teamsUser: [],
  teamsManga: [],
  teamInvitations: [],
  status: null,
  loading: true,
  teamsForInvitations: [],
  isLoadingForTeamInvitations: true,
}
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action: any) => {
        state.teams = action.payload.team.teams
        state.team = action.payload.team.team
        state.loading = false
      })
      .addCase(addNewTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload.data)
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.teams = action.payload.data
        state.loading = false
      })
      .addCase(getTeamsForUser.fulfilled, (state, action) => {
        state.teamsUser = action.payload.data
        state.loading = false
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.team = action.payload.data
        state.loading = false
      })
      .addCase(getTeamsForManga.fulfilled, (state, action) => {
        state.teamsManga = action.payload.data
        state.loading = false
      })
      .addCase(getInvitationsForUser.fulfilled, (state, action) => {
        state.teamInvitations = action.payload.data
        state.loading = false
      })
      .addCase(connectMangaForTeam.fulfilled, (state, action) => {
        state.team.mangas = action.payload.data
      })
      .addCase(addInvitation.fulfilled, (state, action) => {
        state.teamInvitations.push(action.payload.data)
      })
      .addCase(agreeToJoin.fulfilled, (state, action) => {
        state.team.members.push(action.payload.data.newMember)
        state.teamInvitations = state.teamInvitations.filter(
          (item) => item.id != action.payload.data.deleteInvitation.id
        )
      })
      .addCase(refucalToJoin.fulfilled, (state, action) => {
        state.teamInvitations = state.teamInvitations.filter(
          (item) => item.id != action.payload.data.id
        )
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.team.members = state.team.members.filter(
          (item) => item.id != action.payload.data.id
        )
      })
      .addCase(getTeamsForInvitations.fulfilled, (state, action) => {
        state.teamsForInvitations = action.payload.data
        state.isLoadingForTeamInvitations = false
      }),
})

export default teamSlice.reducer
