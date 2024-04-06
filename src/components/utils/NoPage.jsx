import React from "react";
import { Link } from "react-router-dom";
import BG from "../../assets/images/AboutUs-bg.png";

const NoPage = () => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h1 className="display-1 text-danger no-page-font">
            404 - Not Found
          </h1>
          <p className="lead no-page-font">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link to="/" className="btn btn-primary">
            Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
