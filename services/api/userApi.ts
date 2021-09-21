import ReaderApi from "../ReaderApi";

export default class UserApi {
  static async registration(payload: any) {
    return ReaderApi.post("users/registration", payload);
  }
}
