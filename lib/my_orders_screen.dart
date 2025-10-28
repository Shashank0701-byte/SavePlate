import 'package:flutter/material.dart';

class MyOrdersScreen extends StatelessWidget {
  const MyOrdersScreen({super.key});

  // Dummy data
  final List<Map<String, String>> _dummyOrders = const [
    {
      "title": "Fish Curry with Rice",
      "restaurant": "Coastal Spice",
      "status": "Delivered",
      "price": "190",
      "date": "Oct 25, 2025",
    },
    {
      "title": "Pani Puri & Bhel Mix",
      "restaurant": "Chaat Bazaar",
      "status": "Cancelled",
      "price": "75",
      "date": "Oct 22, 2025",
    },
    {
      "title": "Dal Baati Churma",
      "restaurant": "Rajasthani Rasoi",
      "status": "Delivered",
      "price": "260",
      "date": "Oct 20, 2025",
    }
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Orders'),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(8.0),
        itemCount: _dummyOrders.length,
        itemBuilder: (context, index) {
          final order = _dummyOrders[index];
          final isDelivered = order['status'] == 'Delivered';
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            elevation: 2,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        order['restaurant']!,
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(
                          color: isDelivered
                              ? Colors.green.withOpacity(0.1)
                              : Colors.red.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          order['status']!,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: isDelivered
                                ? Colors.green[800]
                                : Colors.red[800],
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(order['title']!, style: theme.textTheme.bodyLarge),
                  const Divider(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(order['date']!,
                          style: theme.textTheme.bodySmall
                              ?.copyWith(color: Colors.grey[600])),
                      Text(
                        '₹${order['price']}',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
