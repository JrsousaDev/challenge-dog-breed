import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { registerUser } from "../api/user/registerUser";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useNavigate } from 'react-router-dom';

type SignInCredentials = {
  email: string;
}

type AuthContextData = {
  signUp: (data: SignInCredentials) => Promise<void>,
  signOut: () => void;
  isAuthenticated: boolean | undefined,
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();
  const Navigate = useNavigate();

  useEffect(() => {
    const { "challengeDogBreed.token": token } = parseCookies();

    (async () => {
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        signOut();
      }
    })()

  }, []);

  async function signUp({ email }: SignInCredentials) {
    try {
      const { token, _id } = await registerUser({ email });

      if (!token || !_id) {
        // eslint-disable-next-line no-throw-literal
        throw "E-mail ou senha incorreta!";
      }

      setCookie(undefined, "challengeDogBreed.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days
        path: "/",
      });

      setIsAuthenticated(true);
      Navigate('/list');
    } catch (error) {
      throw error;
    }
  }

  function signOut() {
    destroyCookie(null, 'challengeDogBreed.token');
    Navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}