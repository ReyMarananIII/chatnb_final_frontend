import React, { useState, useEffect } from "react";
import "../utils/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/CHATNB_LOGO.png";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginBG from "../../assets/images/Login-bg.png";
import CHATNB from "../../assets/images/ChatNB2.png";

const Login = () => {
  const [visitor, setVisitor] = useState({
    username: "",
    password: "",
    visitorID: "",
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
            setVisitor({ ...visitor, visitorID: result.data.id });
            navigate(`/dashboard/${result.data.id}`); // This is visitor ID from verify. It is called id instead visitorID because it is use for both admin and visitor
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/visitor/visitor_login", visitor)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate(`/dashboard/${result.data.visitorID}`);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="container-fluid "
      style={{
        backgroundImage: `url(${LoginBG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <nav class=" Header-login navbar navbar-expand-lg ">
        <div class="container-fluid ">
          <a class="navbar-brand fs-2 text-white">
            <img src={CHATNB} alt="" />
          </a>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ul-link">
              <Link class="nav-link text-black ms-4" to={"/"}>
                Home
              </Link>
              <Link class="nav-link text-black " to={"/AboutUs"}>
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-sm-col justify-content-between ">
        <form
          onSubmit={handleSubmit}
          class="auth-inner card bg-white text-black mx-auto "
        >
          <div className="container-fluid">
            <h1 className="ChatNB text-center fw-bold mb-4 fs-1">
              LOGIN YOUR ACCOUNT
            </h1>
            <h6 className="Text2">Welcome! Please login to your account</h6>
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
            <div className="Input-login mb-3 ">
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

export default Login;
