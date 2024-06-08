import React from 'react';
import './TopArtist.css';

// Importing images
import imageSolo from '../assets/images/Solo.png';
import imageApeng from '../assets/images/Apeng.jpg';
import imageMessi from '../assets/images/Messi.jpg';

const TopArtist = () => {
  return (
    <div className="top-artist">
      <div className="heading-section">
        <h4><em>Top</em> Artist</h4>
      </div>
      <ul>
        <li>
          <img src={imageSolo} alt="Arise" />
          <div>
            <h4>Arise</h4>
            <h6>Solo Leveling</h6>
          </div>
          <span><i className="fa fa-star" style={{ color: 'yellow' }}></i> 5</span>
          <span><i className="fa fa-play" style={{ color: '#ec6090' }}></i> 3K</span>
        </li>
        <li>
          <img src={imageApeng} alt="Aq Seorang Hesmes" />
          <div>
            <h4>Aq Seorang Hesmes</h4>
            <h6>Apeng</h6>
          </div>
          <span><i className="fa fa-star" style={{ color: 'yellow' }}></i> 6.9</span>
          <span><i className="fa fa-play" style={{ color: '#ec6090' }}></i> 1K</span>
        </li>
        <li>
          <img src={imageMessi} alt="The Goat" />
          <div>
            <h4>The Goat</h4>
            <h6>Massi</h6>
          </div>
          <span><i className="fa fa-star" style={{ color: 'yellow' }}></i> 3</span>
          <span><i className="fa fa-play" style={{ color: '#ec6090' }}></i> 0.5K</span>
        </li>
      </ul>
      <div className="text-button">
        <a href="profile.html">And more to come</a>
      </div>
    </div>
  );
};

export default TopArtist;
