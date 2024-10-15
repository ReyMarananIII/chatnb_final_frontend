import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../utils/style.css";
import Chatheadbg from "../../assets/images/Chathead-bg.png";
import { UseHooks } from "../../hooks/useHooks";

const NBList = () => {
  const [nb, setNB] = useState([]);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false); // State for displaying modal
  const { visitorID } = UseHooks();

  useEffect(() => {
    axios
      .get("http://localhost:4000/visitor/nb")
      .then((result) => {
        if (result.data.Status) {
          setNB(result.data.Result);
        } else {
          console.log(result.data.Error);
          setShowError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
  }, []);

  const handleError = () => {
    setShowError(!showError); // Close the modal
    window.location.reload();
  };

  return (
    <>
      {!showError ? (
        <div
          className="d-flex flex-wrap"
          style={{
            justifyContent: nb.length <= 2 ? "center" : "start",
          }}
        >
          {nb.map((nb) => (
            <div
              className="chat-head mt-5 mb-3"
              key={nb.nbID}
              style={{ flex: "0 0 33.33%" }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/dashboard/chat_nb/${nb.nbID}`);
                }}
                className="btn btn-primary-outline"
                style={{
                  backgroundImage: `url(${Chatheadbg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "333px",
                  height: "333px",
                  border: 0,
                  boxShadow: "none",
                }}
              >
                <img src={`http://localhost:4000/Uploaded/${nb.image}`} />
              </button>
              <span className="name">{nb.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="modal modal-overlay" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Oops!</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleError}
                ></button>
              </div>
              <div className="modal-body">
                <p>Oops, Something went wrong. Please try again!</p>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" onClick={handleError}>
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NBList;
