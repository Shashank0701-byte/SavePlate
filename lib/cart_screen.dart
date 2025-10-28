import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'cart_service.dart';

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  final double _platformFee = 5.0;

  @override
  Widget build(BuildContext context) {
    final cart = Provider.of<CartService>(context);
    final theme = Theme.of(context);

    final double subtotal = cart.totalPrice;
    final double tax = subtotal * 0.18;
    final double total = subtotal + tax + _platformFee;

    return Scaffold(
      appBar: AppBar(
        title: Text('My Cart (${cart.itemCount})'),
      ),
      body: cart.items.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.shopping_cart_outlined,
                      size: 80, color: Colors.grey[400]),
                  const SizedBox(height: 16),
                  Text(
                    'Your cart is empty',
                    style: theme.textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 8),
                  const Text('Add some delicious meals to get started!'),
                ],
              ),
            )
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: cart.items.length,
                    itemBuilder: (context, index) {
                      final item = cart.items.values.elementAt(index);
                      return ListTile(
                        leading: CircleAvatar(
                          child: Icon(item.restaurantIcon),
                        ),
                        title: Text(item.foodName),
                        subtitle: Text(item.restaurantName),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              '₹${item.newPrice}',
                              style: theme.textTheme.bodyLarge,
                            ),
                            IconButton(
                              icon: const Icon(Icons.remove_circle_outline,
                                  color: Colors.red),
                              onPressed: () {
                                cart.removeItem(item.id);
                              },
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 10,
                        offset: const Offset(0, -5),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      _buildPriceRow(
                        'Subtotal',
                        '₹${subtotal.toStringAsFixed(2)}',
                      ),
                      _buildPriceRow(
                        'GST (18%)',
                        '₹${tax.toStringAsFixed(2)}',
                      ),
                      _buildPriceRow(
                        'Platform Fee',
                        '₹${_platformFee.toStringAsFixed(2)}',
                      ),
                      const Divider(height: 20),
                      _buildPriceRow(
                        'Total Amount',
                        '₹${total.toStringAsFixed(2)}',
                        isTotal: true,
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () {
                            Navigator.pushNamed(context, '/checkout');
                          },
                          icon: const Icon(Icons.payment),
                          label: const Text('Proceed to Payment'),
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 12),
                          ),
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
    );
  }

  Widget _buildPriceRow(String title, String amount, {bool isTotal = false}) {
    final style = isTotal
        ? const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)
        : const TextStyle(fontSize: 14, color: Colors.grey);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: style),
          Text(amount, style: style.copyWith(color: Colors.black)),
        ],
      ),
    );
  }
}
