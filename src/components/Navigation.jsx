import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {useAuth} from '../context/AuthContext';
import GetStartedModal from './GetStartedModal';

const {FiHome, FiUpload, FiBook, FiBrain, FiSettings, FiBarChart3, FiMenu, FiX, FiPlay, FiLogOut, FiLightbulb} = FiIcons;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const location = useLocation();
  const {logout} = useAuth();

  const navItems = [
    {path: '/', icon: FiHome, label: 'Dashboard'},
    {path: '/upload', icon: FiUpload, label: 'Upload'},
    {path: '/library', icon: FiBook, label: 'Content Library'},
    {path: '/insights', icon: FiBrain, label: 'Insights Database'},
    {path: '/recommendations', icon: FiLightbulb, label: 'Recommendations'},
    {path: '/integrations', icon: FiSettings, label: 'Integrations'},
    {path: '/analytics', icon: FiBarChart3, label: 'Analytics'},
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBrain} className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ContentAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-100 rounded-lg"
                      initial={false}
                      transition={{type: "spring", bounce: 0.2, duration: 0.6}}
                    />
                  )}
                  <SafeIcon icon={item.icon} className="text-sm relative z-10" />
                  <span className="text-sm font-medium relative z-10">{item.label}</span>
                </Link>
              ))}

              {/* Get Started Button */}
              <button
                onClick={() => setShowGetStarted(true)}
                className="ml-4 flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all"
              >
                <SafeIcon icon={FiPlay} className="text-sm" />
                <span className="text-sm">Get Started</span>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center space-x-2 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all"
              >
                <SafeIcon icon={FiLogOut} className="text-sm" />
                <span className="text-sm">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => setShowGetStarted(true)}
                className="flex items-center space-x-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-3 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all"
              >
                <SafeIcon icon={FiPlay} className="text-sm" />
                <span className="text-xs">Start</span>
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SafeIcon icon={isOpen ? FiX : FiMenu} className="text-xl" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              className="md:hidden py-4 border-t border-gray-200 bg-white"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Mobile Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="text-lg" />
                <span className="font-medium">Logout</span>
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Get Started Modal */}
      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </>
  );
};

export default Navigation;