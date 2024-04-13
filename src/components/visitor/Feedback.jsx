import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseHooks } from "../../hooks/useHooks.jsx";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { visitorID } = UseHooks();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setModalMessage("Please provide your feedback");
      setShowModal(true);
      return;
    }

    axios
      .post("http://localhost:3000/visitor/feedback", { visitorID, feedback })
      .then((result) => {
        if (result.data.Status) {
          setModalMessage("Your feedback has been successfully sent!");
          setShowModal(true);
          setShowForm(false); // Show the modal
          setFeedback(""); // Reset the feedback text area
        } else {
          console.log(result.data.Error);
          setModalMessage("Please try agiain!");
          setShowModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setModalMessage("Please try agiain!");
        setShowModal(true);
      });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="feedback-container">
        <div className="feedback_button" onClick={toggleForm}>
          <div className="icon">
            <i className="bi bi-chat-dots fs-3"></i>
          </div>
          <span>Feedback</span>
        </div>
      </div>
      {showForm && (
        <div className="feedback-form">
          <div className="row">
            <h4 className="text-center col-11">Feedback</h4>
            <button
              type="button"
              className="btn-close col me-2"
              aria-label="Close"
              onClick={toggleForm}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputFeedback">
                Please provide your feedback here:
              </label>
              <textarea
                rows={11}
                className="form-control mt-1"
                id="inputFeedback"
                placeholder="Enter Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">
              Send
            </button>
          </form>
        </div>
      )}

      {showModal && (
        <div className="modal modal-overlay" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Feedback</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
