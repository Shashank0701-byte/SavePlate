import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ReservationPage from "./pages/ReservationPage";
import OrderTracking from "./pages/OrderTracking";
import DeliveryHeatmap from "./pages/DeliveryHeatmap";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerDashboard from "./pages/PartnerDashboard";

function App() {
  // Simple authentication state (you can replace with proper auth later)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} />
        <main className="flex-1">
          <Routes>
            {/* Landing page as the main route */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Authentication routes */}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
            
            {/* Protected routes - Home page after authentication */}
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/restaurant" element={<RestaurantDashboard />} />
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/meals" element={<CustomerDashboard />} />
            <Route path="/reservation/:id" element={<ReservationPage />} />
            <Route path="/track" element={<OrderTracking />} />
            <Route path="/partner/heatmap" element={<DeliveryHeatmap />} />
            <Route path="/partner/login" element={<PartnerLogin />} />
            <Route path="/partner/dashboard" element={<PartnerDashboard />} />
            
            {/* Restaurant signup route */}
            <Route path="/restaurant-signup" element={<Register userType="restaurant" setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
