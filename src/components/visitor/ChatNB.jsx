import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChatNB = () => {
  const { nbID } = useParams();
  const [chat, setChat] = useState();
  const [nb, setNB] = useState({
    name: "",
    information: "",
    voiceID: "",
  });
  const navigate = useNavigate();

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
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(chat);
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
      </div>
    </div>
  );
};

export default ChatNB;
