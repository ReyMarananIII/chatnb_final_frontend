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
  const [showError, setShowError] = useState(false); // State for displaying modal
  const [nb, setNB] = useState({
    name: "",
    information: "",
    voiceID: "",
    image: "",
    model: "",
    bgImage: "",
    reference: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setMessage, visitorID } = UseHooks();

  // To track messages
  // The content needs nb information for creating AI
  const [allMessages, setAllMessages] = useState([
    {
      role: "system",
      content: "", // nb information needed for question and answering data
    },
  ]);

  // For chatnb information
  const addNBInfo = (role, information, name) => {
    // To tell the pretrained model how  to response
    const nbInformation = `Ito ang mga pamantayan mo sa pagsasagot:

  Magpanggap kang ikaw si ${name}. Ang user ay tatanungin ka bilang si ${name}. Dapat ang iyong sagot ay parang ikaw si ${name}. 
  Kapag ang tanong sayo ay wala sa mga detalye na babangitin mamaya, dapat ang sagot mo ay "Paumanhin, wala akong masasabi."
  Huwag na huwag kang magbibigay ng inpormasyon o sasagot ng wala sa mga detalye na babangitin mamaya.
  Ang sagot mo sa mga tanong sayo ay dapat sobrang maikli lamang, direkta sa punto at hindi hihigit sa isang pangungusap.
  Ang mga pamantayang ito ay dapat masunod.
  
  Mga Detalye:\n
  ${information}
  `;

    setAllMessages((prevItems) =>
      prevItems.map((item) =>
        item.role === role
          ? {
              ...item,
              content: nbInformation,
            }
          : item
      )
    );
  };

  const handleError = () => {
    setShowError(!showError); // Close the modal
    navigate(`/dashboard/${visitorID}`); // Navigate to dashboard
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/visitor/nb/" + nbID)
      .then((result) => {
        setNB({
          ...nb,
          name: result.data.Result[0].name,
          information: result.data.Result[0].information,
          voiceID: result.data.Result[0].voiceID,
          image: result.data.Result[0].image,
          model: result.data.Result[0].model,
          bgImage: result.data.Result[0].bgImage,
          reference: result.data.Result[0].reference,
        });
        addNBInfo(
          "system",
          result.data.Result[0].information,
          result.data.Result[0].name
        ); // For chat database
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
  }, []);

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
          <div className="w-100 h-100">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 26 }}>
              <Experience nb={nb} />
            </Canvas>
          </div>
          <div className="chat-auth-inner pl-2 bg-white">
            <form onSubmit={handleSubmit}>
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
              </div>

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
              <div className="d-grid">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top ">
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
                <h5 className="modal-title">Error</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleError}
                ></button>
              </div>
              <div className="modal-body">
                <p>Something went wrong please try again!</p>
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
