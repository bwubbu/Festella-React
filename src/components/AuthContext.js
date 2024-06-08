import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };
    fetchUser();
  }, []);

  const register = async (user) => {
    try {
      const response = await axios.post('http://localhost:5000/user/register', user, { withCredentials: true });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  const login = async (user) => {
    try {
      const response = await axios.post('http://localhost:5000/user/login', user, { withCredentials: true });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in user', error);
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/user/logout', { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out user', error);
    }
  };

  const editProfile = async (user) => {
    try {
      const response = await axios.put('http://localhost:5000/user/edit', user, { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.error('Error editing profile', error);
    }
  }

  const setUserData = (user) => {
    setUser(user);
  }

  const changeAuthState = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout, editProfile, setUserData, changeAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);