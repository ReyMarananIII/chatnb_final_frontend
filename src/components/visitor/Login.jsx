import React, { useState, useEffect } from "react";
import "../utils/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginFormBG from "../../assets/images/Vintage_login.png";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import CHATNB from "../../assets/images/ChatNB2.png";
import LoginBGVideo from "../../assets/images/VideoBG.mp4";
import { UseHooks } from "../../hooks/useHooks.jsx";

const Login = () => {
  const { visitor, setVisitor } = UseHooks();
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
    <div className="container-fluid ">
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={LoginBGVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <nav className=" Header-login navbar navbar-expand-lg ">
        <div className="container-fluid ">
          <a className="navbar-brand fs-2 text-white">
            <img src={CHATNB} alt="" />
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ul-link">
              <Link className="nav-link text-white ms-4" to={"/"}>
                Home
              </Link>
              <Link className="nav-link text-white" to={"/AboutUs"}>
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-sm-col justify-content-between login-form">
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
