import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { Switch, Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import cookie from "js-cookie";
import USER from "./graphql/queries/user";
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
import Conversations from "./Pages/Conversations/Conversations";
import AddScheme from "./Pages/AddScheme/AddScheme";
import Faq from "./Pages/Faq/Faq";
import { AuthContext } from "./context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(cookie.get("signedin") === "true");
  const [expiry, setExpiry] = useState(null);

  useEffect(() => {
    const toast = getToast();
    toast.fire({
      title: "Okay loaded",
      icon: `success`,
      iconHtml: renderToString(<SuccessIcon />),
    });
  }, []);

  const { data } = useQuery(USER, {
    onCompleted: () => {
      console.log(data);
    },
    onError: (error) => {
      const toast = getToast();
      if (error.graphQLErrors.length > 0) {
        toast.fire({
          title: error.graphQLErrors[0].message,
          icon: "error",
        });
      } else {
        toast.fire({
          title: "Some error occurred",
          icon: "error",
        });
      }
    },
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        expiry,
        setIsLoggedIn,
        setExpiry,
      }}
    >
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            {isLoggedIn ? (
              <>
                <DashboardSideNav />
                <DashboardContentContainer>
                  <DashboardTopNav />

                  <Switch>
                    <Route exact path="/dashboard/disbursal/:entityId?">
                      <DisbursalStatus />
                    </Route>
                    <Route path="/dashboard/schemes">
                      <Switch>
                        <Route exact path="/dashboard/schemes">
                          <Schemes />
                        </Route>
                        <Route exact path="/dashboard/schemes/add">
                          <AddScheme />
                        </Route>
                        <Redirect to="/dashboard/schemes" />
                      </Switch>
                    </Route>
                    <Route path="/dashboard/conversations">
                      <Switch>
                        <Route exact path="/dashboard/conversations/:entityId?">
                          <Conversations />
                        </Route>
                        <Redirect to="/dashboard/conversations" />
                      </Switch>
                    </Route>
                    <Route exact path="/dashboard/faq">
                      <Faq />
                    </Route>

                    <Redirect to="/dashboard/schemes" />
                  </Switch>
                </DashboardContentContainer>
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
