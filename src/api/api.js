import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

export const getEvents = () => api.get('/events');
export const getTopEvents = () => api.get('/events/top'); // New endpoint for top events
export const addEvent = (event) => api.post('/events', event);
export const updateEvent = (id, event) => api.put(`/events/${id}`, event);
export const deleteEvent = (id) => api.delete(`/events/${id}`);
export const getEventById = (id) => api.get(`/events/${id}`);
export const getLatestEventId = () => api.get('/events/latest-id');

export default api;
