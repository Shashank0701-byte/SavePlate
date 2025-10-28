import 'package:flutter/material.dart';
import 'food_item.dart';

class CartService with ChangeNotifier {
  final Map<String, FoodItem> _items = {};

  Map<String, FoodItem> get items => _items;

  double get totalPrice {
    var total = 0.0;
    _items.forEach((key, item) {
      total += item.newPrice;
    });
    return total;
  }

  int get itemCount => _items.length;

  void addItem(FoodItem item) {
    if (_items.containsKey(item.id)) {
    } else {
      _items.putIfAbsent(item.id, () => item);
    }
    notifyListeners();
  }

  void removeItem(String itemId) {
    _items.remove(itemId);
    notifyListeners();
  }

  void clearCart() {
    _items.clear();
    notifyListeners();
  }
}
