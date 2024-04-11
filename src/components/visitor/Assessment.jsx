import axios from "axios";
import React, { useEffect, useState } from "react";
import { UseHooks } from "../../hooks/useHooks.jsx";
import { useNavigate } from "react-router-dom";
import quiz_bg from "../../assets/images/quiz_bg.png";
import nblistbg from "../../assets/images/nb-list_bg2.png";
import "../utils/style.css";

function Assessment() {
  const [questions, setQuestions] = useState([
    { assessmentID: "", choices: [], question: "" },
  ]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false); // State for displaying modal
  const [score, setScore] = useState(0); // State
  const { visitor, visitorID, setVisitor } = UseHooks();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/visitor/questions")
      .then((response) => {
        setQuestions(response.data);
        setAnswers(new Array(response.data.length).fill(null));
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleAnswerSelect = (questionIndex, choiceIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = choiceIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    questions.forEach((question, index) => {
      if (question.choices[answers[index]]?.isCorrectChoice) {
        score++;
      }
    });

    // To solve bug, The setvisitor does not update immediately
    const newVisitor = {
      ...visitor,
      rewardPoints: visitor.rewardPoints + score,
    };

    setScore(score); // Set the quiz score

    // To keep track of visitor
    setVisitor(newVisitor);

    axios
      .put(
        "http://localhost:3000/visitor/edit_visitor/" + visitorID,
        newVisitor
      )
      .then((result) => {
        if (result.data.Status) {
          setShowModal(true); // Show the modal
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePrev = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    navigate(`/dashboard/${visitorID}`); // Navigate to dashboard
  };

  return (
    <div
      style={{
        backgroundImage: `url(${nblistbg})`,
        backgroundSize: "cover",
        backgroundColor: "transparent",
        border: "none",
        height: "100vh",
      }}
    >
      <h2 className="quiz-font text-center assessment-text-visitor-background">
        Notable Batangauenos Assessment
      </h2>
      <div className="quiz-text d-flex flex-column justify-content-center align-items-center w-100 h-100">
        <div
          className="d-flex flex-column justify-content-center"
          style={{
            backgroundImage: `url(${quiz_bg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "158vh", // Adjust the width
            height: "69vh",
          }}
        >
          <div className="m-5 p-5">
            <h2 className="quiz-font">{questions[currentQuestion].question}</h2>
            <ul
              className="list-group-flush fs-4"
              style={{
                listStyleType: "none",
              }}
            >
              {questions[currentQuestion].choices.map((choice, index) => (
                <li key={index}>
                  <div className="form-check quiz-font">
                    <input
                      className="form-check-input "
                      type="radio"
                      id={`choice_${index}`}
                      name={`question_${currentQuestion}`}
                      value={index}
                      checked={answers[currentQuestion] === index}
                      onChange={() =>
                        handleAnswerSelect(currentQuestion, index)
                      }
                    />
                    <label
                      className="quiz-font form-check-label museum-label fs-3"
                      htmlFor={`choice_${index}`}
                    >
                      {choice.choice}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex gap-3">
              <button
                className={
                  currentQuestion === 0 ? "btn btn-disabled" : "btn btn-primary"
                }
                onClick={handlePrev}
                disabled={currentQuestion === 0}
              >
                Prev
              </button>
              <button
                className={
                  currentQuestion === questions.length - 1
                    ? "btn btn-disabled"
                    : "btn btn-primary"
                }
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
              >
                Next
              </button>
              <button
                className={
                  currentQuestion !== questions.length - 1
                    ? "btn btn-disabled"
                    : "btn btn-success"
                }
                onClick={handleSubmit}
                disabled={currentQuestion !== questions.length - 1}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-overlay" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Congratulations!</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>You have earned {score} reward points in the quiz.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={closeModal}>
                  Return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Assessment;
