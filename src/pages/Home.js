// import React from 'react';
// import Banner from '../components/Banner';
// import PopularEvents from '../components/PopularEvent';
// import CallVendor from '../components/AddEvent';
// import PastEvent from '../components/PastEvent';

// function Home() {
//   return (
//     <div>
//       <Banner />
//       <PopularEvents />
//       <CallVendor />
//       <PastEvent />
//     </div>
//   )
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import PopularEvents from '../components/PopularEvent';
import PastEvent from '../components/PastEvent';
import { useNavigate } from 'react-router-dom';
import '../styles/Events.css';

const images = [
  require('../assets/2mkzw2cizeob1.jpg'),
  require('../assets/image2.png'),
  require('../assets/image3.jpeg'),
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/add-event');
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="main-banner">
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot${currentImage === index ? ' active' : ''}`}
              onClick={() => setCurrentImage(index)}
            ></span>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="header-text">
              <h6>Welcome To Festella</h6>
              <h4><em>Browse</em> Our Latest Event Here</h4>
              <div className="main-button">
                <a href="browse.html" className="button-style">Browse Now</a>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
            .main-banner {
              background-image: url(${images[currentImage]});
              background-position: center center;
              background-size: cover;
              min-height: 380px;
              border-radius: 23px;
              padding: 80px 60px;
              position: relative;
            }
          `}
        </style>
      </div>

      {/* Popular Events Section */}
      <PopularEvents />

      {/* Vendor Call Section */}
      <div className="vendor-call-section">
        <div className="vendor-call-content">
          <h2>Are you hosting a Concert, Seminar or Sports Event? We can help!</h2>
          <button onClick={handleCreateEvent} className="create-event-button">
            <span className="plus-icon">+</span> Create Event Now
          </button>
          <p>Chat with us now to help you get started.</p>
        </div>
      </div>

      {/* Past Events Section */}
      <PastEvent />
    </div>
  );
}

export default Home;
