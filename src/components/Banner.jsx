import React, { useState, useEffect } from 'react';
import '../styles/Banner.css';

const images = [
  // Make sure these paths are correct
  require('../assets/2mkzw2cizeob1.jpg'),
  require('../assets/image2.png'),
  require('../assets/image3.jpeg'),
];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
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
  );
};

export default Banner;
