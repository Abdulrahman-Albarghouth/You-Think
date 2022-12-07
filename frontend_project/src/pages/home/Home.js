import Head from "../../components/head/Head";
import Posts from "../../components/posts/Posts";
import './Home.css';


const Home = () => {
  return (
    <div className="content">
        <Head page_name="Home"/>
        <Posts />
    </div>
  );
};

export default Home;
