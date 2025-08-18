'use client'
import React, { createContext, useContext, useEffect } from "react";

type LoggedInUser = {
  name?: string;
  email?: string;
  password?: string;
};

type AuthContextType = {
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser | null) => void;
};

// 1. Create the context with a default value (can be undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 3. Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<LoggedInUser | null>(null);

  useEffect(() => {
     const storedUser = window.localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsedUser: LoggedInUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      setUser(null);
    }
  }

  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
