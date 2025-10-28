import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'food_item.dart';
import 'food_item_card.dart';
import 'cart_service.dart';

class HomeFeedScreen extends StatefulWidget {
  const HomeFeedScreen({super.key});

  @override
  State<HomeFeedScreen> createState() => _HomeFeedScreenState();
}

class _HomeFeedScreenState extends State<HomeFeedScreen> {
  final ScrollController _scrollController = ScrollController();
  List<FoodItem> _foodItems = [];
  List<FoodItem> _filteredFoodItems = [];
  bool _isLoading = false;
  String _selectedCategory = 'All';
  final TextEditingController _searchController = TextEditingController();

  final List<String> _categories = [
    'All',
    'Breakfast',
    'Lunch',
    'Snacks',
    'Dinner',
    'Sweets',
    'Bakery'
  ];

  @override
  void initState() {
    super.initState();
    _loadInitialData();
    _scrollController.addListener(_onScroll);
    _searchController.addListener(_onSearchChanged);
  }

  void _loadInitialData() {
    setState(() {
      _foodItems = _getDummyData(10);
      _filteredFoodItems = _foodItems;
    });
  }

  void _onScroll() {
    if (_scrollController.position.pixels ==
            _scrollController.position.maxScrollExtent &&
        !_isLoading) {
      _loadMoreData();
    }
  }

  void _onSearchChanged() {
    _filterItems();
  }

  void _filterItems() {
    final searchQuery = _searchController.text.toLowerCase();
    setState(() {
      _filteredFoodItems = _foodItems.where((item) {
        final matchesCategory = _selectedCategory == 'All' ||
            item.category.toLowerCase() == _selectedCategory.toLowerCase();
        final matchesSearch = searchQuery.isEmpty ||
            item.foodName.toLowerCase().contains(searchQuery) ||
            item.restaurantName.toLowerCase().contains(searchQuery);
        return matchesCategory && matchesSearch;
      }).toList();
    });
  }

  Future<void> _loadMoreData() async {
    if (_isLoading) return;
    setState(() {
      _isLoading = true;
    });
    await Future.delayed(const Duration(seconds: 2));
    setState(() {
      _foodItems.addAll(_getDummyData(5));
      _filterItems();
      _isLoading = false;
    });
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    _searchController.removeListener(_onSearchChanged);
    _searchController.dispose();
    super.dispose();
  }

  Widget _buildCategoryChips() {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      height: 50,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: _categories.length,
        itemBuilder: (context, index) {
          final category = _categories[index];
          final isSelected = category == _selectedCategory;
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4.0),
            child: ChoiceChip(
              label: Text(category),
              selected: isSelected,
              onSelected: (selected) {
                if (selected) {
                  setState(() {
                    _selectedCategory = category;
                    _filterItems();
                  });
                }
              },
              selectedColor: theme.colorScheme.primary,
              labelStyle: TextStyle(
                color: isSelected
                    ? (isDark ? Colors.black : Colors.white)
                    : (isDark ? Colors.white : Colors.black),
              ),
              backgroundColor: isDark ? Colors.grey[800] : Colors.grey[200],
            ),
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final cart = Provider.of<CartService>(context);
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // --- Custom Header Container ---
            Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                border: Border.all(color: theme.colorScheme.primary, width: 1),
                borderRadius: const BorderRadius.only(
                  bottomLeft: Radius.circular(12),
                  bottomRight: Radius.circular(12),
                ),
              ),
              child: Column(
                children: [
                  // --- Custom App Bar Row ---
                  Row(
                    children: [
                      Icon(Icons.food_bank_rounded,
                          color: theme.colorScheme.primary, size: 28),
                      const SizedBox(width: 8),
                      Text(
                        'SavePlate',
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Spacer(),
                      // You can add an IconButton here if needed
                    ],
                  ),
                  const SizedBox(height: 16),
                  // --- Search Bar ---
                  TextField(
                    controller: _searchController,
                    decoration: InputDecoration(
                      hintText: 'Search restaurants or food...',
                      prefixIcon:
                          Icon(Icons.search, color: theme.colorScheme.primary),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12.0),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12.0),
                        borderSide:
                            BorderSide(color: theme.colorScheme.primary),
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),
                  // --- Category Chips ---
                  _buildCategoryChips(),
                ],
              ),
            ),
            // --- Food List ---
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                padding: const EdgeInsets.all(8.0),
                itemCount: _filteredFoodItems.length + (_isLoading ? 1 : 0),
                itemBuilder: (context, index) {
                  if (index == _filteredFoodItems.length) {
                    return const Center(
                      child: Padding(
                        padding: EdgeInsets.all(8.0),
                        child: CircularProgressIndicator(),
                      ),
                    );
                  }
                  final item = _filteredFoodItems[index];
                  return FoodItemCard(
                    item: item,
                    onAddToCart: () {
                      cart.addItem(item);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('${item.foodName} added to cart!'),
                          duration: const Duration(seconds: 2),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<FoodItem> _getDummyData(int count) {
    // This is just a helper, you can replace with your API call
    List<FoodItem> items = [];
    for (int i = 0; i < count; i++) {
      final id = 'item_${DateTime.now().millisecondsSinceEpoch}_$i';
      items.add(
        FoodItem(
          id: id,
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
          category: 'Dinner',
        ),
      );
      items.add(
        FoodItem(
          id: 'item_2_$id',
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
      );
      items.add(
        FoodItem(
          id: 'item_3_$id',
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
          category: 'Lunch',
        ),
      );
      items.add(
        FoodItem(
          id: 'item_4_$id',
          restaurantName: 'The Morning Bite',
          rating: 4.7,
          distance: 0.5,
          discount: '30% OFF',
          foodName: 'Idli Sambar',
          description: 'Steamed rice cakes with lentil soup',
          tags: ['South Indian', 'Vegetarian', 'Light'],
          newPrice: 70,
          oldPrice: 100,
          pickupTime: '7:00 AM - 10:00 AM',
          availableCount: 10,
          restaurantIcon: Icons.free_breakfast,
          category: 'Breakfast',
        ),
      );
    }
    return items.take(count).toList();
  }
}
