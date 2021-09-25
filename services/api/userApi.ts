import ReaderApi from "../ReaderApi";

export default class UserApi {
  static async registration(payload: any) {
    return ReaderApi.post("/users/registration", payload);
  }
  static async login(payload: any) {
    return ReaderApi.post("/users/login", payload);
  }
  static async getUser(id: any) {
    return ReaderApi.get("/users/" + id);
  }
}
