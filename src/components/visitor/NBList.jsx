import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Notable Batangaueños List</h3>
      </div>
      <Link to="/admin_dashboard/add_nb" className="btn btn-success">
        Notable Batangaueños
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>information</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {nb.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="nb_image"
                  />
                </td>
                <td>{e.information}</td>
                <td>
                  <Link
                    to={`/dashboard/chat_nb/` + e.nbID}
                    className="btn btn-success btn-sm me-2"
                  >
                    Chat
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NBList;
