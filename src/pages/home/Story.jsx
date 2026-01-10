import React from 'react';
import auth from '../../assets/auth.avif';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import gal1 from '../../assets/gal1.avif';
import gal2 from '../../assets/gal2.avif';
import gal3 from '../../assets/gal3.avif';
import gal4 from '../../assets/gal4.avif';
import gal5 from '../../assets/gal5.avif';
import gal6 from '../../assets/gal6.avif';

import { motion } from "framer-motion";
import CountUp from "react-countup";

import 'swiper/css';

const Story = () => {
  const images = [gal1, gal2, gal3, gal4, gal5, gal6];

  return (
    <div className='relative max-w-7xl mx-auto py-20 mb-10'>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
      </div>
      <div className='flex flex-col md:flex-row gap-10'>
        <motion.div
          className='flex-1'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex justify-center gap-10'>
            <section className='flex flex-col items-center hover:scale-110'>
              <h1 className='font-black text-center text-2xl md:text-5xl'>
                <CountUp end={50} duration={2} enableScrollSpy />+
              </h1>
              <p className='text-[#f9232c] text-center text-xs md:text-lg font-bold'>
                Blood Cooperations
              </p>
            </section>

            <section className='flex flex-col items-center hover:scale-110'>
              <h1 className='font-black text-center text-2xl md:text-5xl'>
                <CountUp end={100} duration={2} enableScrollSpy />+
              </h1>
              <p className='text-[#f9232c] text-center text-xs md:text-lg font-bold'>
                Expert Volunteers
              </p>
            </section>

            <section className='flex flex-col items-center hover:scale-110'>
              <h1 className='font-black text-center text-2xl md:text-5xl'>
                <CountUp end={500} duration={2} enableScrollSpy />+
              </h1>
              <p className='text-[#f9232c] text-center text-xs md:text-lg font-bold'>
                Blood Donations
              </p>
            </section>
          </div>

          <div className='flex gap-5 px-5 md:px-0 mt-10'>
            <motion.section
              className='w-1/2 py-10 px-5 md:p-10 bg-[#f9232c] md:h-80 text-base-200 flex flex-col rounded overflow-hidden'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className='transition-transform duration-300 ease-out hover:scale-110'>
                <h1 className='text-xs md:text-4xl font-black'>
                  Why we need you?
                </h1>
                <hr className='mt-2 md:mt-5 mb-2 md:mb-5' />
                <p className='text-xs md:text-sm text-justify line-clamp-3 md:line-clamp-none'>
                  A blood transfusion is required every two seconds. However, less than 5% donate blood. Our goal is to close that gap by making donations easy, secure, and fulfilling.
                </p>
              </div>
            </motion.section>

            <motion.section
              className='flex-1 overflow-hidden rounded'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img
                src={auth}
                alt=""
                className="w-full h-40 md:h-80 object-cover rounded transition-transform duration-300 ease-out hover:scale-120"
              />
            </motion.section>
          </div>
        </motion.div>

        <motion.div
          className='flex-1 w-full'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className='inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-[#f9232c]/10 font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30 shadow-sm whitespace-nowrap text-[#f9232c] text-xs text-center md:text-left mb-2 animate-pulse'>
            Our Story
          </h1>
          <p className='font-black text-4xl mb-4.5 text-center md:text-left leading-tight pl-2'>
            Dedicated to Life,<br />The Story of Our Initiative.
          </p>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            className="w-[600px] h-72 rounded overflow-hidden"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} className="w-full h-80">
                <img
                  src={img}
                  alt={`slide-${i}`}
                  className="w-[600px] h-72 object-cover transition-transform duration-300 ease-out hover:scale-110"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default Story;
