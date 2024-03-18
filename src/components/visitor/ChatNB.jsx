import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../utils/style.css";
import sendIcon from "../../assets/images/send.png";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { useHooks } from "../../hooks/useHooks.jsx";

const ChatNB = () => {
  const { nbID } = useParams();
  const [chat, setChat] = useState("");
  const [nb, setNB] = useState({
    name: "",
    information: "",
    voiceID: "",
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const { setMessage } = useHooks();

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
  Ang mga sagot mo ay dapat nakabatay lamang sa mga detalye na babangitin mamaya. Kapag ang tanong sayo ay wala sa mga detalye, dapat ang sagot mo ay wala kang masabi tungkol doon.
  Ang sagot mo sa mga tanong sayo ay dapat hindi hihigit sa tatlong pangungusap.
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/visitor/nb/" + nbID)
      .then((result) => {
        setNB({
          ...nb,
          name: result.data.Result[0].name,
          information: result.data.Result[0].information,
          voiceID: result.data.Result[0].voiceID,
        });
        addNBInfo(
          "system",
          result.data.Result[0].information,
          result.data.Result[0].name
        ); // For chat database
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    const updatedAllMessages = [
      ...allMessages,
      { role: "user", content: chat },
    ];
    axios
      .post("http://localhost:3000/visitor/chat_nb", {
        prompt: updatedAllMessages,
      })
      .then((res) => {
        setResponse(res.data);
        setAllMessages([
          ...updatedAllMessages,
          { role: "assistant", content: res.data.message },
        ]);
        setMessage(res.data);
        setLoading(false);
      })

      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Something wrong please try again later!");
      });
  };

  return (
    <div className="chat-UI d-flex flex-col justify-content-between h-100 w-100 align-items-center">
      <div className="w-100 h-100">
        <Canvas shadows camera={{ position: [1, 0, 1], fov: 7 }}>
          <Experience />
        </Canvas>
      </div>
      <div className="chat-auth-inner pl-2">
        <form onSubmit={handleSubmit}>
          <h2 className=" Text1">{nb.name}</h2>
          <h5 className="Text1">Ask me a question</h5>
          <div className="messenger-input-container">
            <div className="input-wrapper">
              <input
                type="text"
                autoComplete="off"
                className="form-control-chat"
                id="inputName"
                placeholder="Type something . . ."
                value={chat}
                onChange={(e) => setChat(e.target.value)}
              />
            </div>
            {loading ? (
              <div className="spinner-grow text-dark pl-5">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button type="submit" className="send-button">
                <img src={sendIcon} alt="" width={25} height={25} />
              </button>
            )}
          </div>
          <div className="d-grid"></div>
        </form>
      </div>
    </div>
  );
};

export default ChatNB;
