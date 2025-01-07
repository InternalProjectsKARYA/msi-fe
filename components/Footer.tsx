import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-2   text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-neutral-800  ">
      <div className="container mx-auto text-center">
        <p className="text-sm text-black dark:text-white ">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
