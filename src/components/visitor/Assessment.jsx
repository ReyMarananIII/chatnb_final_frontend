import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHooks } from "../../hooks/useHooks";
import { useNavigate, useParams } from "react-router-dom";

function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { visitor } = useHooks();
  const { visitorID } = useParams();
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
      if (question.choices[answers[index]].isCorrectChoice) {
        score++;
      }
    });

    const newVisitor = {
      ...visitor,
      rewardPoints: visitor.rewardPoints + score,
    };

    axios
      .put(
        "http://localhost:3000/visitor/edit_visitor/" + visitorID,
        newVisitor
      )
      .then((result) => {
        if (result.data.Status) {
          navigate(`/dashboard/${visitorID}`);
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

  return (
    <div className="container-fluid museum-bg p-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card museum-card shadow-lg">
            <div className="card-body">
              <h1 className="museum-header">Historical Quiz for Heroes</h1>
              {questions.length > 0 ? (
                <>
                  <h2 className="card-title mt-4">
                    {questions[currentQuestion].question}
                  </h2>
                  <ul className="list-group list-group-flush mt-4">
                    {questions[currentQuestion].choices.map((choice, index) => (
                      <li key={index} className="list-group-item museum-item">
                        <div className="form-check">
                          <input
                            className="form-check-input"
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
                            className="form-check-label museum-label"
                            htmlFor={`choice_${index}`}
                          >
                            {choice.choice}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between mt-4">
                    <button
                      className="btn btn-primary museum-btn"
                      onClick={handlePrev}
                      disabled={currentQuestion === 0}
                    >
                      Prev
                    </button>
                    <button
                      className="btn btn-primary museum-btn"
                      onClick={handleNext}
                      disabled={currentQuestion === questions.length - 1}
                    >
                      Next
                    </button>
                    {currentQuestion === questions.length - 1 && (
                      <button
                        className="btn btn-success museum-btn"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
