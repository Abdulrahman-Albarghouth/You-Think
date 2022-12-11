import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Nav from "./components/nav/Nav";
import Post from "./pages/post/Post";
import Blog from "./pages/blog/Blog";
import SignUp from "./pages/signUp/SignUp";
import Tweets from "./pages/tweets/Tweets";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path='/blog/:slug' element={<Post />} />
        <Route path='/blog' element={<Blog />} />
        <Route path="/tweets" element={<Tweets />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<>NOT FOUND</>} />
      </Routes>
    </>
  );
}

export default App;