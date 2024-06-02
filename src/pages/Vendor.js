import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import '../styles/Vendor.css';
import { useVendors } from '../components/VendorContext';

function Vendor() {
  const { vendors } = useVendors();
  const navigate = useNavigate();
  const [popularVendors, setPopularVendors] = useState([]);

  useEffect(() => {
    if (vendors.length > 0 && popularVendors.length === 0) {
      const shuffledVendors = shuffleArray([...vendors]);
      setPopularVendors(shuffledVendors.slice(0, 3));
    }
  }, [vendors]);

  const handleBooking = (vendorId) => {
    navigate('/vendor/booking', { state: { vendorId: vendorId } });
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className='page-content'>
      <div className='search-and-register'>
        <Link to='/vendor/search' className='button'>Search Vendor</Link>
        <Link to='/vendor/register' className='button'>Register Vendor</Link>
      </div>
      <div className='vendor-list'>
        <h2>Popular Vendors</h2>
        <div className='vendor-container' id='popularVendors'>
          {popularVendors.map(vendor => (
            <div className='vendor-card' key={vendor._id}>
              <img src={vendor.image} alt={vendor.name} />
              <div className='vendor-card.content' key={vendor._id}>
                <h2>{vendor.name}</h2>
                <p><strong>Address:</strong> {vendor.address}</p>
                <button onClick={() => handleBooking(vendor._id)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Vendor;

// const shuffleArray = (array) => {
//   let currentIndex = array.length, randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//   }

//   return array.slice(0, 3);
// };

// const randomVendors = shuffleArray([...vendors]);