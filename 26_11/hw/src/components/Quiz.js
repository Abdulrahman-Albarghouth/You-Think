import { useEffect, useRef, useState } from "react";
import questions from "../data/questions.js";
import "./Quiz.css";

const Quiz = ({ back }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const question = useRef();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [Questions, setQuestions] = useState([]);

  const userAnswered = (qIndex, aIndex) => {
    const currentAnswers = { ...userAnswers };
    currentAnswers[qIndex] = aIndex;
    setUserAnswers(currentAnswers);
    const num = document.querySelectorAll(".num");
    num[qIndex].style.backgroundColor = "green";
    goNextQuestion();
  };
  const getResult = () => {
    const markPerQuestion = 100 / questions.length;
    let score = 0;
    const answeredQuestions = Object.keys(userAnswers);
    answeredQuestions.forEach((qIndex, i) => {
      if (questions[qIndex].answers[userAnswers[qIndex]].isCorrect) {
        score = score + markPerQuestion;
      }
    });
    window.alert(Math.round(score));
  };
  const goNextQuestion = () => {
    if (activeQuestion < Questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    }
  };
  const goPreviousQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };
  useEffect(() => {
    setQuestions(question.current.querySelectorAll(".question"));
  }, []);
  useEffect(() => {
    const windowWidth = 500;
    const distanceToQuestion = windowWidth * activeQuestion;
    Questions.forEach((question, i) => {
      question.style.transform = `translateX(-${distanceToQuestion}px)`;
    });
  }, [activeQuestion]);

  return (
    <div className="body">
      <div className="app">
        <div className="questions" ref={question}>
          {questions.map((q, i) => {
            return (
              <div className="question" key={i}>
                <h3>{q.question}</h3>
                {q.answers.map((a, j) => {
                  return (
                    <p key={j}>
                      <input
                        type="radio"
                        name={`answer-${i}`}
                        onClick={() => {
                          userAnswered(i, j);
                        }}
                      />{" "}
                      {a.answer}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
        {activeQuestion < Questions.length - 1 && (
          <div className="navigation next" onClick={goNextQuestion}>
            <div className="arrow"></div>
          </div>
        )}
        {activeQuestion > 0 && back && (
          <div className="navigation previous" onClick={goPreviousQuestion}>
            <div className="arrow"></div>
          </div>
        )}
      </div>
      <div className="btns">
        <div>
          {questions.map((a, i) => {
            return (
              <input
                key={i}
                type="button"
                value={i + 1}
                className="num"
                onClick={() => (back ? setActiveQuestion(i) : "#")}
              />
            );
          })}
        </div>
        <div className="result">
          <input type="button" value="Get My Result" onClick={getResult} />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
