import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import getToast from "./utils/getToast";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import "./App.css";

const App = () => {

  useEffect(() => {
    const toast = getToast();
    toast.fire({
      icon: 'success',
      title: 'Okay loaded'
    });
  }, []);

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
