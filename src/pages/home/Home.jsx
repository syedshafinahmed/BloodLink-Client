import React from 'react';
import Banner from './Banner';
import Feature from './Feature';
import Story from './Story';
import Contact from './Contact';
import BloodCompatibility from './BloodCompatibility';
import Testimonials from './Testimonials';
import ImpactStats from './ImpactStats';
import HowItWorks from './HowItWorks';

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Feature></Feature>
      <BloodCompatibility></BloodCompatibility>
      <Story></Story>
      {/* <Testimonials></Testimonials> */}
      {/* <ImpactStats></ImpactStats> */}
      <Contact></Contact>
    </div>
  );
};

export default Home;