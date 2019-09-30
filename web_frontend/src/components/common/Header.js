import React from 'react';
import { NavLink } from 'react-router-dom';

function HeaderBar(props) {
    return (
        <nav class="navbar navbar-expand-md navbar-dark static-top bg-dark">
            <a class="navbar-brand" href="/">tvmaf</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/" exact activeClassName="active">Home</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/about" activeClassName="active">About</NavLink>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="https://github.com/jamiecon/tvmaf/">GitHub</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default HeaderBar;
