import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../utils/style.css";

const NBList = () => {
  const [nb, setNB] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/visitor/nb")
      .then((result) => {
        if (result.data.Status) {
          setNB(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="chat-head-grid">
      {nb.map((e) => (
        <div className="chat-head" key={e.nbID}>
          <Link to={`/dashboard/chat_nb/${e.nbID}`}>
            <img src={`http://localhost:3000/Images/${e.image}`} />
          </Link>
          <span className="name">{e.name}</span>
        </div>
      ))}
    </div>
  );
};

export default NBList;
