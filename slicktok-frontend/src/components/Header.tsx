import React from 'react';
import Logo from '../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className='flex justify-between items-center bg-white text-black'>
      <div className='flex items-center'>
        <img className="w-36" src={Logo} alt="Logo" />
      </div>
      <nav className='flex space-x-4'>
        <p>v0.0.1</p>
      </nav>
    </header>
  );
};

export default Header;
