import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme, user, logout } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const goToProfile = () => {
    setDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <header className="h-16 bg-light-card dark:bg-dark-card flex items-center justify-between px-4 md:px-8 shadow-sm border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
      <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <Menu size={24} />
      </button>
      <div className="hidden lg:block">
        {/* Can add breadcrumbs or search bar here */}
      </div>
      <div className="flex items-center space-x-4">
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>
        <div className="relative">
          <motion.button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <Avatar name={user?.name || ''} className="w-8 h-8" />
            <span className="hidden md:block font-medium">{user?.name}</span>
          </motion.button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-light-card dark:bg-dark-card rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
              >
                <button onClick={goToProfile} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <User size={16} className="mr-2"/> Profile
                </button>
                <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <LogOut size={16} className="mr-2"/> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;