import "./App.css";
import Quiz from "./components/Quiz";
import { useState} from "react";

function App() {
  const [visible, setVisible] = useState(true);
  const [quiz, setQuiz] = useState(false);
  const [back, setChecked] = useState(true);
 
  const removeButton = () => {
    setVisible((prev) => !prev);
    setQuiz((prev) => !prev);
  };
  return (
    <div className="app">
      {visible && <div className="_app home">
        <button onClick={removeButton}>Start Quiz</button>
      <div className="_app">
        <input type="checkbox" name="checback" checked={back} onClick={()=>setChecked((prev) => !prev)}/>
        <label for="checback"> Do you want to have the option to navigate between questions ?</label>
      </div>
      </div>}
      <div>{quiz && <Quiz back={back} />}</div>
    </div>
  );
}

export default App;
