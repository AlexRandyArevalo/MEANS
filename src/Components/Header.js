import React from 'react'
import logo from '../user-profile.jpg';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignOutAlt);

function Header() {
    return <div>
        {/* <header className="means-header"> */}
        {/* <label className="p-4 ps-5 fs-2">MEANS</label> */}

        <nav className="navbar navbar-expand-lg means-header">
            <div className="navbar-collapse">
                <ul className="navbar-nav ml-auto text-center">
                    <li className="nav-item">
                        <a className="nav-link fs-3" href="#">MEANS</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-collapse justify-content-end means-user" style={{ paddingRight: "70px" }}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <img src={logo} className="rounded-circle" />
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Name Here</a>
                    </li>
                    <li className="nav-item d-flex last-child">
                        <span className="vLine"></span>
                        <a className="nav-link" href="#"><FontAwesomeIcon icon="sign-out-alt" /> Logout</a>
                    </li>
                </ul>
            </div>
            {/* <div className="d-flex user-img">
                <img src={logo} className="rounded-circle" />
                <a className="nav-link" href="#">Logout</a>
            </div> */}

            {/* <div className="mx-auto my-2 order-0 order-md-1 position-relative float-right">
                <a className="mx-auto" href="#">
                    <img src={logo} className="rounded-circle" style={{ width: "10%" }} />
                </a>    
            </div>
            <div className="dual-collapse2 order-2 order-md-2 float-right">
                <ul className="navbar-nav text-right">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Logout</a>
                    </li>
                </ul>
            </div> */}
        </nav>

        {/* </header> */}
    </div>
}

export default Header;