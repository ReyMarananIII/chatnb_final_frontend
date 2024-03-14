import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../utils/style.css";
import sendIcon from "../../assets/images/send.png";

const ChatNB = () => {
  const navigate = useNavigate();
  const { nbID } = useParams();
  const [chat, setChat] = useState();
  const [nb, setNB] = useState({
    name: "",
    information: "",
    voiceID: "",
  });
  const [response, setResponse] = useState("");

  // To track messages
  // The content needs nb information for creating AI
  const [allMessages, setAllMessages] = useState([
    {
      role: "system",
      content: "", // nb information needed for question and answering data
    },
  ]);

  // For chatnb information
  const addNBInfo = (role, information) => {
    setAllMessages((prevItems) =>
      prevItems.map((item) =>
        item.role === role ? { ...item, content: information } : item
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
        addNBInfo("system", result.data.Result[0].information); // For chat database
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

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
          { role: "assistant", content: res.data },
        ]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="chat-UI">
      <div>
        <div className="chat-auth-inner">
          <form onSubmit={handleSubmit}>
            <h2 className=" Text1">{nb.name}</h2>

            <h5 className="Text1">Ask me a question</h5>
            <div class="messenger-input-container">
              <div class="input-wrapper">
                <input
                  type="text"
                  className="form-control-chat"
                  id="inputName"
                  placeholder="Type something . . ."
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                />
              </div>
              <button type="submit" class="send-button">
                <img src={sendIcon} alt="" width={25} height={25} />
              </button>
            </div>
            <div className="d-grid"></div>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center py-5">
        {response ? (
          <p className="bg-dark text-white px-1">Response: {response}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ChatNB;
