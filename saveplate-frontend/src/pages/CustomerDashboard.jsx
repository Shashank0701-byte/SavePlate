import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { meals as mealsData } from "../data/meals";

function CustomerDashboard() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [location, setLocation] = useState("Detecting location...");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch meals
    setTimeout(() => {
      setMeals(mealsData);
      setLoading(false);
    }, 1000);

    // Mock geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Current Location");
        },
        () => {
          setLocation("Mumbai, Maharashtra");
        }
      );
    } else {
      setLocation("Mumbai, Maharashtra");
    }

    // Load favorites
    try {
      const fav = JSON.parse(localStorage.getItem('saveplate_favorites') || '[]');
      setFavorites(fav);
    } catch {}
  }, []);

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.mealName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && meal.tags.some(tag => 
      tag.toLowerCase().includes(selectedFilter.toLowerCase())
    );
  });

  const favoriteRestaurants = favorites
    .map(fr => meals.find(m => m.restaurantId === fr))
    .filter(Boolean)
    .reduce((acc, m) => {
      // unique by restaurantId
      if (!acc.some(x => x.restaurantId === m.restaurantId)) acc.push(m);
      return acc;
    }, []);

  const MealCard = ({ meal }) => (
    <div className="bg-white rounded-2xl professional-shadow hover:professional-shadow-lg transition-all duration-300 overflow-hidden subtle-hover border border-slate-200">
      {/* Clean Restaurant Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{meal.restaurantImage || "🏪"}</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">{meal.restaurantName}</h3>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-amber-200">⭐</span>
                <span className="text-sm font-semibold">{meal.rating}</span>
                <span className="text-xs opacity-75">({meal.reviews || 0} reviews)</span>
                <span className="text-sm opacity-75">• {meal.distance}</span>
              </div>
              <div className="text-xs opacity-90 flex items-center gap-1">
                <span>📍</span>
                <span>{meal.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-amber-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
              {meal.discount}% OFF
            </div>
            {meal.sustainabilityScore && (
              <div className="mt-2 text-xs opacity-90">
                🌱 {meal.sustainabilityScore}% Sustainable
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Meal Details */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">{meal.foodEmoji}</span>
            </div>
            <h4 className="font-bold text-xl text-slate-800">{meal.mealName}</h4>
          </div>
          <p className="text-slate-600 mb-4 leading-relaxed">{meal.description}</p>
          
          {/* Simple Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {meal.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium border border-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Professional Pricing */}
        <div className="flex items-center justify-between mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-slate-800">₹{meal.discountedPrice}</span>
            <span className="text-lg text-slate-500 line-through">₹{meal.originalPrice}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-600 font-semibold">
              Save ₹{meal.originalPrice - meal.discountedPrice}
            </div>
            <div className="text-xs text-slate-500">
              {meal.quantity} available
            </div>
          </div>
        </div>

        {/* Pickup Information */}
        <div className="flex items-center justify-center mb-6 p-3 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-center space-x-2 text-amber-700">
            <span className="text-lg">⏰</span>
            <span className="font-semibold">Pickup: {meal.pickupTime}</span>
          </div>
        </div>

        {/* Professional Reserve Button */}
        <Link
          to={`/reservation/${meal.id}`}
          className="w-full bg-[#e23744] text-white py-4 px-6 rounded-xl hover:bg-[#c81f2b] transition-colors duration-200 text-center block font-semibold text-lg professional-shadow subtle-hover"
        >
          Reserve Now
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Header */}
      <div className="bg-white border-b border-slate-200 professional-shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="logo-container mb-3">
                <div className="logo-icon">
                  <span>🍽️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    Discover Available Meals
                  </h1>
                  <p className="text-slate-600">Rescue surplus food from local restaurants</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <span className="text-sm">📍</span>
                <span className="font-medium">{location}</span>
                <div className="trust-indicator">
                  ✓ Verified Location
                </div>
              </div>
            </div>
            <Link
              to="/profile"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 professional-shadow subtle-hover font-semibold"
            >
              My Profile
            </Link>
          </div>

          {/* Professional Analytics Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 text-center professional-shadow subtle-hover">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <div className="text-3xl font-bold text-slate-800 count-up-smooth">1,247</div>
              <div className="text-sm text-slate-600 font-medium">Available Now</div>
              <div className="mt-2 text-xs text-green-600 font-semibold">
                +23% from yesterday
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center professional-shadow subtle-hover">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-3xl font-bold text-slate-800 count-up-smooth">₹45,000</div>
              <div className="text-sm text-slate-600 font-medium">Potential Savings</div>
              <div className="mt-2 text-xs text-amber-600 font-semibold">
                This month's opportunity
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center professional-shadow subtle-hover">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <div className="text-3xl font-bold text-slate-800 count-up-smooth">125kg</div>
              <div className="text-sm text-slate-600 font-medium">CO₂ Prevention</div>
              <div className="mt-2 text-xs text-green-600 font-semibold">
                Environmental impact
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center professional-shadow subtle-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏪</span>
              </div>
              <div className="text-3xl font-bold text-slate-800 count-up-smooth">850+</div>
              <div className="text-sm text-slate-600 font-medium">Partner Restaurants</div>
              <div className="mt-2 text-xs text-blue-600 font-semibold">
                Growing network
              </div>
            </div>
          </div>

          {/* Mission Progress Indicator */}
          <div className="bg-white rounded-2xl p-6 mb-8 professional-shadow mission-focus">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Community Impact</h3>
                  <p className="text-slate-600">You're part of India's food rescue movement</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-green-600 rounded-full progress-bar"></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">75% to next milestone</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="impact-badge mb-2">
                  Community Champion
                </div>
                <div className="text-sm text-slate-600">Keep making a difference!</div>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search for biryani, dosa, curry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-lime-200 rounded-2xl focus:ring-4 focus:ring-lime-200 focus:border-lime-500 text-lg font-medium bg-white shadow-lg focus-visible"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-lime-500 text-xl">🔍</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[
                { key: "all", label: "🍽️ All", emoji: "🍽️" },
                { key: "vegetarian", label: "🥬 Vegetarian", emoji: "🥬" },
                { key: "non-veg", label: "🍗 Non-Veg", emoji: "🍗" },
                { key: "south-indian", label: "🥞 South Indian", emoji: "🥞" },
                { key: "north-indian", label: "🍛 North Indian", emoji: "🍛" },
                { key: "street-food", label: "🥙 Street Food", emoji: "🥙" }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-3 rounded-full font-bold transition-all duration-300 focus-visible ${
                    selectedFilter === filter.key
                      ? "bg-gradient-to-r from-lime-500 to-green-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-lime-50 hover:text-lime-600 hover:scale-105 shadow-md"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      {favoriteRestaurants.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl p-6 professional-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Frequently ordered from</h2>
              <Link to="/customer" className="text-sm text-[#e23744] font-semibold">See all</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {favoriteRestaurants.slice(0, 6).map((m) => (
                <Link key={m.restaurantId} to={`/reservation/${m.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 border border-slate-200">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 grid place-items-center text-xl">{m.restaurantImage || '🏪'}</div>
                  <div>
                    <div className="font-semibold text-slate-800">{m.restaurantName}</div>
                    <div className="text-xs text-slate-500">Check today’s surplus</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{meals.length}</div>
              <div className="text-sm opacity-90">Available Meals</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹2,450</div>
              <div className="text-sm opacity-90">Total Savings Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Meals Rescued</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="animate-pulse">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No meals found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find more meals.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
