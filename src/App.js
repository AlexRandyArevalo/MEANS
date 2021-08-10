import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './Components/custom-style/style.css';
import Login from './Pages/Login';

import { BrowserRouter, Route } from 'react-router-dom'
import { ToastProvider, useToasts } from 'react-toast-notifications'

import Header from './Components/header/header/header.component';
import Menu from './Components/menu/menu.component';

import Dashboard from './Pages/Dashboard';
import RiskAssessments from './Pages/RiskAssessments';
import AddRiskAssessments from './Pages/AddRiskAssessments';
import EmployeeMaintenance from './Pages/EmployeeMaintenance';
import UserMaintenance from './Pages/UserMaintenance';
import StatisticReports from './Pages/StatisticAndReports';

// import Testroute from './sampleroute'

function App() {
  const filter = [
    "/",
    "/riskassessments",
    "/addriskassessments",
    "/employeemaintenance",
    "/usermaintenance",
    "/statisticreports"
  ]
  return (
    <div className="App">

      {/* ROUTE */}
      <BrowserRouter>
        <Route exact path={filter}><Header /></Route>
        <div className="d-flex">
          <Route exact path={filter}><Menu /></Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/riskassessments" component={RiskAssessments} />
          <Route exact path="/addriskassessments" component={AddRiskAssessments} />
          <Route exact path="/employeemaintenance" component={EmployeeMaintenance} />
          <Route exact path="/usermaintenance" component={UserMaintenance} />
          <Route exact path="/statisticreports" component={StatisticReports} />
        </div>
      </BrowserRouter>
      {/* /ROUTE */}

    </div>
  );
}

export default App;
