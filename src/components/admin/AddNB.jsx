import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNB = () => {
  const [nb, setNB] = useState({
    name: "",
    information: "",
    voiceID: "",
    image: "",
    model: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(nb);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nb.name);
    formData.append("information", nb.information);
    formData.append("voiceID", nb.voiceID);
    formData.append("image", nb.image);
    formData.append("model", nb.model);

    axios
      .post("http://localhost:3000/admin/add_nb", formData)
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
    <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
      <div className="p-3 rounded w-50 border">
        <h4 className="text-center">Add Notable Batangaueños</h4>
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
              onChange={(e) => setNB({ ...nb, voiceID: e.target.value })}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
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
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile02">
              Select Model
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile02"
              name="model"
              onChange={(e) => setNB({ ...nb, model: e.target.files[0] })}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn admin-button w-100">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNB;
