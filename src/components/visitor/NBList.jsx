import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../utils/style.css";
import { useHooks } from "../../hooks/useHooks";

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
      {nb.map((nb) => (
        <div className="chat-head" key={nb.nbID}>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/dashboard/chat_nb/${nb.nbID}`);
            }}
            className="btn btn-primary-outline"
          >
            <img src={`http://localhost:3000/Uploaded/${nb.image}`} />
          </button>
          <span className="name">{nb.name}</span>
        </div>
      ))}
    </div>
  );
};

export default NBList;
