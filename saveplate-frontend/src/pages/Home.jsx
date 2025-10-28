import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [animatedStats, setAnimatedStats] = useState({
    mealsRescued: 0,
    co2Saved: 0,
    restaurants: 0,
    customers: 0
  });

  const [impactModalVisible, setImpactModalVisible] = useState(false);

  // Animate stats on component mount
  useEffect(() => {
    const targets = {
      mealsRescued: 125000,
      co2Saved: 2500,
      restaurants: 850,
      customers: 45000
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedStats({
        mealsRescued: Math.floor(targets.mealsRescued * progress),
        co2Saved: Math.floor(targets.co2Saved * progress),
        restaurants: Math.floor(targets.restaurants * progress),
        customers: Math.floor(targets.customers * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const showImpactModal = () => {
    setImpactModalVisible(true);
    setTimeout(() => setImpactModalVisible(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Local styles for custom utility classes used across sections */}
      <style>{`
        /* Subtle dotted background inspired by cultural motifs */
        .cultural-pattern { 
          background-image: radial-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px), radial-gradient(rgba(245, 158, 11, 0.06) 1px, transparent 1px);
          background-position: 0 0, 12px 12px;
          background-size: 24px 24px;
        }

        .thali-pattern {
          background-image: radial-gradient(circle at 12px 12px, rgba(16,185,129,0.08) 2px, transparent 2px), radial-gradient(circle at 36px 36px, rgba(245,158,11,0.06) 3px, transparent 3px);
          background-size: 48px 48px;
        }

        .professional-shadow { box-shadow: 0 6px 20px rgba(0,0,0,0.07); }
        .professional-shadow-lg { box-shadow: 0 12px 32px rgba(0,0,0,0.12); }

        .subtle-hover { transition: transform 220ms ease, box-shadow 220ms ease; }
        .subtle-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.12); }

        .fade-in { opacity: 0; animation: fadeInUp 700ms ease forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 10px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }

        .gentle-pulse { animation: gentlePulse 1.6s ease-in-out infinite; }
        @keyframes gentlePulse { 0%, 100% { opacity: 0.6; transform: translateY(0); } 50% { opacity: 1; transform: translateY(2px); } }

        .trust-indicator { 
          background: rgba(255,255,255,0.7);
          backdrop-filter: saturate(120%) blur(2px);
          border: 1px solid rgba(15,23,42,0.06);
          border-radius: 9999px;
          padding: 0.5rem 0.9rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .impact-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          background: linear-gradient(90deg, rgba(16,185,129,0.12), rgba(245,158,11,0.12));
          color: #0f172a;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .logo-container { display: inline-flex; align-items: center; gap: 0.9rem; }
        .logo-icon { 
          width: 56px; height: 56px; border-radius: 9999px; 
          display: grid; place-items: center; font-size: 1.5rem; 
          background: linear-gradient(135deg, #d1fae5, #fef3c7);
          box-shadow: 0 6px 18px rgba(0,0,0,0.08) inset, 0 6px 16px rgba(0,0,0,0.06);
        }

        .mission-focus { 
          background: linear-gradient(180deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02));
          border: 1px solid rgba(16,185,129,0.15);
        }

        .pulse-glow { position: relative; }
        .pulse-glow::after {
          content: "";
          position: absolute; inset: -8px;
          border-radius: 9999px;
          box-shadow: 0 0 0 0 rgba(16,185,129,0.25);
          animation: pulseGlow 1.8s ease-out infinite;
        }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.25); } 70% { box-shadow: 0 0 0 12px rgba(16,185,129,0); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); } }

        .ripple-effect { position: relative; overflow: hidden; isolation: isolate; }
        .ripple-effect::after {
          content: ""; position: absolute; inset: 0; border-radius: inherit; 
          background: radial-gradient(120px circle at var(--x,50%) var(--y,50%), rgba(16,185,129,0.25), transparent 40%);
          opacity: 0; transition: opacity 300ms ease;
        }
        .ripple-effect:active::after { opacity: 1; transition: opacity 600ms ease; }

        .count-up-smooth { will-change: contents; transition: color 200ms ease; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in, .gentle-pulse, .pulse-glow { animation: none !important; opacity: 1; }
          .subtle-hover:hover { transform: none; }
        }
      `}</style>
      {/* Hero Section - toned down, auto height on mobile */}
      <section className="relative bg-gradient-to-br from-slate-50 to-green-50 overflow-hidden cultural-pattern">
        {/* Subtle Cultural Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-8 w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">🍽️</span>
          </div>
          <div className="absolute top-32 right-16 w-12 h-12 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full flex items-center justify-center">
            <span className="text-xl">🌱</span>
          </div>
          <div className="absolute bottom-40 left-20 w-14 h-14 bg-gradient-to-br from-amber-200 to-amber-200 rounded-full flex items-center justify-center">
            <span className="text-xl">🤝</span>
          </div>
          <div className="absolute bottom-60 right-1/4 w-10 h-10 bg-gradient-to-br from-green-200 to-lime-200 rounded-full flex items-center justify-center">
            <span className="text-sm">🏪</span>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 md:min-h-[80vh] md:flex md:items-center">
          <div className="max-w-6xl mx-auto text-center">
            {/* Professional SavePlate Branding */}
            <div className="mb-12 fade-in">
              <div className="logo-container justify-center mb-8">
                <div className="logo-icon">
                  <span>🍽️</span>
                </div>
                <div className="text-left">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-800">SavePlate</h2>
                  <div className="impact-badge">
                    🇮🇳 India's #1 Food Rescue Platform
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-slate-800 fade-in" style={{animationDelay: '0.2s'}}>
              Rescue Food.<br/>
              <span className="text-green-700">Transform Lives.</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-slate-600 max-w-4xl mx-auto leading-relaxed fade-in" style={{animationDelay: '0.4s'}}>
              Connect with local restaurants to rescue surplus meals, reduce food waste, 
              and create meaningful impact in your community. Every meal saved makes a difference.
            </p>
            
            {/* Professional CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 fade-in" style={{animationDelay: '0.6s'}}>
              <button 
                onClick={showImpactModal}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 professional-shadow-lg subtle-hover"
              >
                Join Food Rescuers
              </button>
              
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 professional-shadow-lg subtle-hover"
              >
                Partner Restaurant
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="fade-in" style={{animationDelay: '0.8s'}}>
              <div className="flex flex-wrap justify-center gap-4 text-slate-600">
                <div className="trust-indicator">
                  ✓ 2,50,000+ Meals Rescued
                </div>
                <div className="trust-indicator">
                  ✓ 850+ Restaurant Partners
                </div>
                <div className="trust-indicator">
                  ✓ Verified & Secure
                </div>
              </div>
            </div>

            {/* Professional Impact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16 fade-in" style={{animationDelay: '1s'}}>
              <div className="bg-white rounded-2xl p-6 professional-shadow text-center subtle-hover">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div className="text-3xl font-bold text-slate-800 count-up-smooth">{animatedStats.mealsRescued.toLocaleString()}</div>
                <div className="text-sm text-slate-600 font-medium">Meals Rescued</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 professional-shadow text-center subtle-hover">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <div className="text-3xl font-bold text-slate-800 count-up-smooth">{animatedStats.co2Saved}kg</div>
                <div className="text-sm text-slate-600 font-medium">CO₂ Prevented</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 professional-shadow text-center subtle-hover">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏪</span>
                </div>
                <div className="text-3xl font-bold text-slate-800 count-up-smooth">{animatedStats.restaurants}</div>
                <div className="text-sm text-slate-600 font-medium">Partner Restaurants</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 professional-shadow text-center subtle-hover">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="text-3xl font-bold text-slate-800 count-up-smooth">{animatedStats.customers.toLocaleString()}</div>
                <div className="text-sm text-slate-600 font-medium">Community Members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Impact Modal */}
        {impactModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 professional-shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Welcome to SavePlate!</h3>
                <p className="text-slate-600 mb-6">
                  You're now part of India's largest food rescue community. Together, we're making a real difference.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="mission-focus p-3 rounded-lg">
                    <div className="font-semibold text-green-700">Your Impact</div>
                    <div className="text-slate-600">Every meal rescued</div>
                  </div>
                  <div className="mission-focus p-3 rounded-lg">
                    <div className="font-semibold text-green-700">Community</div>
                    <div className="text-slate-600">2,50,000+ members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll Indicator (hidden on mobile to avoid pushing layout) */}
        <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-600 gentle-pulse">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 font-medium">Learn More</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How SavePlate Works
          </h2>
          
          {/* For Customers */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-green-600 mb-8 text-center">
              For Food Lovers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h4 className="font-semibold mb-2">Discover</h4>
                <p className="text-gray-600 text-sm">Find surplus meals from restaurants near you</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h4 className="font-semibold mb-2">Reserve</h4>
                <p className="text-gray-600 text-sm">Book and pay for your meal instantly</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="font-semibold mb-2">QR Code</h4>
                <p className="text-gray-600 text-sm">Get your pickup QR code</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h4 className="font-semibold mb-2">Enjoy</h4>
                <p className="text-gray-600 text-sm">Pick up and enjoy your discounted meal</p>
              </div>
            </div>
          </div>

          {/* For Restaurants */}
          <div>
            <h3 className="text-2xl font-semibold text-orange-600 mb-8 text-center">
              For Restaurants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h4 className="font-semibold mb-2">List</h4>
                <p className="text-gray-600 text-sm">Quickly add surplus meals to your dashboard</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔔</span>
                </div>
                <h4 className="font-semibold mb-2">Get Orders</h4>
                <p className="text-gray-600 text-sm">Receive instant notifications for new orders</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h4 className="font-semibold mb-2">Verify</h4>
                <p className="text-gray-600 text-sm">Scan customer QR codes for pickup</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-semibold mb-2">Earn</h4>
                <p className="text-gray-600 text-sm">Recover revenue from surplus food</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Better Food Section - neutralized palette */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Floating Food Images */}
        <div className="absolute top-10 left-10 opacity-20">
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span className="text-6xl">🍔</span>
          </div>
        </div>
        <div className="absolute top-20 right-20 opacity-20">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span className="text-4xl">🥟</span>
          </div>
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-20">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span className="text-3xl">🍕</span>
          </div>
        </div>
        <div className="absolute bottom-32 right-1/3 opacity-20">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span className="text-2xl">🌮</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-8">
            Better food for<br />more people
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-16">
            For years, we've enabled our customers to discover surplus meals,
            rescued right from local restaurants at amazing prices
          </p>
          
          {/* Stats with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl mr-3">🏪</span>
                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-bold text-gray-700">500+</div>
                  <div className="text-gray-600 text-sm">restaurants</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl mr-3">📍</span>
                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-bold text-gray-700">25+</div>
                  <div className="text-gray-600 text-sm">cities</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl mr-3">📦</span>
                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-bold text-gray-700">1 million+</div>
                  <div className="text-gray-600 text-sm">meals rescued</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Waiting Section - neutral */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            What's waiting for you<br />on the app?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">
            Our app is packed with features that enable you to experience surplus food rescue like never before
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥬</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Eco-Friendly</h3>
              <p className="text-sm text-gray-600">Save the planet</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Real-time</h3>
              <p className="text-sm text-gray-600">Live updates</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Gourmet</h3>
              <p className="text-sm text-gray-600">Quality meals</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Offers</h3>
              <p className="text-sm text-gray-600">Great discounts</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Rewards</h3>
              <p className="text-sm text-gray-600">Earn points</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">QR Pickup</h3>
              <p className="text-sm text-gray-600">Contactless</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Quick Pickup</h3>
              <p className="text-sm text-gray-600">Fast service</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Reviews</h3>
              <p className="text-sm text-gray-600">Rate meals</p>
            </div>
          </div>
        </div>
      </section>

      {/* SavePlate Gold Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        {/* Gold coins decoration */}
        <div className="absolute top-10 left-10 animate-pulse">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 animate-pulse delay-300">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-3xl">⭐</span>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2">
              SavePlate
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-yellow-400">
              GOLD ⭐
            </h3>
          </div>
          
          <p className="text-yellow-200 text-lg mb-4">
            India's Top Savings Program for Food Lovers
          </p>
          
          <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg inline-block mb-8 font-bold">
            ⭐ GOLD BENEFITS ⭐
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/customer" 
              className="px-8 py-4 bg-yellow-400 text-black rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
            >
              Join SavePlate Gold
            </Link>
            <Link 
              to="/restaurant" 
              className="px-8 py-4 bg-transparent text-yellow-400 border-2 border-yellow-400 rounded-lg font-semibold text-lg hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Storytelling Section - Meals Rescued Today */}
      <section className="py-20 px-4 bg-gradient-to-br from-lime-50 to-green-50 thali-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              🇮🇳 <span className="text-lime-600">Meals Rescued</span> Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time impact across India - Every meal saved makes a difference!
            </p>
          </div>

          {/* Interactive India Map Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Map Visualization */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                🗺️ Live Food Rescue Map
              </h3>
              <div className="relative bg-gradient-to-br from-lime-100 to-green-200 rounded-2xl p-8 min-h-[300px] flex items-center justify-center">
                {/* Simplified India Map with Cities */}
                <div className="relative w-full h-full">
                  {/* Delhi */}
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 pulse-glow">
                    <div className="w-6 h-6 bg-lime-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      🏛️
                    </div>
                    <div className="text-xs font-semibold mt-1 text-center">Delhi<br/>2,450 meals</div>
                  </div>
                  
                  {/* Mumbai */}
                  <div className="absolute top-1/2 left-1/4 pulse-glow">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      🏢
                    </div>
                    <div className="text-xs font-semibold mt-1 text-center">Mumbai<br/>3,120 meals</div>
                  </div>
                  
                  {/* Bangalore */}
                  <div className="absolute bottom-1/3 left-1/2 pulse-glow">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      💻
                    </div>
                    <div className="text-xs font-semibold mt-1 text-center">Bangalore<br/>1,890 meals</div>
                  </div>
                  
                  {/* Chennai */}
                  <div className="absolute bottom-1/4 right-1/3 pulse-glow">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      🏛️
                    </div>
                    <div className="text-xs font-semibold mt-1 text-center">Chennai<br/>1,340 meals</div>
                  </div>
                  
                  {/* Kolkata */}
                  <div className="absolute top-1/3 right-1/4 pulse-glow">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      🎭
                    </div>
                    <div className="text-xs font-semibold mt-1 text-center">Kolkata<br/>980 meals</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🍽️</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-lime-600 count-up">12,450</div>
                    <div className="text-gray-600 font-semibold">Meals Rescued Today</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🌱</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 count-up">248kg</div>
                    <div className="text-gray-600 font-semibold">CO₂ Emissions Saved</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">💰</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-600 count-up">₹2,48,000</div>
                    <div className="text-gray-600 font-semibold">Customer Savings Today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Testimonials */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              💚 Stories from Our Community
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Customer Testimonial */}
              <div className="bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👩‍💼</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Priya Sharma</div>
                    <div className="text-sm text-gray-600">Software Engineer, Mumbai</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "SavePlate helped me save ₹15,000 last year while eating amazing food! Plus I'm helping the environment. Win-win! 🌟"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>

              {/* Restaurant Testimonial */}
              <div className="bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Chef Rajesh</div>
                    <div className="text-sm text-gray-600">Spice Garden, Delhi</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "We've rescued over 5,000 meals and earned ₹2 lakhs extra revenue. SavePlate is a game-changer for restaurants! 🚀"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>

              {/* Impact Testimonial */}
              <div className="bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Environmental Impact</div>
                    <div className="text-sm text-gray-600">Real Change</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Together, we've prevented 50 tons of food waste and saved 1,000kg of CO₂ emissions. Every meal matters! 🌱"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-400">🌟</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - toned down */}
      <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
        {/* Indian cultural decorations */}
        <div className="absolute top-10 left-10 animate-pulse">
          <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center">
            <span className="text-2xl">🪔</span>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 animate-pulse delay-300">
          <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center">
            <span className="text-3xl">🕉️</span>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">
              Join the Movement
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-rose-300">
              Save Food, Change Lives! 🇮🇳
            </h3>
          </div>
          
          <p className="text-green-100 text-lg mb-4">
            Be part of India's largest food rescue community
          </p>
          
          <div className="bg-[#e23744] text-white px-6 py-3 rounded-lg inline-block mb-8 font-bold">
            🍽️ START SAVING TODAY
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/meals" 
              className="group px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-xl hover:bg-slate-100 transition-colors shadow-2xl ripple-effect"
            >
              <span className="flex items-center justify-center gap-3">
                🍽️ Find Meals Now
                <span className="group-hover:animate-bounce">→</span>
              </span>
            </Link>
            <Link 
              to="/register" 
              className="group px-12 py-5 bg-transparent text-white border-2 border-white rounded-full font-bold text-xl hover:bg-white hover:text-slate-900 transition-colors ripple-effect"
            >
              <span className="flex items-center justify-center gap-3">
                🏪 Partner With Us
                <span className="group-hover:animate-bounce">🤝</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
