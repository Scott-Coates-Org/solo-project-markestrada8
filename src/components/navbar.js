import React from "react";
import { Link } from "react-router-dom";
import './navbar.css'

export default function NavBar() {
  return (
    <div className="nav-links">
      <div className="nav-link">
        <Link className="nav-link-item" to="/">HOME</Link>
      </div>
      <div className="nav-link">
        <Link className="nav-link-item" to="/editor">EDITOR</Link>
      </div>
      <div className="nav-link">
        <Link className="nav-link-item" to="/groups">GROUPS</Link>
      </div>
      <div className="nav-link">
        <Link className="nav-link-item" to="/about">ABOUT</Link>
      </div>
    </div>
  );
}