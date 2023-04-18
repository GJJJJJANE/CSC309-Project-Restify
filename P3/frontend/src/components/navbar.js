import React, { useState, useEffect } from "react";
import axios from "axios";


function Navbar() {
    return (
        <nav className="navbar fixed-top navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Restify
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="home.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="u_ReservationView.html">Reservations</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="all_host_listing.html">My Listings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="property_history.html">Property History</a>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}
export default Navbar;