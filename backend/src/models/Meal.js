import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  mealName: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  pickupTime: { type: String },
  description: { type: String },
  tags: [{ type: String }],
  status: { type: String, enum: ['active', 'inactive', 'sold'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Meal', mealSchema);


