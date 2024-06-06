import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/Vendor.css';
import { useVendors } from '../components/VendorContext';
import axios from 'axios';

function RegisterVendor() {
  const { addVendor } = useVendors();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: 'https://via.placeholder.com/150',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    name: '',
    description: '',
    service: '',
    availability: '',
    map: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImage =(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/vendors/register`, formData);
      addVendor(response.data);
      alert('Vendor registered successfully');
      navigate('/vendor');
    } catch (error) {
      console.error('Error registering vendor', error);
      alert('Failed to register vendor. Please try again.');
    }
  };

  return (
    <div className='page-content'>
      <div className='back'>
        <Link to='/vendor' className='button'>Back</Link>
      </div>
      <div className='form-register'>
        <h2>Personal Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label htmlFor="vendorFirstName">First Name</label>
              <input type="text" id="vendorFirstName" name='firstName' placeholder="First Name" required value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="vendorLastName">Last Name</label>
              <input type="text" id="vendorLastName" name='lastName' placeholder="Last Name" required value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="vendorEmail">Email</label>
              <input type="email" id="vendorEmail" name='email' placeholder="Email" required value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="vendorPhone">Phone</label>
              <input type="text" id="vendorPhone" name='phone' placeholder="Phone" required value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label htmlFor="vendorAddress">Address</label>
            <textarea id="vendorAddress" name='address' placeholder="Address" required value={formData.address} onChange={handleChange}></textarea>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="vendorCity">City</label>
              <input type="text" id="vendorCity" name='city' placeholder="City" required value={formData.city} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="vendorState">State</label>
              <input type="text" id="vendorState" name='state' placeholder="State" required value={formData.state} onChange={handleChange} />
            </div>
          </div>
          <h2>Business Details</h2>
          <div className='form-row'>
            <div>
              <label htmlFor='vendorName'>Business Name</label>
              <input type='text' id='vendorName' name='name' placeholder='Business Name' required value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor='vendorImage'>Business Image</label>
              <input type='file' id='vendorImage' name='image' placeholder='Business Image' onChange={handleImage} />
            </div>
          </div>
          <div>
            <label htmlFor="vendorBAddress">Business Address</label>
            <textarea id="vendorBAddress" name='businessAddress' placeholder="Address" required value={formData.businessaddress} onChange={handleChange}></textarea>
          </div>
          <div>
            <label htmlFor="vendorService">Service</label>
            <input type="text" id="vendorService" name='service' placeholder="Service" required value={formData.service} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="vendorAvailability">Availability</label>
            <input type="text" id="vendorAvailability" name='availability' placeholder="Availability" required value={formData.availability} onChange={handleChange} />
          </div>
          <div className="agreement">
            <input type="checkbox" id="vendorAgreement" required />
            <label htmlFor="vendorAgreement">I agree to the terms and conditions</label>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
};

export default RegisterVendor;