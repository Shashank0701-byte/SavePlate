import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock user data
const mockUserData = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  type: 'customer',
  joinedDate: '2024-01-15',
  totalSavings: 2450,
  mealsRescued: 12,
  co2Saved: 18.5
};

const mockReservations = [
  {
    id: 'RES001',
    mealName: 'Butter Chicken',
    restaurantName: 'Spice Garden',
    amount: 225,
    status: 'completed',
    date: '2024-01-20',
    pickupTime: '7:30 PM'
  },
  {
    id: 'RES002',
    mealName: 'Margherita Pizza',
    restaurantName: 'Pizza Palace',
    amount: 180,
    status: 'upcoming',
    date: '2024-01-22',
    pickupTime: '6:00 PM'
  },
  {
    id: 'RES003',
    mealName: 'Veg Biryani',
    restaurantName: 'Biryani House',
    amount: 150,
    status: 'completed',
    date: '2024-01-18',
    pickupTime: '8:00 PM'
  }
];

function Profile() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser(mockUserData);
      setReservations(mockReservations);
      setEditData(mockUserData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(editData);
    setEditMode(false);
    // TODO: API call to update profile
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-gray-900">₹{user.totalSavings}</p>
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
              <p className="text-2xl font-bold text-gray-900">{user.mealsRescued}</p>
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
              <p className="text-2xl font-bold text-gray-900">{user.co2Saved}kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Your Impact</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌍</span>
              <div>
                <p className="font-medium text-gray-900">Environmental Champion</p>
                <p className="text-sm text-gray-600">You've helped reduce food waste significantly!</p>
              </div>
            </div>
            <div className="text-green-600 font-semibold">Level 3</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{user.mealsRescued}</p>
              <p className="text-sm text-gray-600">Meals from waste</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{user.co2Saved}kg</p>
              <p className="text-sm text-gray-600">CO₂ prevented</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Reservations</h3>
        <div className="space-y-3">
          {reservations.slice(0, 3).map((reservation) => (
            <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{reservation.mealName}</p>
                <p className="text-sm text-gray-600">{reservation.restaurantName} • {reservation.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{reservation.amount}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  reservation.status === "upcoming" ? "bg-yellow-100 text-yellow-600" :
                  reservation.status === "completed" ? "bg-green-100 text-green-600" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {reservation.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="#"
          className="block text-center mt-4 text-green-600 hover:text-green-700 font-medium"
        >
          View All Reservations
        </Link>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editMode ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData({...editData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Type:</span>
              <span className="font-medium capitalize">{user.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Member Since:</span>
              <span className="font-medium">{new Date(user.joinedDate).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🔒</span>
              <span>Change Password</span>
            </div>
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🔔</span>
              <span>Notification Settings</span>
            </div>
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📱</span>
              <span>Download App</span>
            </div>
          </button>
          <button className="w-full text-left p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🗑️</span>
              <span>Delete Account</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const ReservationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">All Reservations</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{reservation.mealName}</h4>
                      <p className="text-sm text-gray-600">{reservation.restaurantName}</p>
                      <p className="text-sm text-gray-500">
                        {reservation.date} • Pickup: {reservation.pickupTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{reservation.amount}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        reservation.status === "upcoming" ? "bg-yellow-100 text-yellow-800" :
                        reservation.status === "completed" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {reservation.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {reservation.status === 'upcoming' && (
                <div className="mt-4 flex space-x-3">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View QR Code
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    Cancel Reservation
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6">
            <nav className="flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "profile", label: "Profile" },
                { id: "reservations", label: "Reservations" }
              ].map((tab) => (
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
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "reservations" && <ReservationsTab />}
      </div>
    </div>
  );
}

export default Profile;
