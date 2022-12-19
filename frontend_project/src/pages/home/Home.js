import Head from "../../components/head/Head";
import Posts from "../../components/posts/Posts";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
        <div className={styles.content}>
          <Head page_name="Home" />
          <Posts />
        </div>
    </>
  );
};

export default Home;
