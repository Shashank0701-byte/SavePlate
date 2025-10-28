import React from 'react';
import { Link } from 'react-router-dom';

function MealCard({ meal, showActions = true }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
      {/* Accent Color Bar for Discount */}
      <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
      
      <div className="p-6">
        {/* Restaurant Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
              <span className="text-xl">{meal.restaurantImage}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-base leading-tight">{meal.restaurantName}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                <div className="flex items-center space-x-1">
                  <span className="text-amber-400">★</span>
                  <span className="font-medium">{meal.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-400">📍</span>
                  <span>{meal.distance}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {meal.discount}% OFF
          </div>
        </div>

        {/* Meal Details */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 text-lg mb-2 leading-tight">{meal.mealName}</h4>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{meal.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {meal.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full font-medium border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Core Info Grid */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Pricing */}
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold text-gray-900">₹{meal.discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through">₹{meal.originalPrice}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Save ₹{meal.originalPrice - meal.discountedPrice}</div>
            </div>
            
            {/* Availability */}
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{meal.quantity} available</div>
              <div className="text-xs text-gray-500 mt-1">Pickup: {meal.pickupTime}</div>
            </div>
          </div>
          
          {/* Sustainability Score */}
          {meal.sustainabilityScore && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-emerald-500 text-sm">🌱</span>
                <span className="text-xs text-gray-600">Sustainability Score</span>
              </div>
              <div className="text-sm font-semibold text-emerald-600">{meal.sustainabilityScore}%</div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {showActions && (
          <Link
            to={`/reservation/${meal.id}`}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors text-center block font-semibold text-sm"
          >
            Reserve This Meal
          </Link>
        )}
      </div>
    </div>
  );
}

export default MealCard;
