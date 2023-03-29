import ReaderApi from "../base"

export default class TeamApi {
  static async createTeam(payload: FormData) {
    return ReaderApi.post("/teams/add", payload)
  }

  static async getAllTeam() {
    return ReaderApi.get("/teams/")
  }

  static async getTeam(id: string | string[] | undefined) {
    return ReaderApi.get(`/teams/${id}`)
  }

  static async getAllTeamsForUser(userId: number | null) {
    return ReaderApi.get(`/teams/user/${userId}`)
  }

  static async addTeamForManga(payload: {
    mangaId: string | string[] | undefined
    teamId: string | undefined
  }) {
    return ReaderApi.post("/teams/manga/add", payload)
  }

  static async getAllTeamsForManga(id: string | string[] | undefined) {
    return ReaderApi.get(`/teams/manga/${id}`)
  }

  static async addInvitationForUser(payload: {
    rank: string
    teamId: string
    userId: string | string[] | undefined
  }) {
    return ReaderApi.post("/teams/invitation/add", payload)
  }

  static async getAllInvitationsForUser(id: string | string[] | undefined) {
    return ReaderApi.get(`/teams/invitation/user/${id}`)
  }

  static async agreeToJoinToTeam(payload: {
    invitationId: number
    rank: string
    teamId: number
    userId: string | string[] | undefined
  }) {
    return ReaderApi.post("/teams/invitation/user/join", payload)
  }

  static async refucalToJoinTeam(id: number) {
    return ReaderApi.delete(`/teams/invitation/user/refusal/${id}`)
  }

  static async deleteMemberFromTeam(id: number) {
    return ReaderApi.delete(`/teams/member/${id}`)
  }
}
