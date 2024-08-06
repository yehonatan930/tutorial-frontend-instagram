import * as React from "react";
import "./LowerNavbar.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Page } from "../../utils/types";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import User from "../../models/User";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";

const LowerNavbar = () => {
  const currentPageContext = useContext(CurrentPageContext);
  const currentPage: Page = currentPageContext.currentPage;
  const setCurrentPage = currentPageContext.setPage;

  const loggedInUserContext = useContext(LoggedInUserContext);
  const user: User = loggedInUserContext.user!;

  const handleChange = (event: React.SyntheticEvent, newPage: Page) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "56px",
          boxShadow:
            "rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",
        }}
        value={currentPage}
        onChange={handleChange}
      >
        <BottomNavigationAction
          value="home"
          icon={<HomeIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          value="newPost"
          icon={<AddPhotoAlternateIcon />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          value="profile"
          icon={
            <Avatar
              src={
                user
                  ? user.avatarSrc
                  : "https://3znvnpy5ek52a26m01me9p1t-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/noimage_person.png"
              }
            ></Avatar>
          }
        ></BottomNavigationAction>
      </BottomNavigation>
    </>
  );
};

export default LowerNavbar;
