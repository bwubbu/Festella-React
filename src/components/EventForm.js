import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Events.css';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    id: '',
    name: '',
    category: '',
    rating: '',
    downloads: '',
    images: [],
    videoLink: '',
    description: '',
    ticketSold: '',
    totalTicket: '',
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 10 * 2000 * 2000;

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError('Only JPEG, PNG, and GIF files are allowed.');
        return;
      }
      if (file.size > maxFileSize) {
        setError('Each file must be less than 10MB.');
        return;
      }
    }

    setError('');
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await Promise.all(selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return response.data.fileUrl;
      }));

      const newEvent = { ...eventData, images: imageUrls.sort() }; // sort the images array
      await axios.post('http://localhost:5000/events', newEvent);

      alert('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      const errorMessage = error.response ? error.response.data.message : error.message;
      alert(`Failed to add event: ${errorMessage}`);
    }
  };

  return (
    <form className="form-register" onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-row">
        <div>
          <label>ID:</label>
          <input type="text" name="id" value={eventData.id} onChange={handleInputChange} required />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={eventData.name} onChange={handleInputChange} required />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label>Category:</label>
          <select name="category" value={eventData.category} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            <option value="Concert">Concert</option>
            <option value="Cosplay">Cosplay</option>
            <option value="Festival">Festival</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" name="rating" value={eventData.rating} onChange={handleInputChange} required />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label>Downloads:</label>
          <input type="text" name="downloads" value={eventData.downloads} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Images:</label>
          <input type="file" multiple onChange={handleImageChange} required />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label>Video Link:</label>
          <input type="text" name="videoLink" value={eventData.videoLink} onChange={handleInputChange} required />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label>Description:</label>
          <textarea name="description" value={eventData.description} onChange={handleInputChange} required></textarea>
        </div>
        <div>
          <label>Tickets Sold:</label>
          <input type="number" name="ticketSold" value={eventData.ticketSold} onChange={handleInputChange} required />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label>Total Tickets:</label>
          <input type="number" name="totalTicket" value={eventData.totalTicket} onChange={handleInputChange} required />
        </div>
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
