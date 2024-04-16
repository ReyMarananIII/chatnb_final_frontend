import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import NBList from "./NBList";
import Feedback from "./Feedback";
import Leaderboard from "./LeaderBoards";
import "../utils/style.css";
import pegasusLogo from "../../assets/images/TROPHY.png";
import { UseHooks } from "../../hooks/useHooks.jsx";
import nblistbg from "../../assets/images/nb-list_bg2.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    visitor,
    setVisitor,
    visitorID,
    showError,
    setShowError,
    getVisitor,
    setShowSubtitle,
  } = UseHooks();
  const [showPopup, setShowPopup] = useState(false);

  const [loading, setLoading] = useState(true); // Add loading state

  const handleError = () => {
    setShowError(!showError); // Close the modal
    window.location.reload();
  };

  useEffect(() => {
    getVisitor();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/visitor/get_instructed")
      .then((result) => {
        if (result.data.Status) {
          const instructed = result.data.Result;
          const alreadyInstructed = instructed.some(
            (item) => item.visitorID === visitorID
          );
          setShowPopup(!alreadyInstructed);
        } else {
          console.log(result.data.Error);
          setShowError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      })
      .finally(() => {
        // To fixed the bug in showing the instruction
        // When reload to homepage
        if (visitorID) {
          setLoading(false);
        }
      });
  }, [visitorID]);

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/visitor/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        localStorage.removeItem("showSubtitle");
        setVisitor({
          username: "",
          password: "",
          rewardPoints: "",
        });
        setShowSubtitle(true); // To always show subtitle after login
        navigate("/");
      }
    });
  };

  const handleClosePopup = () => {
    axios
      .post("http://localhost:3000/visitor/set_instructed", {
        visitorID: visitorID,
      })
      .then((result) => {
        if (result.data.Status) {
          setShowPopup(false);
        } else {
          console.log(result.data.Error);
          setShowError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
  };

  return (
    <>
      {!loading ? (
        <>
          {!showError ? (
            <>
              <div
                className="container-fluid min-vh-100 standard-visitor-background"
                style={{
                  backgroundImage: `url(${nblistbg})`,
                  backgroundSize: "cover",
                }}
              >
                <div className=" d-flex justify-content-between mb-2 pt-2">
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
                </div>
                <div>
                  <NBList />
                </div>
                <div>
                  <div className="Assessment-container">
                    <div
                      className="Assessment_button"
                      onClick={() =>
                        navigate(`/dashboard/${visitorID}/assessment`)
                      }
                    >
                      <div className="icon">
                        <i className="bi bi-pencil fs-4"></i>
                      </div>
                      <span>Assessment</span>
                    </div>
                  </div>
                  <div className="Logout-container">
                    <div className="Logout_button" onClick={handleLogout}>
                      <div className="icon">
                        <i className="bi bi-box-arrow-right fs-4"></i>
                      </div>
                      <span>Logout</span>
                    </div>
                  </div>
                  <div className="Instructions-container">
                    <div
                      className="Instructions_button"
                      onClick={() => setShowPopup(true)}
                    >
                      <div className="icon">
                        <i className="bi bi-file-earmark-ruled fs-4"></i>
                      </div>
                      <span>Instructions</span>
                    </div>
                  </div>
                  <Leaderboard />
                  <Feedback />
                </div>
              </div>
              {showPopup && (
                <div
                  className="modal show pop-up-overlay"
                  tabIndex="-1"
                  role="dialog"
                  style={{ display: "block", overflow: "hidden" }}
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
                            <li>
                              NB Selection Panel: Browse available Notable
                              Batangueños to chat with.
                            </li>
                            <li>
                              Scoreboard: Check the currently leading scorer.
                            </li>
                            <li className="mb-2">
                              Feedback: Send us your comments and
                              recommendations.
                            </li>
                          </ul>
                          <li>
                            <strong>
                              <i className="bi bi-chat-square-text-fill"></i>{" "}
                              Chatting with Notable Batangueños
                            </strong>
                          </li>
                          <ul>
                            <li>
                              Select NB: Click on a NB from the NB Selection
                              Panel
                            </li>
                            <li className="mb-2">
                              Start Chatting: Ask questions about the Notable
                              Batangueños' life.
                            </li>
                          </ul>
                          <li>
                            <strong>
                              <i className="bi bi-pencil-fill"></i> Assessment
                            </strong>
                          </li>
                          <ul>
                            <li>Direction: Select the correct answer.</li>
                            <li className="mb-2">
                              Reward Points: One Reward points is given for each
                              correct answer.
                            </li>
                          </ul>
                          <li>
                            <strong className="text-danger">
                              <i className="bi bi-exclamation-triangle-fill"></i>{" "}
                              Attention
                            </strong>
                          </li>
                          <ul>
                            <li className="text-danger">
                              This is only an AI-driven chatbot it does not
                              represent the Notable Batangueños point of view.
                            </li>
                          </ul>
                        </ul>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={handleClosePopup}
                        >
                          Got it!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="modal modal-overlay" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Error</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={handleError}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Something went wrong please try again!</p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn-primary" onClick={handleError}>
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
