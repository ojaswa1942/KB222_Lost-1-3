import React, { useEffect } from "react";
import { renderToString } from "react-dom/server";
import { Switch, Route, Redirect } from "react-router-dom";
import getToast from "./utils/getToast";
import { ReactComponent as SuccessIcon } from "./assets/icons/icons8-checked.svg";
import DashboardTopNav from "./Components/DashboardTopNav/DashboardTopNav";
import DashboardSideNav from "./Components/DashboardSideNav/DashboardSideNav";
import DashboardContentContainer from "./Components/_DashboardContentContainer/DashboardContentContainer";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import DisbursalStatus from "./Pages/DisbursalStatus/DisbursalStatus";
import "./App.css";
import Schemes from "./Pages/Schemes/Schemes";
import AddScheme from "./Pages/AddScheme/AddScheme";

const App = () => {
  useEffect(() => {
    const toast = getToast();
    toast.fire({
      title: "Okay loaded",
      icon: `success`,
      iconHtml: renderToString(<SuccessIcon />),
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
              <Route exact path="/dashboard/schemes/add">
                <AddScheme />
              </Route>
              <Route exact path="/dashboard/schemes">
                <Schemes />
              </Route>
              <Redirect to="/dashboard/disbursal" />
            </Switch>
          </DashboardContentContainer>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
