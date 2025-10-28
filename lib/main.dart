import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:provider/provider.dart';
import 'cart_service.dart';
import 'favorites_service.dart';
import 'theme_service.dart';
import 'firebase_options.dart';
import 'login_screen.dart';
import 'home_screen.dart';
import 'signup_screen.dart';
import 'restaurant_screen.dart';
import 'edit_profile_screen.dart';
import 'address_screen.dart';
import 'checkout_screen.dart';
import 'favorites_screen.dart';
import 'my_orders_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } catch (e) {
    debugPrint("Firebase init failed: $e");
  }

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => CartService()),
        ChangeNotifierProvider(create: (context) => FavoritesService()),
        ChangeNotifierProvider(create: (context) => ThemeService()),
      ],
      child: const SavePlateApp(),
    ),
  );
}

class SavePlateApp extends StatelessWidget {
  const SavePlateApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeService>(
      builder: (context, themeService, child) {
        // Light Theme: White & Green
        final baseTheme = ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF008000), // Green
            primary: const Color(0xFF008000), // Green
            secondary: const Color(0xFFF9A825),
            brightness: Brightness.light,
          ),
          useMaterial3: true,
          scaffoldBackgroundColor: Colors.grey[50],
          appBarTheme: const AppBarTheme(
            backgroundColor: Colors.white,
            foregroundColor: Colors.black,
            elevation: 1,
            surfaceTintColor: Colors.white,
            titleTextStyle: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF008000), // Green
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              textStyle: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
          cardTheme: CardThemeData(
            elevation: 2,
            color: Colors.white,
            surfaceTintColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
          ),
          bottomNavigationBarTheme: const BottomNavigationBarThemeData(
            selectedItemColor: Color(0xFF008000), // Green
            unselectedItemColor: Colors.grey,
            showUnselectedLabels: true,
            type: BottomNavigationBarType.fixed,
          ),
        );

        // Dark Theme: Black & Blue (as requested)
        final darkTheme = ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.blue, // Blue
            primary: Colors.blue, // Blue
            secondary: const Color(0xFFF9A825), // Keep accent yellow
            brightness: Brightness.dark,
            background: Colors.black, // True black background
          ),
          useMaterial3: true,
          scaffoldBackgroundColor: Colors.black, // True black background
          cardColor: const Color(0xFF1C1C1E), // Dark grey for cards (iOS style)
          appBarTheme: const AppBarTheme(
            backgroundColor: Color(0xFF1C1C1E), // Dark grey app bar
            foregroundColor: Colors.white,
            elevation: 1,
            surfaceTintColor: Color(0xFF1C1C1E),
            titleTextStyle: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          cardTheme: CardThemeData(
            elevation: 0,
            color: const Color(0xFF1C1C1E), // Dark grey cards
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
          ),
          bottomNavigationBarTheme: const BottomNavigationBarThemeData(
            backgroundColor: Color(0xFF1C1C1E),
            selectedItemColor: Colors.blue, // Blue
            unselectedItemColor: Colors.grey,
            type: BottomNavigationBarType.fixed,
          ),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue, // Blue
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              textStyle: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
        );

        return MaterialApp(
          title: 'SavePlate',
          theme: baseTheme,
          darkTheme: darkTheme,
          themeMode: themeService.themeMode,
          home: StreamBuilder<User?>(
            stream: FirebaseAuth.instance.authStateChanges(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Scaffold(
                  body: Center(
                    child: CircularProgressIndicator(),
                  ),
                );
              }
              if (snapshot.hasData) {
                return const MainScreen();
              }
              return const LoginScreen();
            },
          ),
          routes: {
            '/login': (context) => const LoginScreen(),
            '/signup': (context) => const SignUpScreen(),
            '/home': (context) => const MainScreen(),
            '/restaurants': (context) => const RestaurantScreen(),
            '/edit_profile': (context) => const EditProfileScreen(),
            '/addresses': (context) => const AddressScreen(),
            '/checkout': (context) => const CheckoutScreen(),
            '/favorites': (context) => const FavoritesScreen(),
            '/my_orders': (context) => const MyOrdersScreen(),
          },
        );
      },
    );
  }
}
