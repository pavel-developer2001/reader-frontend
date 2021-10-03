import ReaderApi from "../ReaderApi";

export default class TeamApi {
  static async createTeam(payload: any) {
    return ReaderApi.post("/teams/add", payload);
  }
  static async getAllTeam() {
    return ReaderApi.post("/teams/");
  }
}
