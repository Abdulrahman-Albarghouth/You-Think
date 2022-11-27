import "./App.css";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [savecounter, setSavecounter] = useState(0);
  const [savecounters, setSavecounters] = useState([]);
  const handleOnSavedCounter = () => {
    setSavecounter(savecounter + counter);
    setCounter(0);
    setSavecounters([...savecounters, savecounter + counter]);
  };
  return (
    <div className="app">
      <div className="counter">
        <input
          type="button"
          value="+"
          onClick={() => {
            setCounter(counter + 1);
          }}
        />
        <label>{counter}</label>
        <input
          type="button"
          value="-"
          onClick={() => {
            setCounter(counter - 1);
          }}
        />
        <input type="button" value="Save" onClick={handleOnSavedCounter} />
        <label>{savecounter}</label>
      </div>
      <div>
        {savecounters.map((save, index) =>
          index == savecounters.length - 1 ? (
            <label>{save}</label>
          ) : (
            <label>{save},</label>
          )
        )}
      </div>
    </div>
  );
}

export default App;
