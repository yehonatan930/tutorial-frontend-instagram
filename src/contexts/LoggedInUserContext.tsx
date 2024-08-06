import React, { createContext, useEffect, useState } from "react";
import UsersAPI from "../api/UsersAPI";
import User from "../models/User";

export interface IUserContext {
  user: User | undefined;
  refreshContext: () => void;
}

export const LoggedInUserContext = createContext<IUserContext>(
  {} as IUserContext
);

export const LoggedInUserProvider: React.FC = (props) => {
  const [user, setUser] = useState<User>();

  const usersAPI = UsersAPI.getInstance();

  const refreshContext = async () => {
    const { data } = await usersAPI.getLoggedInUser();
    setUser(data);
  };

  useEffect(() => {
    refreshContext();
  }, []);

  return (
    <LoggedInUserContext.Provider
      value={{
        user,
        refreshContext,
      }}
    >
      {props.children}
    </LoggedInUserContext.Provider>
  );
};
