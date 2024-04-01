import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [deleteID, setDeleteID] = useState(null); // State to store the ID of the item to delete
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage the visibility of the confirmation popup

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/feedback")
      .then((result) => {
        if (result.data.Status) {
          setFeedback(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to handle the deletion confirmation
  const handleDeleteConfirmation = (id) => {
    setDeleteID(id);
    setShowConfirmation(true);
  };

  // Function to delete the item
  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/admin/delete_feedback/" + deleteID)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
    setShowConfirmation(false); // Close the confirmation popup after deletion
  };

  return (
    <div className="px-5 mt-3 mb-3">
      <div className="d-flex justify-content-center">
        <h4>Feedback</h4>
      </div>

      <div className="mt-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="border">Visitor ID</th>
              <th className="border">Feedback</th>
              <th className="border">Action</th>
            </tr>
          </thead>
          <tbody>
            {feedback.length === 0 ? (
              <tr>
                <td className="border"></td>
                <td className="border text-center">No Feedback</td>
                <td className="border"></td>
              </tr>
            ) : (
              feedback.map((e) => (
                <tr key={e.feedbackID}>
                  <td className="border">{e.visitorID}</td>
                  <td className="border">{e.feedback}</td>
                  <td className="border">
                    <button
                      className="btn btn-danger btn-sm my-2"
                      onClick={() => handleDeleteConfirmation(e.feedbackID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="pop-up-overlay d-flex justify-content-center align-items-center">
          <div className="confirmation-popup">
            <h3 className="fw-semibold">Confirm Delete</h3>
            <p>Are you sure you want to delete?</p>
            <div className="pop-up-btns d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-danger " onClick={handleDelete}>
                Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFeedback;
