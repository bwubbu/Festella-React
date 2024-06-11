// GroupContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchGroups();
    }
  }, [isAuthenticated, user]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/groups');
      const allGroups = response.data;
      const userGroups = allGroups.filter(group => group.members.includes(user._id));
      setGroups(allGroups);
      setUserGroups(userGroups);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (groupName) => {
    try {
      const response = await axios.post('http://localhost:5000/api/groups', { name: groupName, userId: user._id });
      setGroups([...groups, response.data]);
      setUserGroups([...userGroups, response.data]);
    } catch (error) {
      console.error('Error creating group:', error.message);
    }
  };

  return (
    <GroupContext.Provider value={{ groups, userGroups, loading, createGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => {
  return useContext(GroupContext);
};
