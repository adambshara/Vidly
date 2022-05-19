import httpService from "./httpService";
import { apiUrl } from "../config.json";

import jwt_decode from "jwt-decode";

const apiEndpoint = apiUrl + "/auth";
const tokkenKey = "token";

const login = async (email, password) => {
  const { data: jwt } = await httpService.post(apiEndpoint, {
    email,
    password,
  });

  console.log("jwt", jwt);

  localStorage.setItem(tokkenKey, jwt);
};

export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokkenKey, jwt);
};
export const logout = () => {
  localStorage.removeItem(tokkenKey);
};
export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokkenKey);

    console.log("jwt", jwt);
    return jwt_decode(jwt);
  } catch (ex) {
    return null;
  }
};

export const getJwt = () => {
  return localStorage.getItem(tokkenKey)?.toString();
};

export default login;
