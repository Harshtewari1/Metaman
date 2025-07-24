import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import MetamanLogo from '../assets/Metaman.png';
import { useGlobal } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { setMenuOpen } = useGlobal();
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const [visible, setVisible] = useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    handleResize(); // set on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollY.current) {
        setVisible(false); // scroll down -> hide
      } else {
        setVisible(true);  // scroll up -> show
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`w-full pt-3 px-10 flex justify-between items-center fixed top-0 left-0 z-50 transition-transform duration-500
        ${visible ? 'translate-y-0' : '-translate-y-full'}
        ${visible && isMobileOrTablet ? 'bg-black' : 'bg-transparent'}
      `}
    >
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={MetamanLogo}
            alt="Metaman Logo"
            className="h-24 w-auto filter brightness-800 cursor-pointer"
          />
        </Link>

      </div>

      <button
        onClick={() => setMenuOpen(true)}
        className="text-white hover:text-black hover:bg-white hover:p-3 hover:cursor-pointer rounded-full p-3 transition"
      >
        <Menu size={32} />
      </button>
    </nav>
  );
}


export default Navbar;