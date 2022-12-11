import Head from "../../components/head/Head";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Profile.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MyPosts from "../../components/myPosts/MyPosts";
import { AlertContextNotification } from "../../contexts/AlertContextNotification";
import Loading from "../../components/loading/Loading";

const Profile = () => {
    const [data, setData] = useState({});
    const { token } = useContext(AuthContext);
    const [newData, setNewData] = useState(data);
    const { toggleOn } = useContext(AlertContextNotification);

    useEffect(() => {
        const profile = async () => {
            const response = await fetch(`${process.env.REACT_APP_API}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const json = await response.json();
            setData(json.data);
        }
        profile();
      }, []);


    useEffect(() => {
        setNewData(data);
    }, [data]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const updateProfile = await fetch(`${process.env.REACT_APP_API}/users/me`, {
      method: "post",
      body: new FormData(e.target),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await updateProfile.json();
    toggleOn(json.messages, json.success);
  };



  return (
    <>
      <div className="content">
        <Head page_name="Profile" />
        {!data.name && <Loading />}
        {data.name && <form onSubmit={updateProfile} method="put">
          <div className="p-3 mb-4 bottom-border">
            <div className="alert alert-info">My Information</div>
            <div className="form-field mb-3 person-avatar">
              <label for="avatar" className="mx-auto my-2 d-block w-25">
                <img
                  src={newData?.avatar}
                  className="d-block mx-auto rounded-circle w-100"
                />
                <div className="icon">
                  <CameraAltIcon />
                </div>
              </label>
              <input
                name="avatar"
                type="file"
                id="avatar"
                className="position-absolute"
              />
            </div>
            <div className="form-field mb-3">
              <label for="name" className="mb-2">
                <small>
                  Name <span className="text-danger">*</span>
                </small>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-control mb-3"
                value={newData?.name}
                onChange={(e) => {
                  setNewData({
                    ...newData,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-field mb-3">
              <label for="email" className="mb-2">
                <small>
                  Email Address <span className="text-danger">*</span>
                </small>
              </label>
              <input
                id="email"
                type="text"
                name="email"
                className="form-control mb-3"
                value={newData?.email}
                onChange={(e) => {
                  setNewData({
                    ...newData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-field mb-3">
              <label for="password" className="mb-2">
                <small>
                  Password <span className="text-danger">*</span>
                </small>
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="form-control mb-3"
              />
            </div>
            <div className="form-field mb-3">
              <label for="new_password" className="mb-2">
                <small>New Password</small>
              </label>
              <input
                name="new_password"
                type="password"
                id="new_password"
                className="form-control"
              />
            </div>
            <div className="form-field mb-3">
              <label for="password_confirmation" className="mb-2">
                <small>New Password Confirmation</small>
              </label>
              <input
                name="new_password_confirmation"
                type="password"
                id="password_confirmation"
                className="form-control"
              />
            </div>
            <input type="hidden" name="_method" value="put" />
            <div className="form-field mb-3">
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </div>
          </div>
        </form>}
        {data.posts && <MyPosts posts={data.posts}/>}
      </div>
    </>
  );
};

export default Profile;
