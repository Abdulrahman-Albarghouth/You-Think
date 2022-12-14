import { useContext, useEffect, useState } from "react";
import { AlertContextNotification } from "../../contexts/AlertContextNotification";
import { AuthContext } from "../../contexts/AuthContext";

const MyPosts = ({ posts }) => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContextNotification);
  const [postsData ,setPostsData] = useState(posts)
  
  const Delete = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    toggleOn(json.messages, json.success);
    setPostsData(postsData.filter(i => i.id != id));
  };
  useEffect(()=>{
    setPostsData(postsData)
  }, [postsData])
  return (
    <>
      <div className="mb-4 p-3">
        <div className="alert alert-info">My Posts</div>
        <ul className="list-group">
          {postsData.map((post, i) => {
            return (
              <li
                key={`my-post-${post.id}-${i}`}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                <span className="hide-extra">{post.content}</span>
                <span>
                  <button className="btn btn-danger btn-sm" onClick={()=>Delete(post.id)}>
                    Delete
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default MyPosts;
