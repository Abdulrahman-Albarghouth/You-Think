import './App.css';
import Navbar from "./Hero/Navbar/Navbar.js"
const navbaritems = ["home", "about-us", "feature"]

function App() {
  return (
    <div>
      <Navbar items={navbaritems}/>
    </div>
  );
}

export default App;
