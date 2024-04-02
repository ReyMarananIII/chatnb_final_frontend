import React, { useEffect, useState } from "react";
import axios from "axios";
import { UseHooks } from "../../hooks/useHooks";

const LeaderBoards = () => {
  const [rewardPoint, setRewardPoint] = useState([]);
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

  return (
    <div className="px-5 mt-3 mb-3">
      <div className="d-flex justify-content-center">
        <h4>Leaderboard</h4>
      </div>

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
              rewardPoint.map((e) =>
                e.visitorID === visitorID ? (
                  <tr key={e.rewardpointsID}>
                    <td className="border bg-info">{e.visitorID}</td>
                    <td className="border bg-info">{e.username}</td>
                    <td className="border bg-info">{e.totalPoints}</td>
                  </tr>
                ) : (
                  <tr key={e.rewardpointsID}>
                    <td className="border">{e.visitorID}</td>
                    <td className="border">{e.username}</td>
                    <td className="border">{e.totalPoints}</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoards;
