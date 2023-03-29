import React from "react";
import logo from "../../assets/images/jewelry.png";
import "./style.css";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const Dashboard = () => {
  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <img src={logo} alt="" />
          <span className="logo_name">Figure Shop</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#" className="active">
              <MdOutlineDashboardCustomize className="text-white text-lg" />
              <span className="links_name">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-box"></i>
              <span className="links_name">Product</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-list-ul"></i>
              <span className="links_name">Order list</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-coin-stack"></i>
              <span className="links_name">Stock</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-message"></i>
              <span className="links_name">Messages</span>
            </a>
          </li>
          <li className="log_out">
            <a href="#">
              <i className="bx bx-log-out"></i>
              <span className="links_name">Log out</span>
            </a>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i className="bx bx-menu sidebarBtn"></i>
            <span className="dashboard">Dashboard</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className="bx bx-search"></i>
          </div>
          <div className="profile-details">
            <span className="admin_name">Admin</span>
            <i className="bx bx-chevron-down"></i>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Dashboard;
