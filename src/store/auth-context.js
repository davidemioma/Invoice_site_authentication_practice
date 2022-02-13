import { createContext, useCallback, useState } from "react";

const AuthContext = createContext({
  token: "",
  localId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const [localId, setLocalId] = useState(null);

  const userIsLoggedIn = !!token && !!localId;

  const logoutHandler = useCallback(() => {
    setToken(null);

    setLocalId(null);
  }, []);

  const loginHandler = (token, localId) => {
    setToken(token);

    setLocalId(localId);
  };

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
