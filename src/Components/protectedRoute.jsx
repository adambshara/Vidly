import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

// const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
//   const user = authService.getCurrentUser();

//   return (
//     <Route
//       {...restOfProps}
//       render={(props) =>
//         user?.name ?? "" ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// };
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("props", props);
        if (!getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
