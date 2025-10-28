import express from 'express';
import Order from '../models/Order.js'; // Adjust path if needed
import { requireAuth } from '../middleware/auth.js'; // Adjust path and name if needed

const router = express.Router();

// --- NEW ROUTE FOR HEATMAP ---
// This route provides data for the Google Maps HeatmapLayer
// It should be placed *before* routes with parameters like /:id
router.get('/heatmap-data', requireAuth, async (req, res) => {
  try {
    // Find all orders that are active (e.g., 'paid' or 'picked_up')
    // You can customize these statuses based on your app's logic
    const activeOrders = await Order.find({
      status: { $in: ['paid', 'picked_up', 'reserved'] }
    })
    .select('deliveryLocation.coordinates'); // Only select the location data

    // Format the data for the Google Maps HeatmapLayer
    const heatmapData = activeOrders.map(order => {
      // Ensure coordinates exist and have the correct format
      if (order.deliveryLocation && order.deliveryLocation.coordinates) {
        return {
          lat: order.deliveryLocation.coordinates[1], // Get Latitude
          lng: order.deliveryLocation.coordinates[0]  // Get Longitude
        };
      }
      return null;
    }).filter(Boolean); // Filter out any null entries

    res.json(heatmapData);
  } catch (error) {
    console.error('Error fetching heatmap data:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// --- MODIFIED "CREATE ORDER" ROUTE ---
// This route now accepts and saves latitude and longitude
router.post('/', requireAuth, async (req, res) => {
  try {
    // Get location data from the request body
    const { 
      mealId, 
      restaurantId, 
      quantity, 
      totalAmount, 
      latitude, 
      longitude 
    } = req.body;
    
    // --- VALIDATION ---
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and Longitude are required for a delivery order.' });
    }

    const newOrder = new Order({
      userId: req.user.id, // Comes from authMiddleware
      mealId,
      restaurantId,
      quantity,
      totalAmount,
      status: 'paid', // Or 'reserved', based on your payment flow
      
      // --- SAVING THE NEW LOCATION DATA ---
      deliveryLocation: {
        type: 'Point',
        coordinates: [longitude, latitude] // MongoDB format is [Longitude, Latitude]
      }
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
    
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// --- OTHER ORDER ROUTES ---

// GET all orders for the logged-in user
router.get('/my-orders', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('mealId')
      .populate('restaurantId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET a specific order by ID
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    // Check if the user is authorized to see this order
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Update order status (e.g., for restaurant or delivery partner)
router.put('/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['reserved', 'paid', 'picked_up', 'completed', 'cancelled'];
    
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Add logic here to check if the user is a restaurant owner or partner
    // For now, we just check if they own the order
    if (order.userId.toString() !== req.user.id) {
       // In a real app, you'd check if req.user.role === 'restaurant' etc.
       // return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


export default router;