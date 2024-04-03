import React, { useEffect, useState } from "react";
import axios from "axios";
import { UseHooks } from "../../hooks/useHooks";

const LeaderBoards = () => {
  const [rewardPoint, setRewardPoint] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { visitorID } = UseHooks();

  useEffect(() => {
    axios
      .get("http://localhost:3000/visitor/rewardPoints")
      .then((result) => {
        if (result.data.Status) {
          setRewardPoint(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="Leaderboard-container">
      <div className="Leaderboard_button" onClick={toggleModal}>
        <div className="icon" >
        <i className="bi bi-list-columns-reverse fs-4"></i>
        </div>
        <span>Leaderboard</span>
      </div>
      
      {showModal && (
          <div class="modal modal-overlay" tabindex="-1">
          <div class="modal-dialog" style={{
            width:'500px',
            height:'80vh'

          }}>
            <div class="modal-content">
              <div class="modal-header">
              <h4 className=" modal-title"><i class="bi bi-trophy-fill"></i> Leaderboard</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggleModal}></button>
              </div>
            <table className="table table-hover">
              <thead>
                <tr >
                  <th className="border">Ranking</th>
                  <th className="border">Username</th>
                  <th className="border">Reward Points</th>
                </tr>
              </thead>
              <tbody>
                {rewardPoint.length === 0 ? (
                  <tr>
                    <td className="border"></td>
                    <td className="border text-center">No Reward Points</td>
                    <td className="border"></td>
                  </tr>
                ) : (
                  rewardPoint
                  .sort((a, b) => b.totalPoints - a.totalPoints)
                  .map((e, index) =>
                    e.visitorID === visitorID ? (
                      <tr key={e.rewardpointsID}>
                        <td className="border bg-info">{index + 1}</td>
                        <td className="border bg-info">{e.username}</td>
                        <td className="border bg-info">{e.totalPoints}</td>
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
            <button className="btn btn-primary" onClick={toggleModal}>
              Close
            </button>
            </div>

            </div>
          </div>
          </div>
      )}
    </div>
  );
};

export default LeaderBoards;