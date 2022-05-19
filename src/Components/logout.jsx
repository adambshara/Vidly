import React, { useEffect } from "react";
import { logout } from "./../services/authService";

const Logout = (props, logoutFunction) => {
  useEffect(() => {
    // logoutFunction();
    logout();
    window.location.href = "/";
  }, []);

  return null;
};

export default Logout;
