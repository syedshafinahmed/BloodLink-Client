import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-base-200">
      <img
        src="https://images.pexels.com/photos/6010792/pexels-photo-6010792.jpeg"
        alt="Blood Donation"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#f9232c]/20 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-white/20 via-black/50 to-black" />

      <div className="absolute top-0 left-0 h-full flex items-center pl-8 md:pl-20 z-30">
        <div className="w-full max-w-xl">
          <Outlet />
        </div>
      </div>

      <div className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 max-w-xl z-20 hidden lg:block">

        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
          Donate Blood.<br />
          <span className="text-[#f9232c]">Save Lives.</span>
        </h1>

        <p className="mt-6 text-white/80 text-lg leading-relaxed">
          Be part of a life-saving network that ensures safe and timely blood access
          for patients across the country.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-lg">
            <p className="text-2xl font-black text-white">1 Donor</p>
            <p className="text-xs text-white/70 mt-1">Can save up to 3 lives</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-lg">
            <p className="text-2xl font-black text-white">Every 2 sec</p>
            <p className="text-xs text-white/70 mt-1">Someone needs blood</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-lg">
            <p className="text-2xl font-black text-white">38%</p>
            <p className="text-xs text-white/70 mt-1">Emergency shortages</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-lg">
            <p className="text-2xl font-black text-white">24/7</p>
            <p className="text-xs text-white/70 mt-1">Urgent requests</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
