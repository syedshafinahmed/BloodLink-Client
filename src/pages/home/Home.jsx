import React from 'react';
import Banner from './Banner';
import Feature from './Feature';
import Story from './Story';
import Contact from './Contact';
import BloodCompatibility from './BloodCompatibility';
import Testimonials from './Testimonials';
import ImpactStats from './ImpactStats';
import HowItWorks from './HowItWorks';
import Coverage from './Coverage';

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Feature></Feature>
      <BloodCompatibility></BloodCompatibility>
      <Story></Story>
      <Coverage></Coverage>
      <Contact></Contact>
    </div>
  );
};

export default Home;