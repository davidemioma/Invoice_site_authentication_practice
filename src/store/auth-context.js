import { createContext, useCallback, useEffect, useState } from "react";
import { calcExpiringTime } from "../utils/utils";
import { retrieveStoredToken } from "../utils/utils";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);

    localStorage.removeItem("token");

    localStorage.removeItem("expiringTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expiringTime) => {
    setToken(token);

    localStorage.setItem("token", token);

    localStorage.setItem("expiringTime", expiringTime);

    const autoLogoutTime = calcExpiringTime(expiringTime);

    logoutTimer = setTimeout(logoutHandler, autoLogoutTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, loginHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
