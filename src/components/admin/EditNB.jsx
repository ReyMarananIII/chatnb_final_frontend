import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditNB = () => {
  const { nbID } = useParams();
  const [nb, setNB] = useState({
    name: "",
    information: "",
    voiceID: "",
    image: "",
    model: "",
    bgImage: "",
  });
  const [voice, setVoice] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/nb/" + nbID)
      .then((result) => {
        setNB({
          ...nb,
          name: result.data.Result[0].name,
          information: result.data.Result[0].information,
          voiceID: result.data.Result[0].voiceID,
          image: result.data.Result[0].image,
          model: result.data.Result[0].model,
          bgImage: result.data.Result[0].bgImage,
        });
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
    formData.append("model", nb.model);
    formData.append("bgImage", nb.bgImage);
    axios
      .put("http://localhost:3000/admin/edit_nb/" + nbID, formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/admin_dashboard");
        } else {
          console.log(result.data.Error);
          alert("Please fill in all fields");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Please fill in all fields");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Notable Batangaueños</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
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
            <label htmlFor="inputInformation" className="form-label">
              Information
            </label>
            <textarea
              rows={11}
              type="text"
              className="form-control rounded-0"
              id="inputInformation"
              placeholder="Enter Information"
              value={nb.information}
              onChange={(e) => setNB({ ...nb, information: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputVoiceID" className="form-label">
              Voice ID
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputVoiceID"
              placeholder="Enter Voice ID"
              value={nb.voiceID}
              onChange={(e) => setNB({ ...nb, voiceID: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="inputGroupFile01">
              Add New Image
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
            <label className="form-label" htmlFor="inputGroupFile02">
              Add New Model
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile02"
              name="model"
              onChange={(e) => setNB({ ...nb, model: e.target.files[0] })}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile03">
              Add New Background Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile03"
              name="bgImage"
              onChange={(e) => setNB({ ...nb, bgImage: e.target.files[0] })}
            />
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
