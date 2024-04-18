import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import pegasusLogo from "../../assets/images/pegasus1.png";
import CHATNB from "../../assets/images/ChatNB2.png";
import nblistbg from "../../assets/images/nb-list_bg2.png";

import "../utils/style.css";

const AboutUs = () => {
  const location = useLocation();

  return (
    <div
      className="container-fluid p-0 position-relative overflow-hidden"
      style={{
        backgroundImage: `url(${nblistbg})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <nav className="Header-login navbar navbar-expand-lg navbar-light position-absolute">
        <div className="container">
          <div className="container d-flex align-items-center justify-content-between">
            <a
              className="navbar-brand fs-2 text-white d-flex align-items-center"
              style={{ marginRight: "auto" }}
            >
              {" "}
              <img src={CHATNB} alt="" style={{ height: "25px" }} />
            </a>
            <div className="navbar-nav ul-link d-lg-flex align-items-center">
              <Link
                className="nav-link ms-lg-4"
                to={"/"}
                style={{
                  color: location.pathname === "/" ? "#604c3c" : "white",
                }}
              >
                Home
              </Link>
              <Link
                className="nav-link"
                to={"/aboutUs"}
                style={{
                  color: location.pathname === "/aboutUs" ? "#604c3c" : "white",
                }}
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="auth-inner-aboutus card bg-white text-black ms-5">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between pb-3">
              <h1 className="ChatNB text-center fw-bold">About Us</h1>
              <img
                src={pegasusLogo}
                alt="ChatNB Logo"
                style={{ height: "100px" }}
              />
            </div>

            <p
              className="text-align-justify"
              style={{
                fontSize:
                  "calc(12px + (16 - 12) * ((100vw - 300px) / (1600 - 300)))",
              }}
            >
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
      </div>
    </div>
  );
};

export default AboutUs;
