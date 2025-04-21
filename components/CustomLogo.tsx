import React from 'react';
import logo from '../public/EFANISH LOGO.png';
import Image from 'next/image';

const CustomLogo = ({ height, width }) => {
  return (
    <div>
      <Image
        src={logo}
        alt="logo"
       className={`h-${height} w-${width}`}
      />
    </div>
  );
};

export default CustomLogo;
