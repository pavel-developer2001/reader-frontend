import ReaderApi from "../ReaderApi";

export default class TeamApi {
  static async createTeam(payload: any) {
    return ReaderApi.post("/teams/add", payload);
  }
  static async getAllTeam() {
    return ReaderApi.get("/teams/");
  }
  static async getTeam(id: any) {
    return ReaderApi.get("/teams/" + id);
  }
  static async getAllTeamsForUser(id: any) {
    return ReaderApi.get("/teams/user/" + id);
  }
  static async addTeamForManga(payload: any) {
    return ReaderApi.post("/teams/manga/add", payload);
  }
  static async getAllTeamsForManga(id: any) {
    return ReaderApi.get("/teams/manga/" + id);
  }
  static async addInvitationForUser(payload: any) {
    return ReaderApi.post("/teams/invitation/add", payload);
  }
  static async getAllInvitationsForUser(id: any) {
    return ReaderApi.get("/teams/invitation/user/" + id);
  }
  static async agreeToJoinToTeam(payload: any) {
    return ReaderApi.post("/teams/invitation/user/join", payload);
  }
  static async refucalToJoinTeam(id: any) {
    return ReaderApi.delete("/teams/invitation/user/refusal/" + id);
  }
  static async deleteMemberFromTeam(id: any) {
    return ReaderApi.delete("/teams/member/" + id);
  }
}
