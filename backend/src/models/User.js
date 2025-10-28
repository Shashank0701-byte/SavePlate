import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  passwordHash: { type: String },
  role: { type: String, enum: ['customer', 'restaurant', 'partner', 'admin'], default: 'customer' },
  favorites: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);


