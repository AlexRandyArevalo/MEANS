import React from 'react'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faTachometerAlt,
    faHouseDamage,
    faHandHoldingMedical,
    faChartLine,
    faTools,
    faUserCog,
    faEdit
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faTachometerAlt,
    faHouseDamage,
    faHandHoldingMedical,
    faChartLine,
    faTools,
    faUserCog,
    faEdit
);

function Menubar() {
    return <div className="means-menubar col-md-3 bg-dark">
        <nav id="sidebar">
            <ul className="list-unstyled components">
                <p>&nbsp;</p>
                <li>
                    <Link className="ps-5 my-link" to="/"><FontAwesomeIcon icon="tachometer-alt" /> &nbsp;Dashboard</Link>
                </li>
                <li>
                    <Link className="ps-5 my-link" to="/riskassessments"><FontAwesomeIcon icon="house-damage" /> &nbsp;Risk Assessments</Link>
                </li>
                {/* <li>
                    <Link className="ps-5 my-link" to="/addriskassessments"><FontAwesomeIcon icon="hand-holding-medical" /> &nbsp;Add Risk Assessments</Link>
                </li> */}
                {/* <li>
                    <Link className="ps-5 my-link" to="/risklevelmanagement"><FontAwesomeIcon icon="chart-line" /> &nbsp;Risk Level Management</Link>
                </li> */}
                <li>
                    <Link className="ps-5 my-link" to="/employeemaintenance"><FontAwesomeIcon icon="tools" /> &nbsp;Employee Maintenance</Link>
                </li>
                <li>
                    <Link className="ps-5 my-link" to="/statisticreports"><FontAwesomeIcon icon="chart-line" /> &nbsp;Statistic Reports</Link>
                </li>
                {/* <li>
                    <Link className="ps-5 my-link" to="/editriskassessments"><FontAwesomeIcon icon="edit" /> &nbsp;Edit Risk Assessments</Link>
                </li> */}
                <li>
                    <Link className="ps-5 my-link" to="/usermaintenance"><FontAwesomeIcon icon="user-cog" /> &nbsp;User Maintenance</Link>
                </li>
            </ul>
        </nav>
    </div>
}

export default Menubar;