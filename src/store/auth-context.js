import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "@firebase/auth";

const AuthContext = React.createContext({
  currentUser: "",
  storageId: "",
  signUp: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
  resetPassword: (email) => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextprovider = (props) => {
  const [currentUser, setCurrentUser] = useState();

  const [storageId, setStorageId] = useState();

  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      // setStorageId(user.uid);

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    storageId,
    signUp,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
