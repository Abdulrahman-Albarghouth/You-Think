import "./Comments.css";
import * as dayjs from 'dayjs'
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { AlertContextNotification } from "../../contexts/AlertContextNotification";
import Posts from "../posts/Posts";

const Comments = ({ commentsData, getCommen, postId, ind }) => {
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    const [comments, setComments] = useState(commentsData);
    const { user, token } = useContext(AuthContext);
    const [comment, setComment] = useState("");
    const { toggleOn } = useContext(AlertContextNotification);

    const CreateNewComment = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_API}/comments`, {
          method: "POST",
          body: JSON.stringify({
            content: comment,
            post_id: postId,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })
        const json = await response.json()
        toggleOn(json.messages, json.success);
        if(json.success){
          getCommen(postId, ind)
          const commentObj ={
            id: json.data.id,
                content: json.data.content,
                created_at: json.data.created_at,
                user: user,
          }
          comments.push(commentObj);
          setComment("");
          Posts.value()
        }
      }
  return (
    <>
      <div className="comments">
        {comments.map((comment, i) => {
          return (
            <>
              <div key={`c-${comment.id}-${i}`} className="comment">
                <img src={comment.user.avatar} alt={comment.user.name} />
                <div>
                  <div className="name">{comment.user.name}</div>
                  <div className="mb-2 datetime">{dayjs(comment.created_at).fromNow()}</div>
                  {comment.content}
                </div>
              </div>
            </>
          );
        })}
        <div className="container-fluid addcomment">
          <div className="row">
            <div className="col-9 ps-0">
              <input
                type="text"
                className="form-control"
                placeholder="Add a new comment"
                onChange={(e)=>setComment(e.target.value)} value={comment} 
              />
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary w-100" onClick={CreateNewComment}>
                <small>Add</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
