import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewLeaderboards = () => {
  const [rewardPoint, setRewardPoint] = useState([]);

  const [showError, setShowError] = useState(false);

  const handleError = () => {
    setShowError(!showError); // Close the modal
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/rewardPoints")
      .then((result) => {
        if (result.data.Status) {
          setRewardPoint(result.data.Result);
        } else {
          setShowError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
  }, []);

  return (
    <>
      <div className="px-5 mt-3 mb-3">
        <div className="mt-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="border">Visitor ID</th>
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
                rewardPoint.map((e) => (
                  <tr key={e.rewardpointsID}>
                    <td className="border">{e.visitorID}</td>
                    <td className="border">{e.username}</td>
                    <td className="border">{e.totalPoints}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showError && (
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

export default ViewLeaderboards;
