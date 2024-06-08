import React from 'react';
import Banner from '../components/Banner';
import PopularEvents from '../components/PopularEvent';
import CallVendor from '../components/CallVendor';
import PastEvent from '../components/PastEvent';

function Home() {
  return (
    <div>
      <Banner />
      <PopularEvents />
      <CallVendor />
      <PastEvent />
    </div>
  )
};

export default Home;