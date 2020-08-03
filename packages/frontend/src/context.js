import { createContext, useContext } from "react";

const auth = {
  isLoggedIn: false,
  expiry: null,
  entityId: 0,
  type: "STATE",
  setIsLoggedIn: () => {},
  setExpiry: () => {},
};

export const AuthContext = createContext(auth);

export const useAuth = () => {
  return useContext(AuthContext);
};
