import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const tokenResponse = await axios.get("/api/token");
        if (tokenResponse.data.access_token) {
          setAccessToken(tokenResponse.data.access_token);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred");
        }
      }
    }

    fetchToken();
  }, []);


  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated: !!accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
