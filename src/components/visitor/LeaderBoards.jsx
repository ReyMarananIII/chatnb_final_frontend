import React, { useEffect, useState } from "react";
import axios from "axios";
import { UseHooks } from "../../hooks/useHooks";
import "../utils/style.css";
import { useNavigate } from "react-router-dom";

const LeaderBoards = () => {
  const [rewardPoint, setRewardPoint] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { visitorID } = UseHooks();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false); // State for displaying modal

  const handleError = () => {
    setShowError(!showError); // Close the modal
    setShowModal(!showModal);
  };

  const getRewardPoints = () => {
    axios
      .get("http://localhost:3000/visitor/rewardPoints")
      .then((result) => {
        if (result.data.Status) {
          setRewardPoint(result.data.Result);
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

  const toggleModal = () => {
    getRewardPoints();
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="Leaderboard-container">
        <div className="Leaderboard_button" onClick={toggleModal}>
          <div className="icon">
            <i className="bi bi-list-columns-reverse fs-4"></i>
          </div>
          <span>Leaderboard</span>
        </div>
      </div>
      {!showError ? (
        <>
          {showModal && (
            <div className="modal modal-overlay" tabIndex="-1" role="dialog">
              <div
                className="modal-dialog"
                role="document"
                style={{
                  width: "500px",
                }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className=" modal-title">
                      <i className="bi bi-trophy-fill text-warning"></i>{" "}
                      Leaderboard
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={toggleModal}
                    ></button>
                  </div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="border">Ranking</th>
                        <th className="border">Username</th>
                        <th className="border">Reward Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rewardPoint.length === 0 ? (
                        <tr>
                          <td className="border"></td>
                          <td className="border text-center">
                            No Reward Points
                          </td>
                          <td className="border"></td>
                        </tr>
                      ) : (
                        rewardPoint
                          .sort((a, b) => b.totalPoints - a.totalPoints)
                          .map((e, index) =>
                            e.visitorID === visitorID ? (
                              <tr key={e.rewardpointsID}>
                                <td
                                  className="border"
                                  style={{
                                    color: "black",
                                    backgroundColor: "#c0b3a0",
                                  }}
                                >
                                  {index + 1}
                                </td>
                                <td
                                  className="border"
                                  style={{
                                    color: "black",
                                    backgroundColor: "#c0b3a0",
                                  }}
                                >
                                  {e.username}
                                </td>
                                <td
                                  className="border"
                                  style={{
                                    color: "black",
                                    backgroundColor: "#c0b3a0",
                                  }}
                                >
                                  {e.totalPoints}
                                </td>
                              </tr>
                            ) : (
                              <tr key={e.rewardpointsID}>
                                <td className="border">{index + 1}</td>
                                <td className="border">{e.username}</td>
                                <td className="border">{e.totalPoints}</td>
                              </tr>
                            )
                          )
                      )}
                    </tbody>
                  </table>
                  <div className="modal-footer">
                    <button className="btn-primary" onClick={toggleModal}>
                      Close
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
                <h5 className="modal-title">Oops!</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleError}
                ></button>
              </div>
              <div className="modal-body">
                <p>Oops, Something went wrong. Please try again!</p>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" onClick={handleError}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaderBoards;
