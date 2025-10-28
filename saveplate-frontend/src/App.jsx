import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ReservationPage from "./pages/ReservationPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/restaurant" element={<RestaurantDashboard />} />
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/meals" element={<CustomerDashboard />} />
            <Route path="/reservation/:id" element={<ReservationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
