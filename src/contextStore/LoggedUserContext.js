import { createContext, useState } from "react";
import Cookies from "universal-cookie";

export const LoggedUserContext = createContext();

export const LoggedUserProvider = ({ children }) => {
  const cookies = new Cookies();

  const [loggedUser, setLoggedUser] = useState({
    token: cookies.get('token') || '',
    firstName: cookies.get('firstName') || '',
    lastName: cookies.get('lastName') || '',
    userName: cookies.get('userName') || '',
    email: cookies.get('email') || '',
    follows: cookies.get('follows') || [],
    followers: cookies.get('followers') || [],
  });

  return (
    <LoggedUserContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
      }}
    >
      {children}
    </LoggedUserContext.Provider>
  )
}