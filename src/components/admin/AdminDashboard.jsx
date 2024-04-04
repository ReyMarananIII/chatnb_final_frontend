import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const AdminDashboard = () => {
  const anvigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/admin/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("admin_valid");
        anvigate("/admin");
      }
    });
  };
  return (
    <div className="container-fluid h-100vh" style={{ overflow: "hidden" }}>
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 admin-dashboard">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
            <Link
              to="/admin_dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-black text-decoration-none"
            >
              <h1 className="fs-5 fw-bolder d-none d-sm-inline">
                ChatNB Admin
              </h1>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start ul-link"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/admin_dashboard"
                  className="nav-link px-0 align-middle text-black"
                >
                  <i className="fs-4 bi bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Notable Batangaueños
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin_dashboard/edit_assessment"
                  className="nav-link px-0 align-middle text-black"
                >
                  <i className="fs-4 bi bi-pen ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Assessment</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin_dashboard/feedback"
                  className="nav-link px-0 align-middle text-black"
                >
                  <i className="fs-4 bi bi-envelope-paper ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Feedback</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin_dashboard/viewLeaderboards"
                  className="nav-link px-0 align-middle text-black"
                >
                  <i className="fs-4 bi bi-list-columns-reverse ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leaderboards</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-black">
                  <i className="fs-4 bi bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0" style={{ overflow: "auto" }}>
          <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
