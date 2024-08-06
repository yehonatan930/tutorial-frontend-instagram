import React, { useContext } from "react";
import "./UpperNavbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Page } from "../../utils/types";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import User from "../../models/User";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";

interface UpperNavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const UpperNavbar = () => {
  const loggedInUserContext = useContext(LoggedInUserContext);
  const currentLoggedInUser: User = loggedInUserContext.user!;

  const currentPageContext = useContext(CurrentPageContext);
  const currentPage: Page = currentPageContext.currentPage;
  const setCurrentPage = currentPageContext.setPage;

  const goToHome = () => {
    setCurrentPage("home");
  };

  return (
    <>
      <Box>
        <AppBar
          sx={{
            position: "relative",
            height: "56px",
            width: "100vw",
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {currentPage !== "home" && (
              <IconButton
                size="large"
                edge="start"
                aria-label="exit"
                sx={{ position: "absolute", left: 12 }}
                onClick={goToHome}
              >
                <CloseIcon sx={{ color: "#000000" }} />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{ fontFamily: "'Abril Fatface', 'cursive'" }}
            >
              {currentPage === "home"
                ? "Instagram"
                : currentPage === "newPost"
                ? "Create New Post"
                : currentLoggedInUser.name}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default UpperNavbar;
