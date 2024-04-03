import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseHooks } from "../../hooks/useHooks.jsx";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const { visitorID } = UseHooks();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      alert("Please provide your feedback");
      return;
    }
    
    axios
      .post("http://localhost:3000/visitor/feedback", { visitorID, feedback })
      .then((result) => {
        if (result.data.Status) {
          setShowModal(true);
          setShowForm(false); // Show the modal
          setFeedback(""); // Reset the feedback text area
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="feedback-container">
      {showForm && (
        <div className="feedback-form">
          <div className="row">
            <h4 className="text-center col-11">Feedback</h4>
            <button type="button" class="btn-close col me-2" aria-label="Close" onClick={toggleForm}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputFeedback">Please provide your feedback here:</label>
              <textarea
                rows={5}
                className="form-control"
                id="inputFeedback"
                placeholder="Enter Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      )}

      {showModal && (
        <div class="modal modal-overlay" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Feedback Sent</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Your feedback has been successfully sent!</p>
            </div>
            <div class="modal-footer">
            <button className="btn btn-primary" onClick={closeModal}>
              Close
            </button>
            </div>
          </div>
        </div>
      </div>
      )}

      <div className="feedback_button" onClick={toggleForm}>
        <div className="icon">
          <i className="bi bi-chat-dots-fill fs-3"></i>
        </div>
        <span>Feedback</span>
      </div>
    </div>
  );
};

export default Feedback;
