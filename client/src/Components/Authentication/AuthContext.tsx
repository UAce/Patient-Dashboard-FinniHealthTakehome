import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "./FirebaseApp";
import { User } from "firebase/auth";

export type AuthContextValue = {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  currentUser: User | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  if (auth.currentUser && !localStorage.getItem("userId")) {
    localStorage.setItem("userId", auth.currentUser.uid);
  }

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      setIsAuthLoading(!user || localStorage.getItem("userId") ? false : true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthLoading,
      isAuthenticated,
    }),
    [currentUser, isAuthLoading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
