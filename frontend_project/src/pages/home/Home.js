import Head from "../../components/head/Head";
import Posts from "../../components/posts/Posts";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <Head page_name="Home" />
          <Posts />
        </div>
      </div>
    </>
  );
};

export default Home;
