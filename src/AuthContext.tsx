
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  function login(username: string, password: string) {
    if (username === "admin" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("");
  }

  return context;
}
