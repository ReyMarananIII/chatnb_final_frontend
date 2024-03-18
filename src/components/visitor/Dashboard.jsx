import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import NBList from "./NBList";
import "../utils/style.css";
import pegasusLogo from "../../assets/images/TROPHY.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const [visitor, setVisitor] = useState({
    username: "",
    password: "",
    rewardPoints: "",
  });
  const { visitorID } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/visitor/detail/" + visitorID)
      .then((result) => {
        setVisitor({
          ...visitor,
          username: result.data.Result[0].name,
          password: result.data.Result[0].password,
          rewardPoints: result.data.Result[0].rewardPoints,
        });
      })
      .catch((err) => console.log(err));
  }, []);

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
    <div className="container-fluid h-100 standard-visitor-background">
      <div className="d-flex justify-content-between mb-5 pt-2">
        <div className="d-flex align-items-center p-4 square reward-points rounded-pill">
          <img src={pegasusLogo} alt="" width={45} height={45} />
          <h4>
            <span className="m-2">{visitor.rewardPoints}</span>Reward Point
            {visitor.rewardPoints > 1 ? <span>s</span> : ""}
          </h4>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav">
                <li className="nav-item" onClick={handleLogout}>
                  <Link className="nav-link text-danger">
                    <i className="fs-4 bi-power ms-2 "></i>
                    <span className="d-none d-sm-inline p-2 ">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div>
        <NBList />
      </div>
    </div>
  );
};

export default Dashboard;
