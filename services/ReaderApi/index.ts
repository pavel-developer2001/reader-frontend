import axios from "axios";

const token =
  typeof window !== "undefined" && window.localStorage.getItem("token");
export default axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    Authorization: "Bearer " + token,
  },
});
