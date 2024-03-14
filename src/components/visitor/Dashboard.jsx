import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import NBList from "./NBList";

const Dashboard = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/visitor/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };
  return (
    <div>
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav">
                  <li className="nav-item" onClick={handleLogout}>
                      <Link className="nav-link">
                    <i className="fs-4 bi-power ms-2"></i>
                    <span className="d-none d-sm-inline p-2">Logout</span>
                  </Link>
                  </li>
                </ul>
              </div>
            </div>
      </nav>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h3>Score: 0</h3>
        </div>

      </div>
      <div>
        <NBList />
      </div>
    </div>
  );
};

export default Dashboard;
