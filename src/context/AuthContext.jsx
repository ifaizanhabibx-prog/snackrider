import {
  loginUser,
  registerUser,
  saveUser,
  clearSavedUser,
  getSavedUser,
} from "../services/authService";
import { useState } from "react";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSavedUser());

  const register = async (name, email, password) => {
    const created = await registerUser(name, email, password);
    saveUser(created);
    setUser(created);
  };

  const logout = () => {
    clearSavedUser();
    setUser(null);
  };

  const login = async (email, password) => {
    const loggedIn = await loginUser(email, password);
    saveUser(loggedIn);
    setUser(loggedIn);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
