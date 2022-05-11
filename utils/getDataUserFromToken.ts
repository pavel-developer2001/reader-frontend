import jwt_decode from "jwt-decode";
const token: string | false | null =
  typeof window !== "undefined" && localStorage.getItem("token");
//@ts-ignore
export const dataUser = token ? jwt_decode(token).sub : null;
