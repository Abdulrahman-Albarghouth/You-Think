import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NewPost from "../newPost/NewPost";
import './Posts.css'

const Posts = () => {
  const { user, token } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const getTweets = async () => {
      const response = await fetch("http://ferasjobeir.com/api/posts?page=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setTweets(json.data.data);
    };
    getTweets();
  }, []);
  return (
    <>
      <NewPost user={user} />
      <div className="mb-4">
        {tweets.map((tweet) => {
          return (
            <div key={tweet.id} className="post">
              <div className="postContent">
                <img src={tweet.user.avatar} alt={tweet.user.name} />
                <div>
                  <div className="mb-0 name">{tweet.user.name}</div>
                  <div className="mb-2 datetime">an hour ago</div>
                  <p>{tweet.content}</p>
                  <div className="icons d-flex align-items-center">
                    <div className="me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center">
                      <div className="ms-2 fw-bolder">{tweet.likes_count}</div>
                    </div>
                    <div className="border rounded border bg-light py-1 px-2 d-flex align-items-center">
                      <div className="ms-2 fw-bolder">
                        {tweet.comments_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
