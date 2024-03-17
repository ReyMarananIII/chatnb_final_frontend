import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NB = () => {
  const [nb, setNB] = useState([]);
  const [deleteID, setDeleteID] = useState(null); // State to store the ID of the item to delete
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage the visibility of the confirmation popup
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/nb")
      .then((result) => {
        if (result.data.Status) {
          setNB(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to handle the deletion confirmation
  const handleDeleteConfirmation = (nbID) => {
    setDeleteID(nbID);
    setShowConfirmation(true);
  };

  // Function to delete the item
  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/admin/delete_nb/" + deleteID)
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
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h4>Notable Batangaueños List</h4>
      </div>
      <Link to="/admin_dashboard/add_nb" className="btn admin-button">
        Add Notable Batangaueños
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Information</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {nb.map((e) => (
              <tr key={e.nbID}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="nb_image"
                    alt={e.name}
                  />
                </td>
                <td>{e.information}</td>
                <td>
                  <Link
                    to={`/admin_dashboard/edit_nb/` + e.nbID}
                    className="btn admin-button btn-sm me-2 my-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm my-2"
                    onClick={() => handleDeleteConfirmation(e.nbID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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
                
                <button className="btn btn-danger " onClick={handleDelete}>Save</button>
                <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default NB;
