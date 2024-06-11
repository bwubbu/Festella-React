// frontend/src/context/EventContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTopEvents, getEvents } from '../api/api';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [topEvents, setTopEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchTopEvents = async () => {
      try {
        const response = await getTopEvents();
        const activeEvents = response.data.filter(event => !event.isFinished && new Date(event.date) > new Date());
        setTopEvents(activeEvents);
      } catch (error) {
        console.error('Error fetching top events:', error);
      }
    };

    const fetchAllEvents = async () => {
      try {
        const response = await getEvents();
        const now = new Date();
        const activeEvents = response.data.filter(event => !event.isFinished && new Date(event.date) > now);
        const pastEventsData = response.data.filter(event => event.isFinished || new Date(event.date) <= now).slice(0, 3);
        setAllEvents(activeEvents);
        setPastEvents(pastEventsData);
      } catch (error) {
        console.error('Error fetching all events:', error);
      }
    };

    fetchTopEvents();
    fetchAllEvents();
  }, []);

  return (
    <EventContext.Provider value={{ topEvents, allEvents, pastEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);