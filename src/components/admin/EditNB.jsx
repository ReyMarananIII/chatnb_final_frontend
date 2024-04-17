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
    reference: "",
  });
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const handleError = () => {
    setShowError(!showError); // Close the modal
  };

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
          reference: result.data.Result[0].reference,
        });
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
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
    formData.append("reference", nb.reference);
    axios
      .put("http://localhost:3000/admin/edit_nb/" + nbID, formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/admin_dashboard");
        } else {
          console.log(result.data.Error);
          setShowError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
        <div className="p-3 rounded w-50 border">
          <h3 className="text-center">Edit Notable Batangueños</h3>
          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputName"
                required
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
                required
                className="form-control rounded-0"
                id="inputInformation"
                placeholder="Enter Information"
                value={nb.information}
                onChange={(e) => setNB({ ...nb, information: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputReference" className="form-label">
                Reference
              </label>
              <textarea
                rows={7}
                type="text"
                value={nb.reference}
                className="form-control rounded-0"
                id="inputReference"
                placeholder="Enter Reference"
                onChange={(e) => setNB({ ...nb, reference: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputVoiceID" className="form-label">
                Voice ID
              </label>
              <div className="addNB-tooltip">
                <span className="addNB-tooltip-text p-2">
                  <i className="bi bi-info-circle-fill fs-5"></i>
                </span>
                <div className="addNB-tooltip-content">
                  <h6>
                    To create or get your Voice ID in Elevenlabs , follow these
                    steps:
                  </h6>
                  <ol>
                    <li>
                      Open{" "}
                      <a href="https://elevenlabs.io/" target="_blank">
                        Elevenlabs
                      </a>
                    </li>
                    <li>Go to the Voices section in your account settings.</li>
                    <li>Click on "Add Generative or Cloned Voice"</li>
                    <li>
                      Follow the on-screen instructions to record your voice.
                    </li>
                    <li>
                      Once created, you can get your Voice ID by clicking on
                      "ID".
                    </li>
                  </ol>
                </div>
              </div>
              <input
                type="text"
                required
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
                accept=".png, .jpeg, .jpg"
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
              <div className="addNB-tooltip">
                <span className="addNB-tooltip-text p-2">
                  <i className="bi bi-info-circle-fill fs-5"></i>
                </span>
                <div className="addNB-tooltip-content">
                  <h6>
                    To create your avatar in Ready Player Me, follow these
                    steps:
                  </h6>
                  <ol>
                    <li>
                      Open{" "}
                      <a href="https://readyplayer.me/" target="_blank">
                        Ready Player Me
                      </a>
                    </li>
                    <li>
                      Click on "Try our Avatar Creator" to start the creation
                      process.
                    </li>
                    <li>
                      Follow the on-screen instructions to customize your
                      avatar's appearance.
                    </li>
                    <li>
                      Once you're happy with your avatar, click on "Save" or
                      "Finish" to complete the process.
                    </li>
                    <li>
                      Click <i className="bi bi-box-arrow-down"></i> button on
                      the left side of claim avatar button and copy link
                    </li>
                    <li>
                      Open new tab and paste the link and add
                      "?morphTargets=ARKit,Oculus Visemes" to the link and press
                      enter
                    </li>
                  </ol>
                </div>
              </div>
              <input
                type="file"
                accept=".glb"
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
                accept=".png, .jpeg, .jpg"
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
      {showError && (
        <div className="modal modal-overlay" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Oops!</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleError}
                ></button>
              </div>
              <div className="modal-body">
                <p>Oops, Something went wrong. Please try again!</p>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" onClick={handleError}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditNB;
