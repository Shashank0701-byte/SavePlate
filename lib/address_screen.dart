import 'package:flutter/material.dart';

class AddressScreen extends StatefulWidget {
  const AddressScreen({super.key});

  @override
  State<AddressScreen> createState() => _AddressScreenState();
}

class _AddressScreenState extends State<AddressScreen> {
  // In a real app, this would be fetched from a database
  final List<Map<String, String>> _addresses = [
    {
      "type": "Home",
      "address": "123, Green Valley, Springfield, 110001",
    },
    {
      "type": "Work",
      "address": "456, Tech Park, Metropolis, 220002",
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Addresses'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              // TODO: Add new address logic
            },
          ),
        ],
      ),
      body: _addresses.isEmpty
          ? const Center(
              child: Text('No addresses saved.'),
            )
          : ListView.builder(
              itemCount: _addresses.length,
              itemBuilder: (context, index) {
                final address = _addresses[index];
                final icon =
                    address['type'] == 'Home' ? Icons.home : Icons.work;
                return Card(
                  margin:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    leading: Icon(icon, color: Theme.of(context).primaryColor),
                    title: Text(address['type']!),
                    subtitle: Text(address['address']!),
                    trailing: IconButton(
                      icon: const Icon(Icons.edit_outlined),
                      onPressed: () {
                        // TODO: Edit address logic
                      },
                    ),
                  ),
                );
              },
            ),
    );
  }
}
