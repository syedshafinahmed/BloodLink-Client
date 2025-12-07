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

import 'swiper/css';

const Story = () => {
  const images = [gal1, gal2, gal3, gal4, gal5, gal6];

  return (
    <div className='max-w-7xl mx-auto mt-30 mb-30'>
      <div className='flex flex-col md:flex-row gap-10'>
        <motion.div className='flex-1' initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}>
          <div className='flex justify-center gap-10'>
            <section className='flex flex-col items-center'>
              <h1 className='font-black text-5xl'>50+</h1>
              <p className='text-primary font-bold'>Blood Cooperations</p>
            </section>
            <section className='flex flex-col items-center'>
              <h1 className='font-black text-5xl'>100+</h1>
              <p className='text-primary font-bold'>Expert Volunteers</p>
            </section>
            <section className='flex flex-col items-center'>
              <h1 className='font-black text-5xl'>500+</h1>
              <p className='text-primary font-bold'>Blood Donations</p>
            </section>
          </div>

          <div className='flex gap-5 px-5 md:px-0 mt-10'>
            <motion.section className='w-1/2 p-10 bg-primary h-80 rounded text-base-200 flex flex-col' initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h1 className='text-4xl font-black'>Why we need you?</h1>
              <hr className='mt-5 mb-5' />
              <p className='text-sm text-justify'>A blood transfusion is required every two seconds. However, less than 5% donate blood. Our goal is to close that gap by making donations easy, secure, and fulfilling.</p>
            </motion.section>

            <motion.section className='flex-1' initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <img src={auth} alt="" className="w-full h-80 object-cover rounded" />
            </motion.section>
          </div>
        </motion.div>

        <motion.div
          className='flex-1 w-full' initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 className='text-primary font-black text-2xl text-center md:text-left mb-2 pl-2'>Our Story</h1>
          <p className='font-black text-3xl mb-7 text-center md:text-left leading-tight pl-2'>Dedicated to Life,<br />The Story of Our Blood Drive Initiative.</p>

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
                <img src={img} alt={`slide-${i}`} className="w-[600px] h-72 object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default Story;
