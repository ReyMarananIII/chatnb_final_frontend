import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const AdminDashboard = () => {
  const anvigate = useNavigate();
  const location = useLocation();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:4000/admin/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("admin_valid");
        anvigate("/admin");
      }
    });
  };

  return (
    <div
      className="container-fluid h-100vh bg-white"
      style={{ overflow: "hidden" }}
    >
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
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start ul-link gap-2"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/admin_dashboard"
                  className="nav-links px-0 align-middle"
                  style={{
                    backgroundColor:
                      location.pathname === "/admin_dashboard" ? "#604c3c" : "",
                    color:
                      location.pathname === "/admin_dashboard"
                        ? "white"
                        : "black",
                  }}
                >
                  <i className="fs-4 bi bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Notable <span className="m-2">Batangueños</span>{" "}
                    {/**Span to align text */}
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin_dashboard/edit_assessment"
                  className="nav-links px-0 align-middle"
                  style={{
                    backgroundColor:
                      location.pathname === "/admin_dashboard/edit_assessment"
                        ? "#604c3c"
                        : "",
                    color:
                      location.pathname === "/admin_dashboard/edit_assessment"
                        ? "white"
                        : "black",
                  }}
                >
                  <i className="fs-4 bi bi-pen ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Assessment</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin_dashboard/feedback"
                  className="nav-links px-0 align-middle"
                  style={{
                    backgroundColor:
                      location.pathname === "/admin_dashboard/feedback"
                        ? "#604c3c"
                        : "",
                    color:
                      location.pathname === "/admin_dashboard/feedback"
                        ? "white"
                        : "black",
                  }}
                >
                  <i className="fs-4 bi bi-envelope-paper ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Feedback</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin_dashboard/viewLeaderboards"
                  className="nav-links px-0 align-middle"
                  style={{
                    backgroundColor:
                      location.pathname === "/admin_dashboard/viewLeaderboards"
                        ? "#604c3c"
                        : "",
                    color:
                      location.pathname === "/admin_dashboard/viewLeaderboards"
                        ? "white"
                        : "black",
                  }}
                >
                  <i className="fs-4 bi bi-list-columns-reverse ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Leaderboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/admin_dashboard/analytics"
                  className="nav-links px-0 align-middle"
                  style={{
                    backgroundColor:
                      location.pathname === "/admin_dashboard/analytics"
                        ? "#604c3c"
                        : "",
                    color:
                      location.pathname === "/admin_dashboard/analytics"
                        ? "white"
                        : "black",
                  }}
                >
                  <i className="fs-4 bi bi-graph-up ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Analytics</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-links px-0 align-middle text-black">
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
