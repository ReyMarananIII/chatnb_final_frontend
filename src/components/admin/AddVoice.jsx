import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVoice = () => {
  const [voice, setVoice] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/admin/add_voice", { voice })
      .then((result) => {
        if (result.data.Status) {
          navigate("/admin_dashboard/voice");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-25 border">
        <h2>Add Voice</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="voice">
              <strong>Vioce:</strong>
            </label>
            <input
              type="text"
              name="voice"
              placeholder="Enter Voice"
              onChange={(e) => setVoice(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Add Voice
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVoice;
