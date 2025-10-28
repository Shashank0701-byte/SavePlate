import React from "react";

function MealList({ meals, onReserve }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <div key={meal.id} className="bg-white p-4 rounded shadow flex flex-col items-center">
          <img
            src={meal.imageUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836"}
            alt={meal.name}
            className="w-28 h-28 rounded mb-3 object-cover"
          />
          <h4 className="text-lg font-bold mb-1">{meal.name}</h4>
          <p className="text-gray-500 mb-2">{meal.description}</p>
          <div className="font-semibold text-green-700 mb-2">₹{meal.price}</div>
          <button
            className="px-4 py-1 bg-green-500 text-white hover:bg-green-600 rounded font-bold"
            onClick={() => onReserve(meal.id)}
          >
            Reserve
          </button>
        </div>
      ))}
    </div>
  );
}

export default MealList;
