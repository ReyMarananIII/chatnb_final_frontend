import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNB = () => {
  const [nb, setNB] = useState({
    name: "",
    information: "",
    voiceID: "",
    image: "",
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nb.name);
    formData.append("information", nb.information);
    formData.append("voiceID", nb.voiceID);
    formData.append("image", nb.image);

    axios
      .post("http://localhost:3000/admin/add_nb", formData)
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
        <h3 className="text-center">Add Notable Batangaueños</h3>
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
              onChange={(e) => setNB({ ...nb, voiceID: e.target.value })}
            >
              {voice.map((c) => {
                return <option value={c.voiceID}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setNB({ ...nb, image: e.target.files[0] })}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">
              Add Notable Batangaueños
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNB;
