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
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h3>Score: 0</h3>
        </div>
        <div className="d-flex" onClick={handleLogout}>
          <Link className="px-0 align-middle bg-success btn btn-sm text-white">
            <i className="fs-4 bi-power ms-2"></i>
            <span className="d-none d-sm-inline p-2">Logout</span>
          </Link>
        </div>
      </div>
      <div>
        <NBList />
      </div>
    </div>
  );
};

export default Dashboard;
