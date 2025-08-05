import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Home, Users, Camera, Phone, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import tournamentLogo from '../assets/ragelogo2.webp';

const isSorted = false; // Set to true when your storage is sorted
const Navigation = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'registration', label: 'Register', icon: Users },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'contact', label: 'Contact', icon: Phone }
  ].filter(item => item.id !== 'gallery' || isSorted);
;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (pageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer space-x-2" 
            onClick={() => handleNavigation('home')}
          >
            <img 
              src={tournamentLogo} 
              alt="Tournament Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-lg font-bold text-gray-900 leading-tight">
                Rage Premier 7s Malayalee Cup
              </h1>
              <p className="text-xs  text-gray-600 leading-tight">
                CHAPTER ONE 2025
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <Button 
              className="btn-onam"
              onClick={() => handleNavigation('registration')}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Register Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-md transition-colors ${
                        currentPage === item.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
                <div className="px-4 pt-2">
                  <Button 
                    className="w-full btn-onam"
                    onClick={() => handleNavigation('registration')}
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Register Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;

