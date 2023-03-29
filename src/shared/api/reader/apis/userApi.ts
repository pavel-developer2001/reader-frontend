import ReaderApi from "../base"

export default class UserApi {
  static async registration(payload: {
    name: string
    email: string
    password: string
  }) {
    return ReaderApi.post("/auth/register", payload)
  }

  static async login(payload: { email: string; password: string }) {
    return ReaderApi.post("/auth/login", payload)
  }

  static async getUser(id: string | string[] | undefined) {
    return ReaderApi.get(`/users/${id}`)
  }
}
