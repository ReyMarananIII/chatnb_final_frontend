import React, { useState, useEffect } from "react";
import "../utils/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/CHATNB_LOGO.png";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/admin_dashboard");
          } else {
            navigate("/dashboard");
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/visitor/visitor_login", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={"/dashboard"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/AboutUs"}>
                  About us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex flex-sm-col justify-between justify-content-between">
        <form onSubmit={handleSubmit} className="auth-inner">
          <h1 className="ChatNB">Chat NB</h1>
          <h3 className="Text1">Artificial Intelligence Application</h3>
          <h3 className="Text1">to talk to Notable Batanguenos</h3>
          <h6 className="Text2">Welcome! Please login to your account</h6>
          <div className="mb-3">
            <label>Username</label>
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
          <div className="mb-3">
            <label>Password</label>
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
            <button type="submit" className="btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="w-50">
          <div className="h-100 w-100 d-flex justify-content-center align-items-center">
            <img src={logo} alt="ChatNB Logo" className="logoimage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
