import './NewPost.css'

const NewPost = ({user}) => {
    return (
        <div className="new">
        <img src={user.avatar} alt={user.name} />
        <div className="textarea">
          <textarea placeholder="What is happening?"></textarea>
          <button className="btn btn-primary">Create Post</button>
        </div>
      </div>
    )
}

export default NewPost