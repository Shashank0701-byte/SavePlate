import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'cart_service.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

enum PaymentMethod { cod, upi, card }

class _CheckoutScreenState extends State<CheckoutScreen> {
  PaymentMethod? _selectedMethod = PaymentMethod.cod;
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
        title: const Text('Complete Your Order'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          Text(
            'Price Details',
            style: theme.textTheme.headlineSmall
                ?.copyWith(fontWeight: FontWeight.bold),
          ),
          const Divider(height: 24),
          _buildPriceRow('Subtotal', '₹${subtotal.toStringAsFixed(2)}'),
          _buildPriceRow('GST (18%)', '₹${tax.toStringAsFixed(2)}'),
          _buildPriceRow('Platform Fee', '₹${_platformFee.toStringAsFixed(2)}'),
          const Divider(height: 24),
          _buildPriceRow(
            'Total Amount',
            '₹${total.toStringAsFixed(2)}',
            isTotal: true,
          ),
          const SizedBox(height: 32),
          Text(
            'Select Payment Method',
            style: theme.textTheme.headlineSmall
                ?.copyWith(fontWeight: FontWeight.bold),
          ),
          const Divider(height: 24),
          RadioListTile<PaymentMethod>(
            title: const Text('Cash on Delivery (COD)'),
            value: PaymentMethod.cod,
            groupValue: _selectedMethod,
            onChanged: (value) {
              setState(() {
                _selectedMethod = value;
              });
            },
          ),
          RadioListTile<PaymentMethod>(
            title: const Text('UPI (Google Pay, PhonePe, etc.)'),
            value: PaymentMethod.upi,
            groupValue: _selectedMethod,
            onChanged: (value) {
              setState(() {
                _selectedMethod = value;
              });
            },
          ),
          RadioListTile<PaymentMethod>(
            title: const Text('Credit/Debit Card'),
            value: PaymentMethod.card,
            groupValue: _selectedMethod,
            onChanged: (value) {
              setState(() {
                _selectedMethod = value;
              });
            },
          ),
        ],
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ElevatedButton(
          child: const Text('Place Order'),
          onPressed: () {
            // Dummy payment logic
            showDialog(
              context: context,
              builder: (ctx) => AlertDialog(
                title: const Text('Order Placed!'),
                content: const Text(
                    'Your order has been successfully placed. (This is a dummy payment).'),
                actions: [
                  TextButton(
                    child: const Text('Awesome!'),
                    onPressed: () {
                      cart.clearCart();
                      Navigator.of(ctx).pop(); // Close dialog
                      Navigator.of(context).popUntil(
                          (route) => route.isFirst); // Go back to home screen
                    },
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildPriceRow(String title, String amount, {bool isTotal = false}) {
    final style = isTotal
        ? Theme.of(context)
            .textTheme
            .bodyLarge
            ?.copyWith(fontWeight: FontWeight.bold)
        : Theme.of(context).textTheme.bodyMedium;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: style),
          Text(amount, style: style),
        ],
      ),
    );
  }
}
