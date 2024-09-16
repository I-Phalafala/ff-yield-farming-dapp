// Navbar.js

import React, { Component } from "react";
import './Navbar.css'
import Logo from '../ff-bank-logo.png'

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark fixed-top shadow p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-auto">
                    <img src={Logo} alt="FF Bank Logo" />
                    &nbsp; FF Yield Farm
                </a>
                <ul className="nav">
                    <li className="nav-item">
                        <small className="nav-link">Account Number: {this.props.account}</small>
                    </li>
                    <li className="nav-item">
                        <small className="nav-link">Settings</small>
                    </li>
                </ul>
                
            </nav>
        )
    }
}

export default Navbar;
