import { Router } from 'express';
import Meal from '../models/Meal.js';
import Restaurant from '../models/Restaurant.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public: list active meals
router.get('/', async (req, res) => {
  const meals = await Meal.find({ status: 'active' }).sort({ createdAt: -1 }).limit(100);
  res.json({ meals });
});

// Protected: restaurant owner creates a meal
router.post('/', requireAuth, async (req, res) => {
  try {
    const { restaurantId, mealName, originalPrice, discountedPrice, quantity, pickupTime, description, tags } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    const meal = await Meal.create({ restaurantId, mealName, originalPrice, discountedPrice, quantity, pickupTime, description, tags });
    res.status(201).json({ meal });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Protected: update status/quantity
router.patch('/:id', requireAuth, async (req, res) => {
  const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!meal) return res.status(404).json({ error: 'Meal not found' });
  res.json({ meal });
});

export default router;


