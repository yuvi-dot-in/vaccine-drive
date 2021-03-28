import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <div className="name">
        <h1>Vaccination Drive</h1>
      </div>
      <div className="option">
        <Link to={"/tracker"}>
          <h3>Covid Tracker</h3>
        </Link>
        <Link to={"/vaccine"}>
          <h3>Vaccinate</h3>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
