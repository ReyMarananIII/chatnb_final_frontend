import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatNB = () => {
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
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">{nb.name}</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">
              Send
            </button>
          </div>
        </form>
        <p className="text-center">{response}</p>
      </div>
    </div>
  );
};

export default ChatNB;
