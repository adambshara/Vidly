import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import MovieForm from "./Components/movieForm";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./Components/Movies";
import Customers from "./Components/customers";
import Rentals from "./Components/rentals";
import NotFound from "./Components/notFound";
import NavBar from "./Components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./Components/loginForm";
import Logout from "./Components/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Register from "./Components/register";
import ProtectedRoute from "./Components/protectedRoute";
import { getCurrentUser } from "./services/authService";

const App = (props) => {
  const [user, setUser] = useState(getCurrentUser());

  // useEffect(() => {
  //   const user = getCurrentUser() ?? "";

  //   if (!user) return;

  //   console.log("currentUser", getCurrentUser());
  // }, []);

  const logoutFunction = () => {
    console.log("inside LOGOUT");
    setUser({});
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={getCurrentUser()} />
      <main className="container-fluid">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route
            path="/logout"
            render={(props) => (
              <Logout {...props} logoutFunction={logoutFunction} />
            )}
          />
          {<ProtectedRoute path="/movies/:id" component={MovieForm} />}

          <Route
            path="/movies/"
            render={(props) => <Movies {...props} user={getCurrentUser()} />}
          />
          <ProtectedRoute
            path="/customers"
            component={Customers}
          ></ProtectedRoute>
          <ProtectedRoute path="/rentals" component={Rentals}></ProtectedRoute>
          <ProtectedRoute
            path="/not-found"
            component={NotFound}
          ></ProtectedRoute>
          <Redirect from="/" exact to="/movies"></Redirect>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;

// function App() {
//   return (

//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
