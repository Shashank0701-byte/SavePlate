import React from "react";

function RestaurantCard({ name, location, availableMeals, imageUrl }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:scale-105 transition text-center">
      <img
        src={imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"}
        alt={name}
        className="w-32 h-32 object-cover rounded-full mb-3"
      />
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 mb-2">{location}</p>
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm mb-2">
        {availableMeals} Surplus meals
      </span>
      <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-bold">
        View Meals
      </button>
    </div>
  );
}

export default RestaurantCard;
