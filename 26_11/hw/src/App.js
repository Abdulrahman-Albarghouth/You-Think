import { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  const [visible, setVisible] = useState(true);
  const [quiz, setQuiz] = useState(false);
  const back = true;

  const removeButton = () => {
    setVisible((prev) => !prev);
    setQuiz((prev) => !prev);
  };
  return (
    <div>
      <div className="_app">{visible && <button onClick={removeButton}>Start Quiz</button>}</div>
      <div className="_app">{quiz && <Quiz back={back}/>}</div>
    </div>
  );
}

export default App;
