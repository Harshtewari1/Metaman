import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import MetamanLogo from '../assets/Metaman.png';
import { useGlobal } from '../context/GlobalContext.jsx';
import { Link, useLocation } from 'react-router-dom';  


const NavBar = () => {
  const { setMenuOpen } = useGlobal();
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const [visible, setVisible] = useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const location = useLocation();          
  const hideIconOnPaths = ['/address', '/checkoutform'];  

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollY.current) {
        setVisible(false); 
      } else {
        setVisible(true);  
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if current path is in hide list
  const shouldHideIcon = hideIconOnPaths.includes(location.pathname.toLowerCase());

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

      {!shouldHideIcon && (
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white hover:text-black hover:bg-white hover:p-3 hover:cursor-pointer rounded-full p-3 transition"
          aria-label="Open menu"
        >
          <Menu size={32} />
        </button>
      )}
    </nav>
  );
}

export default NavBar;
