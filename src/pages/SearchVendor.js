import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/Vendor.css';
import { useVendors } from '../components/VendorContext';

function SearchVendor() {
  const navigate = useNavigate();
  const { vendors } = useVendors();
  const [searchInput, setSearchInput] = useState('');
  const [filteredVendors, setFilteredVendors] = useState(vendors);

  useEffect(() => {
    setFilteredVendors(vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      vendor.service.toLowerCase().includes(searchInput.toLowerCase())
    ))
  }, [searchInput]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  const handleBooking = (vendorId) => {
    navigate('/vendor/booking', { state: { vendorId: vendorId } });
  };

  return (
    <div className='page-content'>
      <div className='back-and-search'>
        <Link to='/vendor' className='button'>Back</Link>
        <form id='search' action='#'>
          <input type='text' placeholder='Search Vendor' id='vendorSearch' name='searchKeyword' onChange={handleSearchChange} />
          <i></i>
        </form>
      </div>

      <div className='vendor-list'>
        <h2>List of Vendors</h2>
        <div className='vendor-container' id='allVendors'>
          {filteredVendors.length > 0 ? (
            filteredVendors.map(vendor => (
              <div className='vendor-card' key={vendor._id}>
                <img src={vendor.image} alt={vendor.name} />
                <div className='vendor-card.content' key={vendor._id}>
                  <h2>{vendor.name}</h2>
                  <p><strong>Address:</strong> {vendor.address}</p>
                  <button onClick={() => handleBooking(vendor._id)}>Book Now</button>
                </div>
              </div>
            )
          )) : (
            <p>No vendors found.</p>
          )}
        </div>
      </div>
    </div>
  )
};

export default SearchVendor;