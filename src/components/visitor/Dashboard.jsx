import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import NBList from "./NBList";
import "../utils/style.css";
import pegasusLogo from "../../assets/images/TROPHY.png";
import { UseHooks } from "../../hooks/useHooks.jsx";
import nblistbg from "../../assets/images/nb-list_bg1.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { visitor, setVisitor, visitorID, getVisitor } = UseHooks();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getVisitor();
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true);
    }
  }, []);

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/visitor/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        localStorage.removeItem("popupShown");
        setVisitor({
          username: "",
          password: "",
          rewardPoints: "",
        });
        navigate("/");
      }
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem("popupShown", "true");
  };

  return (
    <div
      className="container-fluid min-vh-100 standard-visitor-background"
      style={{
        backgroundImage: `url(${nblistbg})`,
        backgroundSize: "cover",
      }}
    >
      {showPopup && (
        <div
          className="modal show pop-up-overlay"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Welcome to CHATNB {visitor.username}!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClosePopup}
                ></button>
              </div>
              <div className="modal-body">
                <h6>Instructions on how to operate CHATNB</h6>
                <ul>
                  <li>
                    <strong>
                      <i className="bi bi-house-fill"></i> Home Page
                    </strong>
                  </li>
                  <ul>
                    <li className="mb-3">
                      {" "}
                      NB Selection Panel: Browse available Notable Batanguenos
                      to chat with.
                    </li>
                  </ul>
                  <li>
                    <strong>
                      <i className="bi bi-chat-square-text-fill"></i> Chatting
                      with Notable Batanguenos
                    </strong>
                  </li>
                  <ul>
                    <li>
                      Select NB: Click on a NB from the NB Selection Panel
                    </li>
                    <li className="mb-3">
                      Start Chatting: Ask questions about the Notable
                      Batanguenos' life, contribution to the province, and
                      historical context.
                    </li>
                  </ul>
                  <li>
                    <strong>
                      <i className="bi bi-bar-chart-line-fill"></i> Additional
                      Features
                    </strong>
                  </li>
                  <ul>
                    <li>
                      Scoreboard: Track your reward points and the currently
                      leading scorer.
                    </li>
                    <li className="mb-3">
                      Assessment Features: Test your knowledge about Batangas
                      history and heroes through quiz.
                    </li>
                  </ul>
                  <li>
                    <strong>
                      <i className="bi bi-book-fill"></i> Guidelines for
                      Interacting with AI Chatbot
                    </strong>
                  </li>
                  <ul>
                    <li>
                      Be Respectful: Maintain a respectful and appropriate
                      conversation.
                    </li>
                    <li>
                      Ask Questions: Engage with the Notable Batanguenos and
                      learn about their life and contributions.
                    </li>
                  </ul>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClosePopup}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" d-flex justify-content-between mb-5 pt-2">
        <div className="d-flex align-items-center p-4 square reward-points rounded-pill">
          <img src={pegasusLogo} alt="" width={45} height={45} />
          <h4 className="dashboard-nav-text">
            <span className="m-2 dashboard-nav-text">
              {visitor.rewardPoints}
            </span>
            Reward Point
            {visitor.rewardPoints > 1 ? (
              <span className="dashboard-nav-text">s</span>
            ) : (
              ""
            )}
          </h4>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className=".container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav gap-2">
                <li className="nav-item button-30" role="button">
                  <Link
                    className="nav-link"
                    to={`/dashboard/${visitorID}/assessment`}
                  >
                    <span className="d-none d-sm-inline p-2 ms-2 fs-5 ">
                      <i className="bi bi-pen-fill"></i> Take Assessment
                    </span>
                  </Link>
                </li>
                <li className="nav-item button-30" role="button">
                  <Link
                    className="nav-link"
                    to={`/dashboard/${visitorID}/feedback`}
                  >
                    <span className="d-none d-sm-inline p-2 ms-2 fs-5 ">
                      <i className="bi bi-pen-fill"></i> Send Feedback
                    </span>
                  </Link>
                </li>
                <li
                  className="nav-item button-30"
                  role="button"
                  onClick={handleLogout}
                >
                  <Link className="nav-link">
                    <i className="bi bi-box-arrow-right fs-5"></i>
                    <span className="d-none d-sm-inline p-2 fs-5 ">Logout</span>
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
