import React from 'react';
import { Link } from 'react-router-dom';

function MealCard({ meal, showActions = true }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-4">
        {/* Restaurant Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{meal.restaurantImage}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{meal.restaurantName}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>⭐ {meal.rating}</span>
                <span>•</span>
                <span>📍 {meal.distance}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
              {meal.discount}% OFF
            </div>
          </div>
        </div>

        {/* Meal Details */}
        <div className="mb-3">
          <h4 className="font-medium text-gray-900 mb-1">{meal.mealName}</h4>
          <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {meal.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-green-600">₹{meal.discountedPrice}</span>
            <span className="text-sm text-gray-500 line-through">₹{meal.originalPrice}</span>
          </div>
          <div className="text-sm text-gray-500">
            {meal.quantity} left
          </div>
        </div>

        {/* Pickup Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>🕐</span>
            <span>Pickup: {meal.pickupTime}</span>
          </div>
        </div>

        {/* Action Button */}
        {showActions && (
          <Link
            to={`/reservation/${meal.id}`}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block font-medium"
          >
            Reserve Now
          </Link>
        )}
      </div>
    </div>
  );
}

export default MealCard;
