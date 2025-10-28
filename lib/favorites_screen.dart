import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'favorites_service.dart';
import 'food_item_card.dart';
import 'cart_service.dart';
import 'food_item.dart'; // We need the full item, so we'll mock this for now

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({super.key});

  // In a real app, you'd fetch the full FoodItem objects from your database
  // using the IDs from FavoritesService.
  // For this demo, we'll just show a text list of IDs.
  // A better demo would be to pass the full food list here.

  @override
  Widget build(BuildContext context) {
    final favoritesService = Provider.of<FavoritesService>(context);
    // This is not efficient, but for a demo it shows the concept.
    // In a real app, you'd have a global list of all items or query by ID.
    final allItems = _getMockAllItems();
    final favoriteItems =
        allItems.where((item) => favoritesService.isFavorite(item.id)).toList();
    final cart = Provider.of<CartService>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Favorites'),
      ),
      body: favoriteItems.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.favorite_border,
                      size: 80, color: Colors.grey[400]),
                  const SizedBox(height: 16),
                  Text(
                    'No favorites yet',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 8),
                  const Text('Tap the heart on any item to save it here.'),
                ],
              ),
            )
          : ListView.builder(
              itemCount: favoriteItems.length,
              itemBuilder: (context, index) {
                final item = favoriteItems[index];
                return FoodItemCard(
                  item: item,
                  onAddToCart: () {
                    cart.addItem(item);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('${item.foodName} added to cart!'),
                        duration: const Duration(seconds: 1),
                        backgroundColor: Theme.of(context).primaryColor,
                      ),
                    );
                  },
                );
              },
            ),
    );
  }

  // Helper function to get a mock list of all items for demo
  List<FoodItem> _getMockAllItems() {
    return [
      FoodItem(
        id: '1',
        restaurantName: 'Coastal Spice',
        rating: 4.5,
        distance: 1.5,
        discount: '50% OFF',
        foodName: 'Fish Curry with Rice',
        description:
            'Kerala-style fish curry with coconut milk and steamed rice',
        tags: ['Coastal', 'Non-Veg', 'Coconut'],
        newPrice: 190,
        oldPrice: 380,
        pickupTime: '6:30 PM - 8:30 PM',
        availableCount: 2,
        restaurantIcon: Icons.restaurant,
        category: 'Lunch',
      ),
      FoodItem(
        id: '2',
        restaurantName: 'Chaat Bazaar',
        rating: 4.4,
        distance: 0.3,
        discount: '50% OFF',
        foodName: 'Pani Puri & Bhel Mix',
        description: 'Mumbai-style street food combo with chutneys and sev',
        tags: ['Street Food', 'Vegetarian', 'Tangy'],
        newPrice: 75,
        oldPrice: 150,
        pickupTime: '5:00 PM - 7:00 PM',
        availableCount: 6,
        restaurantIcon: Icons.storefront,
        category: 'Snacks',
      ),
      FoodItem(
        id: '3',
        restaurantName: 'Rajasthani Rasoi',
        rating: 4.3,
        distance: 2.1,
        discount: '50% OFF',
        foodName: 'Dal Baati Churma',
        description:
            'Traditional Rajasthani platter with baked wheat balls and sweet churma',
        tags: ['Rajasthani', 'Vegetarian', 'Traditional'],
        newPrice: 260,
        oldPrice: 520,
        pickupTime: '7:00 PM - 9:00 PM',
        availableCount: 4,
        restaurantIcon: Icons.ramen_dining,
        category: 'Dinner',
      ),
      FoodItem(
        id: '4',
        restaurantName: 'Beijing Bites',
        rating: 4.1,
        distance: 3.5,
        discount: '40% OFF',
        foodName: 'Hakka Noodles',
        description: 'Stir-fried noodles with fresh vegetables',
        tags: ['Chinese', 'Vegetarian'],
        newPrice: 150,
        oldPrice: 250,
        pickupTime: '6:00 PM - 8:00 PM',
        availableCount: 5,
        restaurantIcon: Icons.local_fire_department,
        category: 'Dinner',
      ),
      FoodItem(
        id: '5',
        restaurantName: 'Taco Bell',
        rating: 4.0,
        distance: 2.2,
        discount: '50% OFF',
        foodName: 'Crunchy Taco Combo',
        description: '2 crunchy tacos with a side of nachos',
        tags: ['Mexican', 'Fast Food'],
        newPrice: 200,
        oldPrice: 400,
        pickupTime: '4:00 PM - 6:00 PM',
        availableCount: 10,
        restaurantIcon: Icons.fastfood,
        category: 'Snacks',
      ),
      FoodItem(
        id: '6',
        restaurantName: 'A2B - Adyar Ananda Bhavan',
        rating: 4.6,
        distance: 1.2,
        discount: '30% OFF',
        foodName: 'Ghee Roast Dosa',
        description: 'Crispy rice pancake roasted with clarified butter.',
        tags: ['South Indian', 'Vegetarian', 'Breakfast'],
        newPrice: 90,
        oldPrice: 130,
        pickupTime: '8:00 AM - 10:00 AM',
        availableCount: 15,
        restaurantIcon: Icons.local_cafe,
        category: 'Breakfast',
      ),
    ];
  }
}
