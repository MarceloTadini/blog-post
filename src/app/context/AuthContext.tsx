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
        } else {
            alert("Não está logado!") // Redireciona se não estiver logado
        }
      } catch (error) {
        alert("Não está logado!") // Redireciona se houver erro ao obter o token
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
