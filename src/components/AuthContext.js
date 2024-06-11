import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const register = async (user) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, user, { withCredentials: true });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  const login = async (user) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, user, { withCredentials: true });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in user', error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const editProfile = async (user) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/edit`, { id: user._id, updatedUser: user }, { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.error('Error editing profile', error);
    }
  }

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/update`, { id: user._id, updatedUser: updatedUser }, { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.error('Error updating user', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout, editProfile, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);