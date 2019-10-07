import React from 'react';
import { NavLink } from 'react-router-dom';

function HeaderBar(props) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark static-top bg-dark">
            <a className="navbar-brand" href="/">tvmaf</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" exact activeClassName="active">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about" activeClassName="active">About</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="https://github.com/jamiecon/tvmaf/">GitHub</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default HeaderBar;
