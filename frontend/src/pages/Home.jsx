import React from 'react';
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gradient-start via-gradient-mid1 via-gradient-mid2 to-gradient-end px-10 py-8">
      <Hero/>
      <RecentlyAdded/>
    </div>
  );
}

export default Home;
