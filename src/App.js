import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RegisteredEvents from "./components/RegisteredEvents/RegisteredEvents";
import AdminHome from "./components/AdminHome/AdminHome";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <Router>
        <Header />
        <Switch />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/registration/:eventName">
          <Registration />
        </PrivateRoute>
        <PrivateRoute path="/events">
          <RegisteredEvents />
        </PrivateRoute>
        <Route path="/adminHome">
          <AdminHome />
        </Route>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
