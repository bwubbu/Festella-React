import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", credentials);
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const register = async (user) => {
    try {
      const response = await axios.post("http://localhost:5000/user/register", user);
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.error("Error registering", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);