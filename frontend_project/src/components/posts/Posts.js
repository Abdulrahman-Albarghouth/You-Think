import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Posts.module.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Comments from "../comments/Comments";
import { pink } from "@mui/material/colors";
import * as dayjs from "dayjs";
import Loading from "../loading/Loading";
import NewPost from "../newPost/NewPost";

const Posts = () => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const { token } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [activeComments, setActiveComments] = useState(-1);
  const listInnerRef = useRef();
  const [pageNo, setPageNo] = useState(0);
  const [isLoding, setIsLoding] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [lastPage, setLastPage] = useState(1);

  const postDetails = async (postId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API}/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    return json;
  };
  const getComments = async (postId, i) => {
    const json = await postDetails(postId);
    setCommentsData([...json.data.comments]);
    tweets[i] = json.data;
    setTweets([...tweets]);
    setActiveComments(postId);
  };
  const unlike = async (postId, i) => {
    const response = await fetch(`${process.env.REACT_APP_API}/posts/unlike`, {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      const updatePost = await postDetails(postId);
      tweets[i] = updatePost.data;
      setTweets([...tweets]);
    }
  };

  const likes = async (postId, i) => {
    const response = await fetch(`${process.env.REACT_APP_API}/posts/like`, {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      const updatePost = await postDetails(postId);
      tweets[i] = updatePost.data;
      setTweets([...tweets]);
    }
  };

  const getTweets = async (page) => {
    const response = await fetch(
      `${process.env.REACT_APP_API}/posts?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    setLastPage(json.data.last_page);
    setTweets([...tweets, ...json.data.data]);
    setIsLoding(false);
    setPageNo(page);
  };

  const onscroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (
        scrollTop + clientHeight + 50 > scrollHeight &&
        !isLoding &&
        lastPage > pageNo
      ) {
        getTweets(pageNo + 1);
        setIsLoding(true);
      } else if (lastPage === pageNo && !isLoding) setIsFinish(true);
    }
  };

  useEffect(() => {
    onscroll();
  }, []);

  const viewPost = (postObj) => {
    setTweets([postObj,...tweets]);
  };

  return (
    <>
      <NewPost viewPost={viewPost} />
      <div
        className={`mb-4 ${styles.scroll}`}
        onScroll={onscroll}
        ref={listInnerRef}
      >
        {tweets.map((tweet, i) => {
          return (
            <div key={`p-${tweet.id}-${i}`} className={styles.post}>
              <div className={styles.postContent}>
                <img src={tweet.user.avatar} alt={tweet.user.name} />
                <div>
                  <div className={`mb-0 ${styles.name}`}>{tweet.user.name}</div>
                  <div className={`mb-2 ${styles.datetime}`}>
                    {dayjs(tweet.created_at).fromNow()}
                  </div>
                  <p>{tweet.content}</p>
                  <div className="icons d-flex align-items-center">
                    <div
                      className="me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center"
                      onClick={() =>
                        tweet.liked_by_current_user
                          ? unlike(tweet.id, i)
                          : likes(tweet.id, i)
                      }
                    >
                      {tweet.liked_by_current_user ? (
                        <FavoriteIcon sx={{ color: pink[500] }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                      <div className="ms-2 fw-bolder">{tweet.likes_count}</div>
                    </div>
                    <div
                      className="border rounded border bg-light py-1 px-2 d-flex align-items-center"
                      onClick={() => getComments(tweet.id, i)}
                    >
                      <ChatBubbleOutlineIcon />
                      <div className="ms-2 fw-bolder">
                        {tweet.comments_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {activeComments == tweet.id && (
                <Comments
                  commentsData={commentsData}
                  getCommen={getComments}
                  postId={tweet.id}
                  ind={i}
                />
              )}
            </div>
          );
        })}
        {isLoding && <Loading />}
        {isFinish && (
          <div class="text-center my-4 fst-italic fw-bold text-secondary">
            The end of the posts
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
