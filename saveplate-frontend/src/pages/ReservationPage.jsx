import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

// Mock meal data
const mockMealData = {
  1: {
    id: 1,
    restaurantName: "Pasta Palace",
    restaurantImage: "🍝",
    mealName: "Creamy Alfredo Pasta",
    originalPrice: 450,
    discountedPrice: 225,
    discount: 50,
    quantity: 3,
    pickupTime: "6:00 PM - 8:00 PM",
    distance: "0.8 km",
    rating: 4.5,
    tags: ["Italian", "Vegetarian"],
    description: "Rich and creamy alfredo pasta with fresh herbs",
    restaurantAddress: "123 Food Street, Mumbai, Maharashtra 400001",
    restaurantPhone: "+91 98765 43210"
  },
  2: {
    id: 2,
    restaurantName: "Spice Garden",
    restaurantImage: "🍛",
    mealName: "Chicken Biryani",
    originalPrice: 380,
    discountedPrice: 190,
    discount: 50,
    quantity: 5,
    pickupTime: "7:00 PM - 9:00 PM",
    distance: "1.2 km",
    rating: 4.7,
    tags: ["Indian", "Non-Veg"],
    description: "Aromatic basmati rice with tender chicken pieces",
    restaurantAddress: "456 Spice Lane, Mumbai, Maharashtra 400002",
    restaurantPhone: "+91 98765 43211"
  }
};

function ReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("details"); // details, payment, confirmation
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });
  const [reservation, setReservation] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch meal details
    setTimeout(() => {
      const mealData = mockMealData[id];
      if (mealData) {
        setMeal(mealData);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessingPayment(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create reservation
      const newReservation = {
        id: `RES${Date.now()}`,
        mealId: meal.id,
        mealName: meal.mealName,
        restaurantName: meal.restaurantName,
        quantity: quantity,
        totalAmount: meal.discountedPrice * quantity,
        pickupTime: meal.pickupTime,
        qrCode: `QR${Date.now()}`,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        restaurantAddress: meal.restaurantAddress,
        restaurantPhone: meal.restaurantPhone
      };

      setReservation(newReservation);
      setStep("confirmation");
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading meal details...</p>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Meal Not Found</h2>
          <p className="text-gray-600 mb-6">The meal you're looking for doesn't exist or is no longer available.</p>
          <Link
            to="/customer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Other Meals
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = meal.discountedPrice * quantity;
  const savings = (meal.originalPrice - meal.discountedPrice) * quantity;

  const DetailsStep = () => (
    <div className="space-y-6">
      {/* Meal Details Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start space-x-4">
          <span className="text-4xl">{meal.restaurantImage}</span>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{meal.mealName}</h2>
            <p className="text-gray-600 mb-2">{meal.restaurantName}</p>
            <p className="text-sm text-gray-500 mb-3">{meal.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {meal.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Rating and Distance */}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>⭐ {meal.rating}</span>
              <span>📍 {meal.distance}</span>
              <span>🕐 {meal.pickupTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quantity and Pricing */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
        
        <div className="space-y-4">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(meal.quantity, quantity + 1))}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Price per item:</span>
              <div>
                <span className="font-medium text-green-600">₹{meal.discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through ml-2">₹{meal.originalPrice}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-green-600">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>You save:</span>
              <span>₹{savings}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/customer"
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg text-center hover:bg-gray-300 transition-colors"
        >
          Back to Browse
        </Link>
        <button
          onClick={() => setStep("payment")}
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );

  const PaymentStep = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{meal.mealName}</p>
            <p className="text-sm text-gray-600">{meal.restaurantName} • Qty: {quantity}</p>
          </div>
          <p className="text-lg font-bold text-green-600">₹{totalAmount}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        
        <div className="space-y-3 mb-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-green-600"
            />
            <span>💳 Credit/Debit Card</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-green-600"
            />
            <span>📱 UPI</span>
          </label>
        </div>

        {/* Payment Form */}
        {paymentMethod === "card" ? (
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                required
                value={paymentDetails.name}
                onChange={(e) => setPaymentDetails({...paymentDetails, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter cardholder name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                required
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  required
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  required
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={processingPayment}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processingPayment ? "Processing..." : `Pay ₹${totalAmount}`}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">UPI payment integration coming soon</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setStep("details")}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={processingPayment}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {processingPayment ? "Processing..." : `Pay ₹${totalAmount}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ConfirmationStep = () => (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center py-8">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h2>
        <p className="text-gray-600">Your meal has been reserved successfully.</p>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Pickup QR Code</h3>
        <div className="flex justify-center mb-4">
          <QRCodeSVG 
            value={JSON.stringify({
              reservationId: reservation.id,
              qrCode: reservation.qrCode,
              mealId: reservation.mealId,
              quantity: reservation.quantity
            })}
            size={200}
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Show this QR code at the restaurant for pickup
        </p>
        <p className="text-xs text-gray-500">
          QR Code: {reservation.qrCode}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/customer"
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg text-center hover:bg-gray-300 transition-colors"
        >
          Browse More Meals
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {step === "details" ? "Meal Details" :
                 step === "payment" ? "Payment" : "Confirmation"}
              </h1>
              <p className="text-sm text-gray-600">
                {step === "details" ? "Review your order" :
                 step === "payment" ? "Complete your payment" : "Your reservation is confirmed"}
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === "details" ? "bg-green-600 text-white" : "bg-green-100 text-green-600"
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 ${
              step === "payment" || step === "confirmation" ? "bg-green-600" : "bg-gray-200"
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === "payment" ? "bg-green-600 text-white" : 
              step === "confirmation" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"
            }`}>
              2
            </div>
            <div className={`flex-1 h-1 ${
              step === "confirmation" ? "bg-green-600" : "bg-gray-200"
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === "confirmation" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              3
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {step === "details" && <DetailsStep />}
        {step === "payment" && <PaymentStep />}
        {step === "confirmation" && <ConfirmationStep />}
      </div>
    </div>
  );
}
export default ReservationPage;
