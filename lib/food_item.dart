import 'package:flutter/material.dart';

class FoodItem {
  final String id;
  final String restaurantName;
  final double rating;
  final double distance;
  final String discount;
  final String foodName;
  final String description;
  final List<String> tags;
  final int newPrice;
  final int oldPrice;
  final String pickupTime;
  final int availableCount;
  final IconData restaurantIcon;
  final String category;

  FoodItem({
    required this.id,
    required this.restaurantName,
    required this.rating,
    required this.distance,
    required this.discount,
    required this.foodName,
    required this.description,
    required this.tags,
    required this.newPrice,
    required this.oldPrice,
    required this.pickupTime,
    required this.availableCount,
    required this.restaurantIcon,
    required this.category,
  });
}
