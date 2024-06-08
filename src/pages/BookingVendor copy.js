import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import '../styles/Vendor.css';
import Back from '@mui/icons-material/KeyboardReturn';

import vendors from '../components/vendors';

function BookingVendor() {
  const location = useLocation();
  const { vendorId } = location.state || {};

  const vendor = vendors.find(vendor => vendor.id === vendorId);

  return (
    <div className='page-content'>
      <div className='back'>
        <Link to='/vendor' className='button'><Back /></Link>
      </div>

      {vendor ? (
        <div className='vendor-details'>
          <img src={vendor.image} alt={vendor.name} />
          <div class="vendorDetails content">
            <h2>{vendor.name}</h2>
            <p>{vendor.description}</p>
            <div class="details-grid">
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
        {vendor ? (
          <div className='vendor-map' id='vendorMap'>
            <iframe src={vendor.map} title={vendor.name} width='100%' height='100%' style={{ border: 0 }} allowFullScreen='' loading='lazy'></iframe>
          </div>
        ) : (
          <p></p>
        )}

        <div className='booking-form'>
          <h3>Book Now</h3>
          <form id='booking-form'>
            <div>
              <label for="name">Name:</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            <div>
              <label for="email">Email:</label>
              <input type="email" id="e-mail" placeholder="Your Email" required />
            </div>
            <div>
              <label for="date">Date:</label>
              <input type="date" id="date" required />
            </div>
            <div>
              <label for="time">Time:</label>
              <input type="time" id="time" required />
            </div>
            <div>
              <label for="notes">Notes:</label>
              <textarea id="notes" placeholder="Additional Notes" rows="3"></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default BookingVendor;