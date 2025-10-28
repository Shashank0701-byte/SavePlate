import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['reserved', 'paid', 'picked_up', 'completed', 'cancelled'], 
    default: 'reserved' 
  },
  
  // --- NEW FIELD ADDED HERE ---
  // This stores the customer's delivery location using MongoDB's built-in GeoJSON format
  deliveryLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // Stores as [longitude, latitude]
      required: true
    }
  }
  
}, { timestamps: true });

// --- NEW INDEX ADDED HERE ---
// This index is crucial for high-speed location-based queries (like finding orders in a zone)
orderSchema.index({ deliveryLocation: '2dsphere' });

export default mongoose.model('Order', orderSchema);