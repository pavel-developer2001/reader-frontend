import jwt_decode from "jwt-decode";

interface IToken {
  email: string;
  exp: number;
  iat: number;
  sub: number;
}

const token: string | false | null =
  typeof window !== "undefined" && localStorage.getItem("token");

export const dataUser = token ? (jwt_decode(token) as IToken).sub : null;
