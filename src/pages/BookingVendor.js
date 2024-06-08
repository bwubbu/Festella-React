import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import '../styles/Vendor.css';
import { useVendors } from '../components/VendorContext';
import Back from '@mui/icons-material/KeyboardReturn';
import axios from 'axios';

function BookingVendor() {
  const location = useLocation();
  const { vendorId } = location.state || {};
  const { vendors, bookVendor } = useVendors();

  const vendor = vendors.find(vendor => vendor._id === vendorId);

  const [bookData, setBookData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value} = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/vendors/${vendorId}/book`, bookData);
      bookVendor(response.data);
      alert('Vendor booked successfully');
    } catch (error) {
      console.error('Error booking vendor', error);
      alert('Failed to book vendor. Please try again.');
    }
  };

  return (
    <div className='page-content'>
      <div className='back'>
        <Link to='/vendor' className='button'><Back /></Link>
      </div>

      {vendor ? (
        <div className='vendor-details'>
          <img src={vendor.image} alt={vendor.name} />
          <div className="vendorDetails content">
            <h2>{vendor.name}</h2>
            <p>{vendor.description}</p>
            <div className="details-grid">
              <p><strong>Address:</strong> {vendor.address}</p>
              <p><strong>Phone:</strong> {vendor.phone}</p>
              <p><strong>Service:</strong> {vendor.service}</p>
              <p><strong>Availability:</strong> {vendor.availability}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Vendor not found.</p>
      )}

      <div className='map-and-book'>
        <div className='vendor-map' id='vendorMap'>
          {vendor && !(vendor.map === "") ? (
            <iframe src={vendor.map} title={vendor.name} width='100%' height='100%' style={{ border: 0 }} allowFullScreen='' loading='lazy'></iframe>
          
          ) : (
          <p>Map not available</p>
          )}
        </div>

        <div className='booking-form'>
          <h3>Book Now</h3>
          <form id='booking-form' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="Your Name" name='name' required value={bookData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="e-mail" placeholder="Your Email" name='email' required value={bookData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" name='date' required value={bookData.date} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name='time' required value={bookData.time} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="notes">Notes:</label>
              <textarea id="notes" placeholder="Additional Notes" rows="3" name='notes' value={bookData.notes} onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default BookingVendor;