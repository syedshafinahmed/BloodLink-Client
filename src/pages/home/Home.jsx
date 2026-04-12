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
import ScrollToTop from '../../components/ScrollToTop';

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Feature></Feature>
      <BloodCompatibility></BloodCompatibility>
      <Story></Story>
      <Testimonials></Testimonials>
      <Coverage></Coverage>
      <Contact></Contact>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default Home;