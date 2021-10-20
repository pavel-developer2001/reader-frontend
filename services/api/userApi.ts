import ReaderApi from "../ReaderApi";

export default class UserApi {
  static async registration(payload: {
    name: string;
    email: string;
    password: string;
  }) {
    return ReaderApi.post("/users/registration", payload);
  }
  static async login(payload: { email: string; password: string }) {
    return ReaderApi.post("/users/login", payload);
  }
  static async getUser(id: number) {
    return ReaderApi.get("/users/" + id);
  }
}
