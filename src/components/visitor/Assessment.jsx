import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../utils/style.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const [questionsResponse, choicesResponse] = await Promise.all([
          axios.get("http://localhost:3000/visitor/assessment/questions"),
          axios.get("http://localhost:3000/visitor/assessment/choices")
        ]);
        setQuestions(questionsResponse.data.questions);
        setChoices(choicesResponse.data.options);
        setLoading(false);
      } catch (error) {
        setError("Error fetching quiz data. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (choicesID) => {
    setSelectedChoice(choicesID);
  };

  const handleNextQuestion = () => {
    // Check if an option is selected before navigating to the next question
    if (!selectedChoice) {
      alert("Please select an option before moving to the next question.");
      return;
    }
    // Increment the current question index to move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    // Clear the selected option for the next question
    setselectedChoice("");
  };


  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (quizCompleted) {
    return <div>Quiz completed! Thank you.</div>;
  }

  const currentQuestionChoices = choices.filter(
    (choice) => choice.assessmentID === currentQuestion.assessmentID
  );

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion?.question}</p>
      <ul>
        {currentQuestionChoices.map((choice) => (
          <li key={choice.choicesID}>
            <label>
              <input
                type="radio"
                name="option"
                value={choice.choicesID}
                checked={selectedChoice === choice.choicesID}
                onChange={() => handleOptionSelect(choice.choicesID)}
              />
              {choice.choice}
            </label>
          </li>
        ))}
      </ul>
      {currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestion}>Next</button>
      )}
      <button>Submit</button>
    </div>
  );
};
export default Quiz;
