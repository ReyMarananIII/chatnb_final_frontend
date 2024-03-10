import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import pegasusLogo from "../../assets/images/pegasus.png";

const AboutUs = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/AboutUs"}>
                  About us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container containerStyle">
        <div className="title text-left">
          <h1 className="text-uppercase my-5">About Us</h1>
        </div>
        <div className="card mb-3">
          <div className="row">
            <div className="col-md-4">
              <img src={pegasusLogo} alt="" width={400} height={400} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">Thesis Group</h3>
                <p className="text-align-justify textBackgroundStyle">
                  Pegasus group has developed a web-based application for the
                  Thesis Project Defense of the College of Information
                  Technology and Communication at the University of Batangas.
                  The system is accessible through any forms of technology that
                  has an internet connection and allows panelists and advisers
                  to evaluate the graduating students and their Thesis/Capstone
                  Projects through an innovative way of grading. The system was
                  developed using Agile Development Methodology to simplify the
                  software development scheme of the system. The system was
                  evaluated based on ISO 9126 standard which showed that the
                  criteria on efficiency ranked as the highest, followed by the
                  functionality and maintainability, criteria for portability
                  and lastly criteria for the reliability and usability of the
                  system ranks as the lowest. The result of the evaluation of
                  Online Thesis/ Capstone Project Defense Evaluation System
                  showed that the developed system achieved its functional
                  requirements in applying the modern way of evaluating through
                  online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
