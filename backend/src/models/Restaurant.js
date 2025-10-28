import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  ownerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], default: [0,0] } }
}, { timestamps: true });

restaurantSchema.index({ location: '2dsphere' });

export default mongoose.model('Restaurant', restaurantSchema);


