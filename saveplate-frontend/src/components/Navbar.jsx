import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ isAuthenticated }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Get user from localStorage if authenticated
  const user = isAuthenticated ? JSON.parse(localStorage.getItem('saveplate_user') || 'null') : null;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-xl sticky top-0 z-50 border-b-4 border-lime-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          {/* Enhanced Logo with Indian Flair */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 pulse-glow">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                  <span className="text-xs">🇮🇳</span>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                  SavePlate
                </span>
                <div className="text-xs text-amber-600 font-semibold">India's #1 Food Rescue</div>
              </div>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Show different navigation based on authentication */}
            {isAuthenticated ? (
              <>
                <Link 
                  to="/home" 
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 focus-visible ${
                    isActive('/home') 
                      ? 'text-white bg-gradient-to-r from-lime-500 to-green-600 shadow-lg' 
                      : 'text-gray-700 hover:text-lime-600 hover:bg-lime-50 hover:scale-105'
                  }`}
                >
                  🏠 Home
                </Link>
                <Link 
                  to="/meals" 
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 focus-visible ${
                    isActive('/meals') 
                      ? 'text-white bg-gradient-to-r from-lime-500 to-green-600 shadow-lg' 
                      : 'text-gray-700 hover:text-lime-600 hover:bg-lime-50 hover:scale-105'
                  }`}
                >
                  🍽️ Find Meals
                </Link>
                {user?.type === 'restaurant' && (
                  <Link 
                    to="/restaurant" 
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 focus-visible ${
                      isActive('/restaurant') 
                        ? 'text-white bg-gradient-to-r from-lime-500 to-green-600 shadow-lg' 
                        : 'text-gray-700 hover:text-lime-600 hover:bg-lime-50 hover:scale-105'
                    }`}
                  >
                    🏪 Dashboard
                  </Link>
                )}
              </>
            ) : (
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 focus-visible ${
                  isActive('/') 
                    ? 'text-white bg-gradient-to-r from-lime-500 to-green-600 shadow-lg' 
                    : 'text-gray-700 hover:text-lime-600 hover:bg-lime-50 hover:scale-105'
                }`}
              >
                🏠 Home
              </Link>
            )}
            
            {/* Auth Links with Enhanced Styling */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 focus-visible ${
                    isActive('/profile') 
                      ? 'text-white bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:scale-105'
                  }`}
                >
                  👤 Profile
                </Link>
                <button className="text-gray-700 hover:text-red-600 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:bg-red-50 hover:scale-105 focus-visible">
                  🚪 Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-lime-600 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:bg-lime-50 hover:scale-105 focus-visible"
                >
                  🔑 Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:scale-110 ripple-effect focus-visible"
                >
                  ✨ Join SavePlate!
                </Link>
              </div>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-lime-600 focus:outline-none focus:text-lime-600 p-3 rounded-full hover:bg-lime-50 transition-all duration-300 focus-visible"
              aria-label="Toggle navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-gradient-to-br from-lime-50 to-green-50 border-t-2 border-lime-200 rounded-b-2xl shadow-xl">
              <Link 
                to="/" 
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 focus-visible ${
                  isActive('/') 
                    ? 'text-white bg-gradient-to-r from-lime-500 to-green-600 shadow-lg' 
                    : 'text-gray-700 hover:text-lime-600 hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link 
                to="/meals" 
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 focus-visible ${
                  isActive('/meals') 
                    ? 'text-white bg-gradient-to-r from-lime-500 to-green-600 shadow-lg' 
                    : 'text-gray-700 hover:text-lime-600 hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                🍽️ Find Meals
              </Link>
              <Link 
                to="/restaurant" 
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 focus-visible ${
                  isActive('/restaurant') 
                    ? 'text-white bg-gradient-to-r from-lime-500 to-green-600 shadow-lg' 
                    : 'text-gray-700 hover:text-lime-600 hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                🏪 For Restaurants
              </Link>
              
              {/* Mobile Auth Links with Enhanced Styling */}
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className={`block px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 focus-visible ${
                      isActive('/profile') 
                        ? 'text-white bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg' 
                        : 'text-gray-700 hover:text-purple-600 hover:bg-white hover:shadow-md'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 Profile
                  </Link>
                  <button 
                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-gray-700 hover:text-red-600 hover:bg-white hover:shadow-md transition-all duration-300 focus-visible"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-4 py-3 rounded-xl text-base font-bold text-gray-700 hover:text-lime-600 hover:bg-white hover:shadow-md transition-all duration-300 focus-visible"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🔑 Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg ripple-effect focus-visible"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ✨ Join SavePlate!
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA for Mobile */}
      <div className="sticky-cta md:hidden">
        <Link 
          to="/meals" 
          className="w-14 h-14 bg-gradient-to-r from-lime-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl hover:scale-110 transition-all duration-300 pulse-glow"
          aria-label="Find meals"
        >
          🍽️
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
