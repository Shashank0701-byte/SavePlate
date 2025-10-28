import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:provider/provider.dart';
import 'theme_service.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  User? get currentUser {
    return FirebaseAuth.instance.currentUser;
  }

  Future<void> _signOut(BuildContext context) async {
    try {
      await FirebaseAuth.instance.signOut();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to log out: ${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final user = currentUser;
    final themeService = Provider.of<ThemeService>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Profile'),
        actions: [
          IconButton(
            icon: Icon(themeService.themeMode == ThemeMode.dark
                ? Icons.light_mode_outlined
                : Icons.dark_mode_outlined),
            onPressed: () {
              themeService
                  .toggleTheme(themeService.themeMode != ThemeMode.dark);
            },
          )
        ],
      ),
      body: ListView(
        children: [
          // User Header
          Container(
            padding: const EdgeInsets.all(24.0),
            color: theme.cardColor,
            child: Row(
              children: [
                CircleAvatar(
                  radius: 40,
                  backgroundColor: theme.primaryColor.withOpacity(0.1),
                  child: Text(
                    user?.displayName?.isNotEmpty == true
                        ? user!.displayName!
                            .split(' ')
                            .map((e) => e[0])
                            .take(2)
                            .join()
                            .toUpperCase()
                        : 'U',
                    style: theme.textTheme.headlineMedium
                        ?.copyWith(color: theme.primaryColor),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        user?.displayName ?? 'Valued User',
                        style: theme.textTheme.headlineSmall
                            ?.copyWith(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        user?.email ?? 'No email found',
                        style: theme.textTheme.bodyLarge
                            ?.copyWith(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.edit_outlined),
                  onPressed: () async {
                    await Navigator.pushNamed(context, '/edit_profile');
                    setState(() {});
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Menu List
          _buildProfileMenuItem(
            context,
            icon: Icons.shopping_bag_outlined,
            title: 'My Orders',
            subtitle: 'View your past orders',
            onTap: () {
              Navigator.pushNamed(context, '/my_orders');
            },
          ),
          _buildProfileMenuItem(
            context,
            icon: Icons.location_on_outlined,
            title: 'My Addresses',
            subtitle: 'Manage your saved addresses',
            onTap: () {
              Navigator.pushNamed(context, '/addresses');
            },
          ),
          _buildProfileMenuItem(
            context,
            icon: Icons.settings_outlined,
            title: 'Settings',
            subtitle: 'Manage app preferences',
            onTap: () {},
          ),
          _buildProfileMenuItem(
            context,
            icon: Icons.help_outline,
            title: 'Contact Shashank',
            subtitle: 'Get help and support',
            onTap: () {
              // You can add a URL launcher here
            },
          ),
          const Divider(height: 30, indent: 16, endIndent: 16),
          _buildProfileMenuItem(
            context,
            icon: Icons.logout,
            title: 'Logout',
            isLogout: true,
            onTap: () {
              _signOut(context);
            },
          ),
        ],
      ),
    );
  }

  // A new, more styled list item widget
  Widget _buildProfileMenuItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    String? subtitle,
    required VoidCallback onTap,
    bool isLogout = false,
  }) {
    final theme = Theme.of(context);
    final color = isLogout ? Colors.red : theme.colorScheme.onBackground;

    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: isLogout
              ? Colors.red.withOpacity(0.1)
              : theme.primaryColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(
          icon,
          color: isLogout ? Colors.red : theme.primaryColor,
        ),
      ),
      title: Text(
        title,
        style: theme.textTheme.bodyLarge
            ?.copyWith(color: color, fontWeight: FontWeight.bold),
      ),
      subtitle: subtitle != null
          ? Text(
              subtitle,
              style:
                  theme.textTheme.bodySmall?.copyWith(color: Colors.grey[600]),
            )
          : null,
      trailing: isLogout
          ? null
          : Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey[400]),
      onTap: onTap,
    );
  }
}
