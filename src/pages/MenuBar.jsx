import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { X } from 'lucide-react';

const MenuBar = () => {
  const { menuOpen, setMenuOpen } = useGlobal();

  if (!menuOpen) return null;

  const handleMenuClick = () => setMenuOpen(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 flex flex-col items-start transition-all duration-500 px-6 sm:px-12 md:px-20 pt-20 w-full">
      <button
        onClick={handleMenuClick}
        className="absolute top-6 right-6 text-white hover:text-gray-300"
      >
        <X size={32} />
      </button>

      <ul className="w-full space-y-4 sm:space-y-6 md:space-y-8 text-white flex flex-col items-start justify-start h-full">
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/products", label: "Products" },
          { to: "/profile", label: "Profile" },
         
        ].map((item, index) => (
          <Link key={index} to={item.to} onClick={handleMenuClick} className="w-full">
            <li className="w-full transition-all duration-700 ease-in-out border-b-2 border-white rounded-md hover:bg-white hover:text-black px-2 py-2 
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
              hover:cursor-pointer">
              {item.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MenuBar;
