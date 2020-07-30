import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import getToast from "./utils/getToast";
import DashboardTopNav from "./Components/DashboardTopNav/DashboardTopNav";
import DashboardSideNav from "./Components/DashboardSideNav/DashboardSideNav";
import DashboardContentContainer from "./Components/_DashboardContentContainer/DashboardContentContainer";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import DisbursalStatus from "./Pages/DisbursalStatus/DisbursalStatus";
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
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <DashboardSideNav />
          <DashboardContentContainer>
            <DashboardTopNav />
            <Switch>
              <Route exact path="/dashboard/disbursal">
                <DisbursalStatus />
              </Route>
              <Redirect to="/dashboard/disbursal" />
            </Switch>
          </DashboardContentContainer>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
