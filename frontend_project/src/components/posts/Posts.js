import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NewPost from "../newPost/NewPost";
import "./Posts.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Comments from "../comments/Comments";
import { pink } from '@mui/material/colors';
import { AlertContextNotification } from "../../contexts/AlertContextNotification";
import * as dayjs from 'dayjs'
import Loading from "../loading/Loading";


const Posts = () => {
  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  const { user, token } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [commentsData, setCommentsData] =useState([])
  const [activeComments, setActiveComments] = useState(-1)
  const listInnerRef = useRef();
  const [pageNo, setPageNo] = useState(0);
  const [isLoding, setIsLoding] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [lastPage, setLastPage] = useState(-1);


const postDetails = async (postId) => {
    const response = await fetch(`${process.env.REACT_APP_API}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    return json;
  };
  const getComments = async (postId, i)=>{
    const json = await postDetails(postId);
    setCommentsData([...json.data.comments]);
    tweets[i]=json.data;
    setTweets([...tweets]);
    setActiveComments(postId);
  }
  const unlike = async (postId, i) => {
    const response = await fetch(`${process.env.REACT_APP_API}/posts/unlike`, {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    if(json.success) {
      const updatePost = await postDetails(postId);
      tweets[i]=updatePost.data;
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
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    if(json.success) {
      const updatePost = await postDetails(postId);
      tweets[i]=updatePost.data;
      setTweets([...tweets]);
    }
  };
  
  const getTweets = async (page) => {
    const response = await fetch(`${process.env.REACT_APP_API}/posts?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    setLastPage(json.data.last_page);
    setTweets([...tweets,...json.data.data])
    setIsLoding(false);
  };

  useEffect(() => {
    onscroll();
  }, []);
  useEffect(() => {
    getTweets(pageNo);
  }, [pageNo]);

  const onscroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight +50 > scrollHeight && !isLoding && lastPage>pageNo) {
        setPageNo(pageNo+1)
        setIsLoding(true);
      }
      else if(lastPage===pageNo && !isLoding) setIsFinish(true)
    }
  };
  const [post, setPost] = useState("");
  const { toggleOn } = useContext(AlertContextNotification);
  const CreateNewPost = async ()=>{
    const response = await fetch(`${process.env.REACT_APP_API}/posts`, {
      method: "POST",
      body: JSON.stringify({
        content: post,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    const json = await response.json()
    toggleOn(json.messages, json.success);
    if(json.success){
      const postObj ={
        id: json.data.id,
            content: json.data.content,
            created_at: json.data.created_at,
            updated_at: json.data.updated_at,
            likes_count: 0,
            comments_count: 0,
            user: user,
      }
      tweets.unshift(postObj);
      setPost("");
    }
  }
  return (
    <>
      <div className="new">
        <img src={user.avatar} alt={user.name} />
        <div className="textarea">
          <textarea placeholder="What is happening?" onChange={(e)=>setPost(e.target.value)} value={post} ></textarea>
          <button className="btn btn-primary" onClick={CreateNewPost}>Create Post</button>
        </div>
      </div>
      <div style={{
        width: '100%',
        height: '100vh',
        overflow: 'scroll',
      }} className="mb-4" onScroll={onscroll} ref={listInnerRef}>
        {tweets.map((tweet,i) => {
          return (
            <div key={`p-${tweet.id}-${i}`} className="post">
              <div className="postContent">
                <img src={tweet.user.avatar} alt={tweet.user.name} />
                <div>
                  <div className="mb-0 name">{tweet.user.name}</div>
                  <div className="mb-2 datetime">{dayjs(tweet.created_at).fromNow()}</div>
                  <p>{tweet.content}</p>
                  <div className="icons d-flex align-items-center">
                    <div className="me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center">
                      <div className="ms-2 fw-bolder" onClick={()=>tweet.liked_by_current_user ? unlike(tweet.id, i) : likes(tweet.id, i)}>
                        {tweet.liked_by_current_user ? <FavoriteIcon sx={{ color: pink[500] }} /> : <FavoriteBorderIcon />}
                        {tweet.likes_count}
                      </div>
                    </div>
                    <div className="border rounded border bg-light py-1 px-2 d-flex align-items-center">
                      <div className="ms-2 fw-bolder" onClick={()=>getComments(tweet.id, i)}>
                        <ChatBubbleOutlineIcon />
                        {tweet.comments_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {activeComments==tweet.id && <Comments commentsData={commentsData} getCommen={getComments} postId={tweet.id} ind={i}/>} 
            </div>
          );
        })}
        {isLoding && <Loading />}
        {isFinish && <div> <h4>The end of the posts</h4></div>}
      </div>
    </>
  );
};

export default Posts;
