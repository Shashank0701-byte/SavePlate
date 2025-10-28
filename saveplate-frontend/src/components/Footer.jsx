import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="text-2xl font-bold text-white">
                Save<span className="text-green-400">Plate</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Fighting food waste by connecting restaurants with surplus meals to customers 
              seeking delicious, discounted food. Join us in making a positive impact on the environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <span className="text-xl">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/meals" className="text-gray-400 hover:text-white transition-colors">
                  Find Meals
                </Link>
              </li>
              <li>
                <Link to="/restaurant" className="text-gray-400 hover:text-white transition-colors">
                  For Restaurants
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-400 hover:text-white transition-colors">
                  Food Safety
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">50K+</div>
              <div className="text-sm text-gray-400">Meals Rescued</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">200+</div>
              <div className="text-sm text-gray-400">Partner Restaurants</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">75T</div>
              <div className="text-sm text-gray-400">CO₂ Saved (kg)</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SavePlate. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made with 💚 for the planet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
