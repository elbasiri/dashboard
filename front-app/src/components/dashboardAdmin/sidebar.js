import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-item d-flex my-5">
      <i class="fas fa-home mx-5" style={{marginTop: "10px"}}></i>
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <h6>Home</h6> 
        </Link>
      </div>
      <div className="sidebar-item d-flex my-5">
      <i class="fas fa-box mx-5" style={{marginTop: "10px"}}></i>
        <Link
          to="/products"
          className={`nav-link ${
            location.pathname === "/products" ? "active" : ""
          }`}
        >
          <h6>Products</h6> 
        </Link>
      </div>
      <div className="sidebar-item d-flex my-5">
      <i class="fas fa-user mx-5" style={{marginTop: "10px"}}></i>
        <Link
          to="/customers"
          className={`nav-link ${
            location.pathname === "/customers" ? "active" : ""
          }`}
        >
          <h6>Customers</h6> 
        </Link>
      </div>
      <div className="sidebar-item d-flex my-5">
      <i class="fas fa-user mx-5" style={{marginTop: "10px"}}></i>
        <Link
          to="/partners"
          className={`nav-link ${
            location.pathname === "/partners" ? "active" : ""
          }`}
        >
          <h6>Partners</h6> 
        </Link>
      </div>
      <div className="sidebar-item d-flex my-5">
      <i class="fas fa-box-open mx-5" style={{marginTop: "10px"}}></i>
        <Link
          to="/commands"
          className={`nav-link ${
            location.pathname === "/commands" ? "active" : ""
          } font`}
        >
          <h6>Commands</h6> 
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
