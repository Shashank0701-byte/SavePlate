import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockListings = [
  {
    id: 1,
    mealName: "Butter Chicken",
    originalPrice: 450,
    discountedPrice: 225,
    quantity: 5,
    pickupTime: "7:00 PM - 9:00 PM",
    status: "active",
    reserved: 2,
    createdAt: "2024-01-15T14:30:00Z"
  },
  {
    id: 2,
    mealName: "Vegetable Biryani",
    originalPrice: 380,
    discountedPrice: 190,
    quantity: 3,
    pickupTime: "6:30 PM - 8:30 PM",
    status: "active",
    reserved: 1,
    createdAt: "2024-01-15T15:00:00Z"
  }
];

const mockOrders = [
  {
    id: 1,
    customerName: "John Doe",
    mealName: "Butter Chicken",
    quantity: 1,
    amount: 225,
    status: "confirmed",
    pickupTime: "7:30 PM",
    qrCode: "QR123456"
  },
  {
    id: 2,
    customerName: "Jane Smith",
    mealName: "Vegetable Biryani",
    quantity: 1,
    amount: 190,
    status: "picked_up",
    pickupTime: "7:00 PM",
    qrCode: "QR789012"
  }
];

function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    mealName: "",
    originalPrice: "",
    discountedPrice: "",
    quantity: "",
    pickupTime: "",
    description: ""
  });

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setListings(mockListings);
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddMeal = (e) => {
    e.preventDefault();
    const meal = {
      id: Date.now(),
      ...newMeal,
      originalPrice: parseFloat(newMeal.originalPrice),
      discountedPrice: parseFloat(newMeal.discountedPrice),
      quantity: parseInt(newMeal.quantity),
      status: "active",
      reserved: 0,
      createdAt: new Date().toISOString()
    };
    
    setListings([...listings, meal]);
    setNewMeal({
      mealName: "",
      originalPrice: "",
      discountedPrice: "",
      quantity: "",
      pickupTime: "",
      description: ""
    });
    setShowAddMeal(false);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalMealsRescued = orders.length;
  const activeMeals = listings.filter(meal => meal.status === "active").length;

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalRevenue}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">🍽️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Meals Rescued</p>
              <p className="text-2xl font-bold text-gray-900">{totalMealsRescued}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-2xl">📋</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900">{activeMeals}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">CO₂ Saved</p>
              <p className="text-2xl font-bold text-gray-900">45kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowAddMeal(true)}
            className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 transition-colors"
          >
            <span className="text-2xl mr-2">➕</span>
            <span className="font-medium text-green-600">Add New Meal</span>
          </button>
          
          <Link
            to="/restaurant/orders"
            className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="text-2xl mr-2">📋</span>
            <span className="font-medium text-blue-600">View All Orders</span>
          </Link>
          
          <Link
            to="/restaurant/analytics"
            className="flex items-center justify-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <span className="text-2xl mr-2">📊</span>
            <span className="font-medium text-purple-600">View Analytics</span>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {orders.slice(0, 3).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.mealName} × {order.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{order.amount}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === "confirmed" ? "bg-yellow-100 text-yellow-600" :
                  order.status === "picked_up" ? "bg-green-100 text-green-600" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {order.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ListingsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Meal Listings</h3>
        <button
          onClick={() => setShowAddMeal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Add New Meal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((meal) => (
          <div key={meal.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-gray-900">{meal.mealName}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                meal.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
              }`}>
                {meal.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <div>
                  <span className="font-medium text-green-600">₹{meal.discountedPrice}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">₹{meal.originalPrice}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{meal.quantity - meal.reserved} available</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reserved:</span>
                <span className="font-medium">{meal.reserved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup:</span>
                <span className="font-medium">{meal.pickupTime}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                Edit
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const OrdersTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Order Management</h3>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">Pickup: {order.pickupTime}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.mealName}</div>
                    <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "confirmed" ? "bg-yellow-100 text-yellow-800" :
                      order.status === "picked_up" ? "bg-green-100 text-green-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {order.status === "confirmed" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "picked_up")}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Mark Picked Up
                      </button>
                    )}
                    <button className="text-blue-600 hover:text-blue-900">
                      View QR: {order.qrCode}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
              <p className="text-gray-600">Manage your surplus meals and orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Today's Revenue</p>
                <p className="text-lg font-semibold text-green-600">₹{totalRevenue}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6">
            <nav className="flex space-x-8">
              {[/* eslint-disable */
                { id: "overview", label: "Overview" },
                { id: "listings", label: "Meal Listings" },
                { id: "orders", label: "Orders" }
              /* eslint-enable */].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <>{/* eslint-disable */}
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "listings" && <ListingsTab />}
            {activeTab === "orders" && <OrdersTab />}
          {/* eslint-enable */}</>
        )}
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Meal</h3>
            <form onSubmit={handleAddMeal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Name
                </label>
                <input
                  type="text"
                  required
                  value={newMeal.mealName}
                  onChange={(e) => setNewMeal({...newMeal, mealName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newMeal.originalPrice}
                    onChange={(e) => setNewMeal({...newMeal, originalPrice: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sale Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newMeal.discountedPrice}
                    onChange={(e) => setNewMeal({...newMeal, discountedPrice: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity Available
                </label>
                <input
                  type="number"
                  required
                  value={newMeal.quantity}
                  onChange={(e) => setNewMeal({...newMeal, quantity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Time
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 6:00 PM - 8:00 PM"
                  value={newMeal.pickupTime}
                  onChange={(e) => setNewMeal({...newMeal, pickupTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMeal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantDashboard;
