import React from 'react';
import useAuth from '../hooks/useAuth';

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <section className='pb-5'>
      <h1 className="text-center font-bold text-gray-900 text-3xl md:text-4xl mb-2">Welcome,{" "}<span className="text-primary">{user.displayName}</span></h1>
      <p className="text-center text-lg md:text-xl text-gray-600">Your generosity helps save lives every day.</p>
    </section>
  );
};

export default DashboardHome;