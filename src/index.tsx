import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./utils/theme";
import { LoggedInUserProvider } from "./contexts/LoggedInUserContext";
import { CurrentPageProvider } from "./contexts/CurrentPageContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <LoggedInUserProvider>
          <CurrentPageProvider>
            <App />
          </CurrentPageProvider>
        </LoggedInUserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
