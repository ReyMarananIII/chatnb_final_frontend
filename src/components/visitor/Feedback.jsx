import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseHooks } from "../../hooks/useHooks.jsx";

const Feedback = () => {
  const [feedback, setFeedback] = useState();
  const { visitorID } = UseHooks();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(visitorID);

    axios
      .post("http://localhost:3000/visitor/feedback", { visitorID, feedback })
      .then((result) => {
        if (result.data.Status) {
          navigate(`/dashboard/${visitorID}`);
        } else {
          console.log(result.data.Error);
          alert("Please fill in all fields");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Please fill in all fields");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
      <div className="p-3 rounded w-50 border">
        <h4 className="text-center">Feedback</h4>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputFeedback" className="form-label">
              Please provide your feedback here:
            </label>
            <textarea
              rows={11}
              type="text"
              className="form-control rounded-0"
              id="inputFeedback"
              placeholder="Enter Feedback"
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn admin-button w-100">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
