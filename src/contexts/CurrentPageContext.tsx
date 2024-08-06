import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../utils/types";

export interface ICurrentPageContext {
  currentPage: Page;
  setPage: (newPage: Page, userName?: string) => void;
}

export const CurrentPageContext = createContext<ICurrentPageContext>(
  {} as ICurrentPageContext
);

export const CurrentPageProvider: React.FC = (props) => {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [userName, setUserName] = useState<string>("");

  const setPage = (newPage: Page, userName?: string) => {
    userName && setUserName(userName);
    setCurrentPage(newPage);
  };

  const navigate = useNavigate();
  useEffect(() => {
    navigate(
      `/${currentPage}/${userName}`,
      userName ? { state: { userName } } : {}
    );
  }, [currentPage]);

  return (
    <CurrentPageContext.Provider
      value={{
        currentPage,
        setPage,
      }}
    >
      {props.children}
    </CurrentPageContext.Provider>
  );
};
