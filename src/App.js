import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./Components/custom-style/style.css";
import Login from "./Pages/Login";

import { Switch, Route, useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from "react-toast-notifications";

import Header from "./Components/header/header/header.component";
import Menu from "./Components/menu/menu.component";

import Dashboard from "./Pages/Dashboard";
import RiskAssessments from "./Pages/RiskAssessments";
import AddRiskAssessments from "./Pages/AddRiskAssessments";
import EmployeeMaintenance from "./Pages/EmployeeMaintenance";
import UserMaintenance from "./Pages/UserMaintenance";
import StatisticReports from "./Pages/StatisticAndReports";
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
import swal from "sweetalert";

// import Testroute from './sampleroute'

function App() {
  const filter = [
    "/",
    "/riskassessments",
    "/addriskassessments",
    "/employeemaintenance",
    "/usermaintenance",
    "/statisticreports",
  ];

  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        setAuthToken(token);

        try {
          const request = await axios.get("get-current-user");
          const response = await request?.data;

          if (response?.success) {
            setCurrentUser(response?.data);
            history.push("/");
            setAuthLoaded(true);
            setAuthToken(token);
          } else {
            throw Error;
          }
        } catch (error) {
          setAuthLoaded(true);

          history.push("/login");
          localStorage.removeItem("token");
          swal(
            "Error authenticating user",
            "Please refresh the page or login your account again!",
            "error"
          );
        }
      } else {
        history.push("/login");
      }
    };


    validateToken();

  
  }, []);

  return (
    <div className="App">
      {/* ROUTE */}
      <Route exact path={filter}>
        <Header />
      </Route>
      <div className="d-flex">
        <Route exact path={filter}>
          <Menu />
        </Route>
        <Route exact path="/" component={Dashboard} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/riskassessments" component={RiskAssessments} />
        <Route
          exact
          path="/addriskassessments"
          component={AddRiskAssessments}
        />
        <Route
          exact
          path="/employeemaintenance"
          component={EmployeeMaintenance}
        />
        <Route exact path="/usermaintenance" component={UserMaintenance} />
        <Route exact path="/statisticreports" component={StatisticReports} />
      </div>
      {/* /ROUTE */}
    </div>
  );
}

export default App;
