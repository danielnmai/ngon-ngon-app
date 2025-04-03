import axios from "axios";
import dayjs from "dayjs";
import { createContext, ReactNode, useEffect, useState } from "react";
import { TokensType } from "../schemas/auth";
import { UserType } from "../schemas/user";

export type AuthContextType = {
  user: UserType | null;
  loginUser: (user: UserType, tokens: TokensType) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<UserType | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const loginUser = (user: UserType, tokens: TokensType) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tokens", JSON.stringify(tokens));
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${tokens.id_token}`;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
    localStorage.removeItem("cartItems");
    axios.defaults.headers.common["Authorization"] = "";
  };

  useEffect(() => {
    const storedTokens = localStorage.getItem("tokens");

    if (storedTokens) {
      const tokens: TokensType = JSON.parse(storedTokens);
      const expiryDate = dayjs(tokens.expiry_date);
      const now = dayjs();

      if (now.isAfter(expiryDate)) {
        logoutUser();
      } else {
        console.log("token is not expired");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
