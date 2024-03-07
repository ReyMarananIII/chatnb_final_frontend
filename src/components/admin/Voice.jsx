import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Voice = () => {
  const [voice, setVoice] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/voice")
      .then((result) => {
        if (result.data.Status) {
          setVoice(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Voice List</h3>
      </div>
      <Link to="/admin_dashboard/add_voice" className="btn btn-success">
        Add Voice
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {voice.map((c) => (
              <tr>
                <td>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Voice;
