import React from 'react';
import { NavLink } from 'react-router-dom';
// FIX: Import Variants type from framer-motion to explicitly type animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Home, User, Settings, BarChart2, Briefcase } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: Home },
  { name: 'Profile', to: '/profile', icon: User },
  { name: 'Analytics', to: '/analytics', icon: BarChart2 },
  { name: 'Projects', to: '/projects', icon: Briefcase },
  { name: 'Settings', to: '/settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  // FIX: Explicitly type sidebarVariants as Variants. This tells TypeScript to expect
  // a specific literal type for properties like 'type' (e.g., 'spring') within the
  // transition object, resolving the type error.
  const sidebarVariants: Variants = {
    open: { width: '256px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { width: '80px', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.div
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        className={`fixed lg:relative h-full bg-light-card dark:bg-dark-card shadow-lg z-40 flex flex-col transition-colors duration-300`}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-gray-700">
          <motion.div
            animate={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'block' : 'none' }}
            transition={{ delay: 0.1 }}
            className="whitespace-nowrap"
          >
            <span className="text-2xl font-bold text-primary dark:text-indigo-400">AuraDash</span>
          </motion.div>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map(item => (
            <div key={item.name} className="relative group">
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="h-6 w-6 flex-shrink-0" />
                <motion.span 
                   animate={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'inline' : 'none', x: isOpen ? 0 : -10 }}
                   transition={{ delay: 0.1, duration: 0.2 }}
                   className="ml-4 font-medium whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              </NavLink>
              {!isOpen && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;