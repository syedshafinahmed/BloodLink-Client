import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <BeatLoader color="#f9232c" />
    </div>
  );
};

export default Loading;