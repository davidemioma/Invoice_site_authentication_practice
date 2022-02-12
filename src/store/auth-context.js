import { createContext, useCallback, useEffect, useState } from "react";
import { calcExpiringTime } from "../utils/utils";
import { retrieveStoredToken } from "../utils/utils";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  localId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken, initialId;

  if (tokenData) {
    initialToken = tokenData.token;

    initialId = tokenData.localId;
  }

  const [token, setToken] = useState(initialToken);

  const [localId, setLocalId] = useState(initialId);

  const userIsLoggedIn = !!token && !!localId;

  const logoutHandler = useCallback(() => {
    setToken(null);

    setLocalId(null);

    localStorage.removeItem("token");

    localStorage.removeItem("localID");

    localStorage.removeItem("expiringTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, localId, expiringTime) => {
    setToken(token);

    setLocalId(localId);

    localStorage.setItem("token", token);

    localStorage.setItem("localID", localId);

    localStorage.setItem("expiringTime", expiringTime);

    const autoLogoutTime = calcExpiringTime(expiringTime);

    logoutTimer = setTimeout(logoutHandler, autoLogoutTime);
  };

  window.onbeforeunload = () => {
    logoutHandler();
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    localId: localId,
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
