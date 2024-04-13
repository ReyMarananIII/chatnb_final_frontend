import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import pegasusLogo from "../../assets/images/pegasus1.png";
import CHATNB from "../../assets/images/AdminNB.png";
import "../utils/style.css";

const AdminAboutUs = () => {
  return (
    <div className="container-fluid standard-admin-background h-100">
      <nav className="Header-login navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand fs-2 text-white">
            <img src={CHATNB} alt="" />
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ul-link">
              <Link className="nav-link text-white ms-4" to={"/admin"}>
                Home
              </Link>
              <Link className="nav-link text-white" to={"/AdminAboutUs"}>
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="d-flex flex-sm-col justify-content-between align-items-center">
        <div className="auth-inner-aboutus card bg-white text-black ms-5">
          <div className="container-fluid">
            <h1 className="ChatNB text-center fw-bold">About Us</h1>
            <p className="text-align-justify">
              Pegasus group has developed a web-based application for the Thesis
              Project Defense of the College of Information Technology and
              Communication at University of Batangas. The system is accessible
              through any forms of technology that has an internet connection
              and allows panelists and advisers to evaluate the graduating
              students and their Thesis/Capstone Projects through an innovative
              way of grading. The system was developed using Agile Development
              Methodology to simplify the software development scheme of the
              system. The system was evaluated based on ISO 9126 standard which
              showed that the criteria on efficiency ranked as the highest,
              followed by the functionality and maintainability, criteria for
              portability and lastly criteria for the reliability and usability
              of the system ranks as the lowest. The result of the evaluation of
              Online Thesis/ Capstone Project Defense Evaluation System showed
              that the developed system achieved its functional requirements in
              applying the modern way of evaluating through on-line.
            </p>
          </div>
        </div>
        <div className="w-50 h-50  d-flex justify-content-center align-items-center">
          <img
            src={pegasusLogo}
            alt="ChatNB Logo"
            className="pegasus-logo img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAboutUs;
