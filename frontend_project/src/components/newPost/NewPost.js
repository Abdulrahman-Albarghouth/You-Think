import { useContext, useState } from 'react';
import { AlertContextNotification } from '../../contexts/AlertContextNotification';
import { AuthContext } from '../../contexts/AuthContext';
import styles from "./NewPost.module.css";


const NewPost = ({viewPost}) => {
  const [post, setPost] = useState("");
  const { user, token } = useContext(AuthContext);
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
      viewPost(postObj);
      setPost("");
      
    }
  }
    return (
        <div className={styles.new}>
        <img src={user.avatar} alt={user.name} />
        <div className={styles.textarea}>
          <textarea placeholder="What is happening?" onChange={(e)=>setPost(e.target.value)} value={post} ></textarea>
          <button className="btn btn-primary" onClick={CreateNewPost}>Create Post</button>
        </div>
      </div>
    )
}

export default NewPost