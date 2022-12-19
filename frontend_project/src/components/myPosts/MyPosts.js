import { useContext, useEffect, useState } from "react";
import { AlertContextNotification } from "../../contexts/AlertContextNotification";
import { AuthContext } from "../../contexts/AuthContext";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const MyPosts = ({ posts }) => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContextNotification);
  const [postsData, setPostsData] = useState(posts);

  const Delete = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API}/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    toggleOn(json.messages, json.success);
    setPostsData(postsData.filter((i) => i.id != id));
    handleClose();
  };
  useEffect(() => {
    setPostsData(postsData);
  }, [postsData]);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleClickOpen}
                  >
                    Delete
                  </button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Post Delete!"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete this post?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button onClick={()=>Delete(post.id)} autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
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
