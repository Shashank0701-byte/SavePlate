import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Subtle Background Illustration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Abstract Food Line Art */}
          <svg 
            className="absolute top-20 right-10 w-32 h-32 text-gray-100 opacity-60" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor"
          >
            <circle cx="50" cy="30" r="8" strokeWidth="1.5"/>
            <path d="M42 30 Q50 45 58 30" strokeWidth="1.5"/>
            <rect x="35" y="50" width="30" height="20" rx="3" strokeWidth="1.5"/>
            <line x1="40" y1="75" x2="60" y2="75" strokeWidth="1.5"/>
          </svg>
          
          <svg 
            className="absolute bottom-32 left-16 w-24 h-24 text-gray-100 opacity-40" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor"
          >
            <circle cx="50" cy="50" r="20" strokeWidth="1.5"/>
            <path d="M35 50 Q50 35 65 50 Q50 65 35 50" strokeWidth="1.5"/>
          </svg>
          
          <svg 
            className="absolute top-1/3 left-1/4 w-20 h-20 text-gray-100 opacity-30" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor"
          >
            <rect x="30" y="40" width="40" height="30" rx="5" strokeWidth="1.5"/>
            <line x1="35" y1="50" x2="65" y2="50" strokeWidth="1.5"/>
            <line x1="35" y1="60" x2="55" y2="60" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8">
            Rescue Surplus.<br/>
            <span className="text-amber-600">Cut Food Waste.</span><br/>
            Enjoy Quality Meals.
          </h1>
          
          {/* Value Proposition */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Connect with local restaurants to save perfectly good food from going to waste. 
            Get quality meals at great prices while making a positive impact.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/meals"
              className="group bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[200px]"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore Meals
              </span>
            </Link>
            
            <Link
              to="/restaurant-signup"
              className="group bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[200px]"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                </svg>
                Join as Restaurant
              </span>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>2,50,000+ meals rescued</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>850+ restaurant partners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-coral-400 rounded-full"></div>
              <span>Zero food waste mission</span>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
      {/* Additional Sections Can Go Here */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Discover</h3>
              <p className="text-gray-600">Browse surplus meals from local restaurants near you</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Reserve</h3>
              <p className="text-gray-600">Book your meal and pay at discounted prices</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pickup</h3>
              <p className="text-gray-600">Collect your meal and enjoy while reducing waste</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
