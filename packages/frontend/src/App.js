import React from "react";
// import logo from './logo.svg';
import "./App.css";
import Home from "./Pages/Home/Home";
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      {/* <h1>Hello</h1> */}
    </div>
  );
}

export default App;
