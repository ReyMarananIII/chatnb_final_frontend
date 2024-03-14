import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditNB = () => {
  const { nbID } = useParams();
  const [nb, setNB] = useState({
    name: "",
    information: "",
    voiceID: "",
  });
  const [voice, setVoice] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/voice")
      .then((result) => {
        if (result.data.Status) {
          setVoice(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/admin/nb/" + nbID)
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
    axios
      .put("http://localhost:3000/admin/edit_nb/" + nbID, nb)
      .then((result) => {
        if (result.data.Status) {
          navigate("/admin_dashboard");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Notable Batangaueños</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={nb.name}
              onChange={(e) => setNB({ ...nb, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputInformation" className="form-label">
              Information
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputInformation"
              placeholder="Enter Information"
              value={nb.information}
              onChange={(e) => setNB({ ...nb, information: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label for="voice" className="form-label">
              Voice
            </label>
            <select
              name="voice"
              id="voice"
              className="form-select"
              value={nb.voiceID}
              onChange={(e) => setNB({ ...nb, voiceID: e.target.value })}
            >
              {voice.map((c) => {
                return <option value={c.voiceID}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn admin-button w-100">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNB;
