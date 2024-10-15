import React, { useState, useEffect } from "react";
import "../utils/style.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoginFormBG from "../../assets/images/Vintage_login.png";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import CHATNB from "../../assets/images/ChatNB2.png";
import LoginBGVideo from "../../assets/images/VideoBG.mp4";
import { UseHooks } from "../../hooks/useHooks.jsx";

const Login = () => {
  const { visitor, setVisitor, setShowError } = UseHooks();
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
            setShowError(false);
            navigate(`/dashboard/${result.data.id}`);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/visitor/visitor_login", visitor)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          setShowError(false);
          navigate(`/dashboard/${result.data.visitorID}`);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid p-0 position-relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        style={{
          objectFit: "cover",
          width: "100vw",
          height: "100vh",
        }}
      >
        <source src={LoginBGVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <nav className="Header-login navbar navbar-expand-lg navbar-light position-absolute">
        <div className="container">
          <div className="container d-flex align-items-center justify-content-between">
            <a
              className="navbar-brand fs-2 text-white d-flex align-items-center"
              style={{ marginRight: "auto" }}
            >
              {" "}
              <img src={CHATNB} alt="" style={{ height: "25px" }} />
            </a>
            <div className="navbar-nav ul-link d-lg-flex align-items-center">
              <Link
                className="nav-link ms-lg-4"
                to={"/"}
                style={{
                  color: location.pathname === "/" ? "#604c3c" : "white",
                }}
              >
                Home
              </Link>
              <Link
                className="nav-link"
                to={"/aboutUs"}
                style={{
                  color: location.pathname === "/aboutUs" ? "#604c3c" : "white",
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
            <h6 className="Text2">Welcome! Login using bahay bahayan account</h6>
            <div className="Input-login mb-3 ">
              <label className="mb-2">Username</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter Username"
                value={visitor.username}
                onChange={(e) =>
                  setVisitor({ ...visitor, username: e.target.value })
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
                value={visitor.password}
                onChange={(e) =>
                  setVisitor({ ...visitor, password: e.target.value })
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

export default Login;
