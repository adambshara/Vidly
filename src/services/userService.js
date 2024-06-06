import httpService from "./httpService";
import { apiUrl } from "../config.json";
const apiEndPoint = "http://localhost:3900/api";
//or i can import it like this
// const apiEndPoint = apiUrl + "/users";

export function register(user) {
  return httpService.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
