import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import { getJwt } from "./authService";

axios.defaults.headers.common["x-auth-token"] = getJwt();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (expectedError) return Promise.reject(error);
  console.log("Logging the error", error);
  alert("An unexpected error occured");
  //this will be called first in case of an error
  console.log("INTERCEPTOR CALLED");
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
