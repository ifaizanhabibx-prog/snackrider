import { useContext } from "react";
import { AuthContext } from "../context/AuthContextValue";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useCart must be used inside an AuthProvider");
  }

  return context;
}
