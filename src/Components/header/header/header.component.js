import React from 'react'
import { Link } from 'react-router-dom'
import '../responsive-style/style.css';
import '../style/style.css';
import logo from '../../../Assets/images/user-profile.jpg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignOutAlt);

function Header() {
    return <div>
        <nav className="navbar navbar-expand-lg means-header">
            <div className="navbar-collapse">
                <ul className="navbar-nav ml-auto text-center">
                    <li className="nav-item means">
                        <Link className="nav-link fs-3" to="/">MEANS</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-collapse justify-content-end means-user" style={{ paddingRight: "70px" }}>
                <ul className="navbar-nav">
                    <li className="nav-item" style={{ marginRight: "-14px", position:"relative" }}>
                        <img src={logo} className="rounded-circle" alt="logo" />
                    </li>
                    <li className="nav-item align-self-center">
                        <span className="nav-link" style={{width:"100%"}}>{window.name}</span>
                    </li>
                    <li className="nav-item d-flex last-child">
                        <span className="vLine"></span>
                        <Link className="nav-link" to="/login"><FontAwesomeIcon icon="sign-out-alt" /> Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
}

export default Header;