import "./Comments.css";

const Comments = ({ commentsData }) => {
  return (
    <>
      <div className="comments">
        {commentsData.map((comment) => {
          return (
            <>
              <div id={comment.id} className="comment">
                <img src={comment.user.avatar} alt={comment.user.name} />
                <div>
                  <div className="name">{comment.user.name}</div>
                  <div className="mb-2 datetime">an hour ago</div>
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
              />
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary w-100">
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
