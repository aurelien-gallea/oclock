import React from "react";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
import classes from "./Header.module.css";

function Header(props) {
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <div className="container">
          <div className="navbar-brand">O'clock</div>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#monMenuDeroulant"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse"  id="monMenuDeroulant">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={routes.HOME}>
                  Accueil
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to={routes.ALARM}>
                  Réveil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={routes.CHRONO}>
                  Chronomètre
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={routes.TIMER}>
                  Minuteur
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
