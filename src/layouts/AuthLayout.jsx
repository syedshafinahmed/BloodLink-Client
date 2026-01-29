// import React from 'react';
// import { Outlet } from 'react-router';
// import auth from '../assets/auth.jpg';

// const AuthLayout = () => {
//   return (
//     <div className="min-h-screen min-w-screen bg-base-200">
//       <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2">

//         {/* Left Image Section */}
//         <div className="relative hidden md:flex items-center justify-center">
//           <img
//             src={auth}
//             alt="Blood Donation"
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-linear-to-br from-black/90 via-black/50 to-[#f9232c]/80" />
//         </div>

//         {/* Right Auth Form (Floating Right) */}
//         <div className="flex items-center justify-end px-6 md:px-16">
//           <div className="w-full max-w-md bg-base-200/10 backdrop-blur-2xl border border-base-200/20 rounded-2xl">
//             <Outlet />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AuthLayout;



import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-base-200">
      <img
        src="https://images.pexels.com/photos/6010792/pexels-photo-6010792.jpeg"
        alt="Blood Donation"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 right-0 h-full flex items-center pr-8 md:pr-20">
        <div className="w-full max-w-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
