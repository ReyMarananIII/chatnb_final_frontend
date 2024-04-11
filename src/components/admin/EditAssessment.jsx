import axios from "axios";
import React, { useEffect, useState } from "react";
import "../utils/style.css";

const EditAssessment = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState([
    { choice: "", isCorrectChoice: false },
  ]);
  const [message, setMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage the visibility of the confirmation popup

  useEffect(() => {
    setMessage("Enter question and choices");
    axios
      .get("http://localhost:3000/admin/questions", {})
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      });
  }, []);

  const handleQuestionSelect = (question) => {
    setMessage("");
    setSelectedQuestion(question);
    setQuestionText(question.question);
    setChoices(
      question.choices.map((choice) => ({
        choice: choice.choice,
        isCorrectChoice: choice.isCorrectChoice,
      }))
    );
  };

  const handleAddChoice = () => {
    setChoices([...choices, { choice: "", isCorrectChoice: false }]);
  };

  const handleChoiceChange = (index, field, value) => {
    const newChoices = [...choices];
    if (field === "isCorrectChoice") {
      newChoices[index][field] = value;
      // Ensure only one choice can be marked as correct
      if (value) {
        newChoices.forEach((choice, i) => {
          if (i !== index) choice.isCorrectChoice = false;
        });
      }
    } else {
      newChoices[index][field] = value;
    }
    setChoices(newChoices);
  };

  const handleAddQuestion = async () => {
    if (questionText.length === 0 || choices.length === 1) {
      setMessage("Please fill in all input fields");
      return;
    }

    // To remove empty choices
    const filteredChoices = choices.filter(
      (choice) => choice.choice.trim() !== ""
    );

    try {
      await axios
        .post("http://localhost:3000/admin/questions", {
          question: questionText,
          choices: filteredChoices.map((choice) => ({
            choice: choice.choice,
            isCorrectChoice: choice.isCorrectChoice,
          })),
        })
        .then((res) => {
          setQuestions([
            ...questions,
            {
              assessmentID: res.data,
              question: questionText,
              choices: filteredChoices.map((choice) => ({
                choice: choice.choice,
                isCorrectChoice: choice.isCorrectChoice,
              })),
            },
          ]);
        });
      setMessage("Question added successfully");
      setQuestionText("");
      setChoices([{ choice: "", isCorrectChoice: false }]);
    } catch (error) {
      setMessage("Error adding question");
    }
  };

  const handleUpdateQuestion = async () => {
    if (!selectedQuestion || !questionText || !choices.length) return;

    // To remove empty choices
    const filteredChoices = choices.filter(
      (choice) => choice.choice.trim() !== ""
    );

    try {
      await axios.put(
        `http://localhost:3000/admin/questions/${selectedQuestion.assessmentID}`,
        {
          question: questionText,
          choices: filteredChoices.map((choice) => ({
            choice: choice.choice,
            isCorrectChoice: choice.isCorrectChoice,
          })),
        }
      );

      setChoices([{ choice: "", isCorrectChoice: false }]);
      setQuestions((prevItems) =>
        prevItems.map((item) =>
          item.assessmentID === selectedQuestion.assessmentID
            ? {
                ...item,
                question: questionText,
                choices: filteredChoices.map((choice) => ({
                  choice: choice.choice,
                  isCorrectChoice: choice.isCorrectChoice,
                })),
              }
            : item
        )
      );

      setMessage("Question updated successfully");
      setSelectedQuestion(null);
      setQuestionText("");
    } catch (error) {
      setMessage("Error updating question");
    }
  };

  const handleDeleteQuestion = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.delete(
        `http://localhost:3000/admin/questions/${selectedQuestion.assessmentID}`
      );

      setChoices([{ choice: "", isCorrectChoice: false }]);
      setQuestions(
        questions.filter(
          (question) => question.assessmentID !== selectedQuestion.assessmentID
        )
      );

      setMessage("Question deleted successfully");
      setSelectedQuestion(null);
      setQuestionText("");
      setShowConfirmation(false);
    } catch (error) {
      setShowConfirmation(false);
      setMessage("Error deleting question");
    }
  };

  return (
    <div className="px-5 mt-3 mb-3">
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <h4>Assessment</h4>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm mb-4">
              <div className="card-header admin-questions">
                <h3 className="mb-0">Questions</h3>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {questions.length === 0
                    ? "No Question Added"
                    : questions.map((question) => (
                        <li
                          key={question.assessmentID}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleQuestionSelect(question)}
                        >
                          {question.question}
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header admin-question">
                <h3 className="mb-0">
                  {selectedQuestion ? "Update Question" : "Add Question"}
                </h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="question">Question:</label>
                  <input
                    type="text"
                    id="question"
                    className="form-control"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>
                <h4>Choices:</h4>
                {choices.map((choice, index) => (
                  <div key={index} className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={choice.choice}
                      onChange={(e) =>
                        handleChoiceChange(index, "choice", e.target.value)
                      }
                    />
                    <div className="form-check mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`correct-${index}`}
                        checked={choice.isCorrectChoice}
                        onChange={(e) =>
                          handleChoiceChange(
                            index,
                            "isCorrectChoice",
                            e.target.checked
                          )
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`correct-${index}`}
                      >
                        Correct Choice
                      </label>
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-between">
                  <button
                    className="btn mr-2 admin-button"
                    onClick={handleAddChoice}
                  >
                    Add Choice
                  </button>
                  {selectedQuestion ? (
                    <button
                      className="btn btn-info mr-2"
                      onClick={handleUpdateQuestion}
                    >
                      Update Question
                    </button>
                  ) : (
                    <button
                      className="btn btn-info mr-2"
                      onClick={handleAddQuestion}
                    >
                      Add Question
                    </button>
                  )}
                  {selectedQuestion && (
                    <>
                      <button
                        className="btn btn-danger mr-2"
                        onClick={() => {
                          setShowConfirmation(true);
                        }}
                      >
                        Delete Question
                      </button>
                      <button
                        className="btn btn-secondary mr-2"
                        onClick={() => {
                          setSelectedQuestion(null);
                          setQuestionText("");
                          setChoices([{ choice: "", isCorrectChoice: false }]);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
                {message && <p className="mt-3 text-success">{message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="pop-up-overlay d-flex justify-content-center align-items-center">
          <div className="confirmation-popup">
            <h3 className="fw-semibold">Confirm Delete</h3>
            <p>Are you sure you want to delete?</p>
            <div className="pop-up-btns d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-danger "
                onClick={handleDeleteQuestion}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAssessment;
