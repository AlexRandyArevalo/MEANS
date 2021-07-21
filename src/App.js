import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './style/Custom.css';
import Login from './Login';


import { BrowserRouter, Route } from 'react-router-dom'

import Dashboard from './Components/Dashboard';
import RiskAssessments from './Components/RiskAssessments';
import AddRiskAssessments from './Components/AddRiskAssessments';
import RiskLevelManagement from './Components/RiskLevelManagement';
import EmployeeMaintenance from './Components/EmployeeMaintenance';
import EditRiskAssessments from './Components/EditRiskAssessments';
import UserMaintenance from './Components/UserMaintenance';
import StatisticReports from './Components/StatisticAndReports';


function App() {
  return (
    <div className="App">
      
      {/* ROUTE */}
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/riskassessments" component={RiskAssessments} />
        <Route exact path="/addriskassessments" component={AddRiskAssessments} />
        <Route exact path="/risklevelmanagement" component={RiskLevelManagement} />
        <Route exact path="/employeemaintenance" component={EmployeeMaintenance} />
        <Route exact path="/editriskassessments" component={EditRiskAssessments} />
        <Route exact path="/usermaintenance" component={UserMaintenance} />
        <Route exact path="/statisticreports" component={StatisticReports} />
      </BrowserRouter>
      {/* /ROUTE */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
