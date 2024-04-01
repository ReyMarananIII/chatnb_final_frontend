import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/CHATNB_LOGO.png";
import "../utils/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CHATNB from "../../assets/images/ChatNB2.png";

const AdminLogin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3000/getUser")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/admin_dashboard");
          } else {
            navigate(`/dashboard/${result.data.id}`); // This is visitor ID from verify. It is called id instead visitorID because it is use for both admin and visitor
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/admin/admin_login", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("admin_valid", true);
          navigate("/admin_dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.error("Login error:", err));
  };

  return (
    <div className="container-fluid standard-admin-background h-100">
      <nav className=" Header-login navbar navbar-expand-lg ">
        <div className="container-fluid ">
          <a className="navbar-brand fs-2 text-white">
            <img src={CHATNB} alt="" />
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ul-link">
              <Link className="nav-link text-black ms-4" to={"/admin"}>
                Home
              </Link>
              <Link className="nav-link text-black " to={"/AdminAboutUs"}>
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-sm-col justify-content-between ">
        <form
          onSubmit={handleSubmit}
          className="auth-inner bg-white text-black mx-auto "
        >
          <div className="container-fluid">
            <h1 className="ChatNB text-center fw-bold">LOGIN YOUR ACCOUNT</h1>
            <h6 className="Text2">Welcome! Please login to your account</h6>
            <div className="Input-login mb-3 ">
              <label className="mb-2">Username</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter Username"
                value={values.username}
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
            </div>
            <div className="Input-login mb-3 ">
              <label className="mb-2">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <div className="text-warning">{error}</div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary mt-4">
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="w-50 h-50">
          <div className="w-100 h-100 d-flex align-items-center">
            <img
              src={logo}
              alt="ChatNB Logo"
              className="logoimage img-fluid d-flex"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
