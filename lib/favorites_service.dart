import 'package:flutter/material.dart';
import 'food_item.dart';

class FavoritesService with ChangeNotifier {
  final List<String> _favoriteItemIds = [];

  List<String> get favoriteItemIds => _favoriteItemIds;

  bool isFavorite(String itemId) {
    return _favoriteItemIds.contains(itemId);
  }

  void toggleFavorite(FoodItem item) {
    if (isFavorite(item.id)) {
      _favoriteItemIds.remove(item.id);
    } else {
      _favoriteItemIds.add(item.id);
    }
    notifyListeners();
  }
}
