import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../utils/style.css";
import sendIcon from "../../assets/images/send.png";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { UseHooks } from "../../hooks/useHooks.jsx";
import { Link } from "react-router-dom";

const ChatNB = () => {
  const { nbID } = useParams();
  const [chat, setChat] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    setMessage,
    visitorID,
    showSubtitle,
    setShowSubtitle,
    nb,
    getNB,
    showError,
    setShowError,
    allMessages,
    setAllMessages,
  } = UseHooks();

  useEffect(() => {
    // To delete message history
    setMessage("");
    setAllMessages([
      {
        role: "system",
        content: "", // nb information needed for question and answering data
      },
    ]);
    // To get NB details
    getNB(nbID);
  }, []);

  const handleError = () => {
    setShowError(!showError); // Close the modal
    navigate(`/dashboard/${visitorID}`); // Navigate to dashboard
  };

  useEffect(() => {
    const subtitle = localStorage.getItem("showSubtitle");
    if (subtitle != null) {
      if (subtitle === "true") {
        setShowSubtitle(true);
      } else {
        // If the value is not in localStorage, default to false
        setShowSubtitle(false);
      }
    }
  }, []);

  const handleClickSubtitle = () => {
    setShowSubtitle(!showSubtitle);
    // Update localStorage whenever showSubtitle changes
    const subtitle = !showSubtitle;
    if (subtitle) {
      localStorage.setItem("showSubtitle", "true");
    } else {
      localStorage.setItem("showSubtitle", "false");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedAllMessages = [
      ...allMessages,
      { role: "user", content: chat },
    ];
    axios
      .post("http://localhost:3000/visitor/chat_nb", {
        prompt: updatedAllMessages,
        nb: nb,
        visitorID: visitorID,
        chat: chat,
      })
      .then((res) => {
        setAllMessages([
          ...updatedAllMessages,
          { role: "assistant", content: res.data.message },
        ]);
        setMessage(res.data);
        setLoading(false);
        setChat("");
      })
      .catch((err) => {
        setChat("");
        setLoading(false);
        console.log(err);
        setShowError(true);
      });
  };

  // To preserve the format of the reference
  const reference = nb.reference
    .split("\n")
    .map((line, index) => <p key={index}>{line}</p>);

  return (
    <>
      {!showError ? (
        <div
          className="d-flex flex-col justify-content-between align-items-center"
          style={{
            backgroundImage: `url(http://localhost:3000/Uploaded/${nb.bgImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div className="w-100 h-100 px-2">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 25 }}>
              <Experience />
            </Canvas>
          </div>
          <div className="chat-auth-inner bg-white">
            <form onSubmit={handleSubmit} className="w-100 h-100">
              <div className="d-flex flex-column justify-content-center w-100 h-100 p-4 py-5 gap-2">
                <div className="d-flex flex-row">
                  <h2 className="Text1">{nb.name}</h2>
                  <div className="reference-tooltip">
                    <span className="tooltip-text p-3">
                      <i className="bi bi-info-circle-fill fs-3"></i>
                    </span>
                    <div className="tooltip-content">
                      <p className="text-center">Reference</p>
                      {nb.reference.length === 0 ? (
                        <p>No reference</p>
                      ) : (
                        <>{reference}</>
                      )}
                    </div>
                  </div>
                  <div className="subtitle-tooltip">
                    <span
                      className="subtitle-tooltip-text"
                      onClick={handleClickSubtitle}
                    >
                      {!showSubtitle ? (
                        <i className="bi bi-credit-card-2-front fs-3"></i>
                      ) : (
                        <i className="bi bi-credit-card-2-front-fill fs-3"></i>
                      )}
                    </span>
                    <div className="subtitle-tooltip-content">
                      <p className="text-center">Subtitle</p>
                      <p className="text-center">
                        Click to{" "}
                        {!showSubtitle ? "show subtitle" : "hide subtitle"}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="Text1">Ask me a question</h5>
                  <div className="messenger-input-container">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        autoComplete="off"
                        className="form-control-chat"
                        disabled={loading}
                        id="inputName"
                        placeholder="Type something . . ."
                        value={chat}
                        onChange={(e) => setChat(e.target.value)}
                      />
                    </div>
                    {loading ? (
                      <div className="spinner-grow text-white mx-1">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="send-button"
                        disabled={loading}
                      >
                        <img src={sendIcon} alt="" width={25} height={25} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <nav className="navbar navbar-expand-lg navbar-light position-absolute top-0 start-0">
                  <div className="container">
                    <div
                      className="collapse navbar-collapse"
                      id="navbarTogglerDemo02"
                    >
                      <ul className="navbar-nav gap-2">
                        <li className="nav-item button-80" role="button">
                          <Link
                            className="nav-link text-white"
                            to={`/dashboard/${visitorID}`}
                          >
                            Return
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </form>
          </div>
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

export default ChatNB;
