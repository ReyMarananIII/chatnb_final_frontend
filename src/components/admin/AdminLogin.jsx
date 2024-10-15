import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../utils/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CHATNB from "../../assets/images/AdminNB.png";
import LoginFormBG from "../../assets/images/Vintage_login.png";
import nblistbg from "../../assets/images/nb-list_bg2.png";

const AdminLogin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:4000/getUser")
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
      .post("http://localhost:4000/admin/admin_login", values)
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
    <div
      className="container-fluid p-0 position-relative overflow-hidden"
      style={{
        backgroundImage: `url(${nblistbg})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <nav className="Header-login navbar navbar-expand-lg navbar-light position-absolute">
        <div className="container">
          <div className="d-flex align-items-center">
            <a
              className="navbar-brand fs-2 text-white"
              style={{ marginRight: "auto" }}
            >
              <img src={CHATNB} alt="" style={{ height: "50px" }} />
            </a>
            <div className="navbar-nav ul-link d-lg-flex align-items-center">
              <Link
                className="nav-link ms-lg-4"
                to={"/admin"}
                style={{
                  color: location.pathname === "/admin" ? "#604c3c" : "white",
                }}
              >
                Home
              </Link>
              <Link
                className="nav-link"
                to={"/AdminAboutUs"}
                style={{
                  color:
                    location.pathname === "/AdminAboutUs" ? "#604c3c" : "white",
                }}
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="d-flex flex-column justify-content-center align-items-center login-form"
        style={{ height: "100vh" }}
      >
        <form
          onSubmit={handleSubmit}
          className="auth-inner card bg-white text-black mx-auto "
          style={{
            backgroundImage: `url(${LoginFormBG})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container-fluid">
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
            <div className="Input-login mb-2 ">
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
            <div className="text-danger warning">{error}</div>
            <div className="container text-center fs-3 mt-3">
              <button type="submit" className="login-btn">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
