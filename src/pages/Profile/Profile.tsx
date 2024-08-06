import "./Profile.css";
import Avatar from "@mui/material/Avatar";
import { useContext, useEffect, useState } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import Typography from "@mui/material/Typography";
import PostsList from "../../components/PostsList/PostsList";
import User from "../../models/User";
import PostDTO from "../../models/PostDTO";
import UsersAPI from "../../api/UsersAPI";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [userPosts, setUserPosts] = useState<PostDTO[]>([]);
  const [user, setUser] = useState<User | undefined>(new User("", "", []));
  const { state } = useLocation();
  const loggedInUserContext = useContext(LoggedInUserContext);

  const fetchUser = async (userName: string) => {
    const { data } = await UsersAPI.getInstance().getUser(userName);
    setUser(data);
  };

  useEffect(() => {
    if (state?.userName) {
      fetchUser(state.userName);
    } else {
      setUser(loggedInUserContext.user);
    }
  }, [state?.userName]);

  useEffect(() => {
    const getAllPostCardsOfUser = async (user: User) => {
      const { data } = await UsersAPI.getInstance().getUserPosts(user.name);
      setUserPosts(data);
    };
    user && getAllPostCardsOfUser(user);
  }, [user]);

  return (
    <>
      <div id="profile-header">
        <Avatar sx={{ width: "6rem", height: "6rem" }} src={user?.avatarSrc} />
        <Typography variant="h5" sx={{}}>
          {user?.name}
        </Typography>
      </div>
      <PostsList posts={userPosts}></PostsList>
    </>
  );
};

export default Profile;
