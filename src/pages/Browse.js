import React from 'react';
import FeaturedEvents from '../components/FeaturedEvents';
import TopArtist from '../components/TopArtist';
import AllEvents from '../components/AllEvents';
import '../styles/Browse.css'; // Import CSS for styling the container

const Browse = () => {
  return (
    <div className="browse-container">
      <div className="featured-and-artist-container">
        <FeaturedEvents />
        <TopArtist />
      </div>
      <div className="all-events-container">
        <AllEvents />
      </div>
    </div>
  );
};

export default Browse;
