import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'food_item.dart';
import 'favorites_service.dart';

class FoodItemCard extends StatelessWidget {
  final FoodItem item;
  final VoidCallback onAddToCart;

  const FoodItemCard({
    super.key,
    required this.item,
    required this.onAddToCart,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final favoritesService = Provider.of<FavoritesService>(context);
    final isFavorite = favoritesService.isFavorite(item.id);
    final isDark = theme.brightness == Brightness.dark;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // --- Restaurant Header ---
            Row(
              children: [
                CircleAvatar(
                  backgroundColor: colorScheme.primary.withOpacity(0.1),
                  child: Icon(item.restaurantIcon, color: colorScheme.primary),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.restaurantName,
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Row(
                        children: [
                          Icon(
                            Icons.star,
                            color: colorScheme.secondary,
                            size: 16,
                          ),
                          Text(
                            ' ${item.rating} (0 reviews) • ${item.distance} km',
                            style: theme.textTheme.bodyMedium,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: colorScheme.secondary.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    item.discount,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: colorScheme.secondary,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(
                    isFavorite ? Icons.favorite : Icons.favorite_border,
                    color: isFavorite ? Colors.red : Colors.grey,
                  ),
                  onPressed: () {
                    favoritesService.toggleFavorite(item);
                  },
                ),
              ],
            ),
            const Divider(height: 24),

            // --- Food Item Details ---
            Text(
              item.foodName,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            Text(item.description, style: theme.textTheme.bodyMedium),
            const SizedBox(height: 12),

            // --- Tags ---
            Wrap(
              spacing: 8.0,
              runSpacing: 4.0,
              children: item.tags
                  .map(
                    (tag) => Chip(
                      label: Text(tag),
                      backgroundColor: isDark
                          ? Colors.grey[700]
                          : Colors.grey[200], // FIX: Dynamic chip color
                      labelStyle: theme.textTheme.bodySmall,
                      padding: EdgeInsets.zero,
                    ),
                  )
                  .toList(),
            ),
            const SizedBox(height: 16),

            // --- Price & Pickup ---
            Row(
              children: [
                Text(
                  '₹${item.newPrice}',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  '₹${item.oldPrice}',
                  style: theme.textTheme.titleMedium?.copyWith(
                    decoration: TextDecoration.lineThrough,
                    color: isDark
                        ? Colors.grey[500]
                        : Colors.grey[600], // FIX: Dynamic old price color
                  ),
                ),
                const Spacer(),
                Text(
                  'Save ₹${item.oldPrice - item.newPrice}',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: colorScheme.primary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isDark
                    ? colorScheme.primary.withOpacity(0.2)
                    : colorScheme.primary
                        .withOpacity(0.1), // FIX: Dynamic container color
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.schedule,
                      color: isDark
                          ? Colors.grey[400]
                          : colorScheme.primary, // FIX: Dynamic icon color
                      size: 20),
                  const SizedBox(width: 8),
                  Text(
                    'Pickup: ${item.pickupTime}',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: isDark
                          ? Colors.grey[400]
                          : colorScheme.primary, // FIX: Dynamic text color
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // --- Reserve Button ---
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: onAddToCart,
                child: const Text('Add to Cart'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
