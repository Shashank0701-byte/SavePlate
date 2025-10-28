SavePlate Frontend 🍽️
A modern React.js frontend for SavePlate - a platform that connects restaurants with surplus food to customers seeking discounted meals, fighting food waste.

🌟 Features
Customer Features
🔍 Meal Discovery: Browse surplus meals from nearby restaurants with real-time availability
📍 Location-Based Search: Find meals based on your current location
🔐 Authentication: Secure login/register with JWT session management
💳 Payment Integration: Instant payment and secure meal reservation
📱 QR Code Pickup: Contactless meal pickup with QR code generation
👤 Profile Management: Track savings, meals rescued, and environmental impact
Restaurant Features
📊 Dashboard: Comprehensive dashboard to manage surplus meal listings
💰 Revenue Tracking: Monitor earnings from surplus food sales
📋 Order Management: Real-time order tracking and QR code verification
🌱 Impact Analytics: Track CO₂ saved and meals diverted from waste
⚡ Quick Listing: Easy-to-use interface for adding surplus meals
General Features
🎨 Modern UI: Clean, mobile-friendly design with Tailwind CSS
📱 Responsive Design: Optimized for all screen sizes
🚀 Fast Performance: Built with Vite for optimal development and production builds
♿ Accessibility: WCAG compliant design patterns
🛠️ Tech Stack
Frontend Framework: React.js 19.1.1
Routing: React Router DOM 7.9.4
Styling: Tailwind CSS 4.1.16
QR Code Generation: qrcode.react 4.2.0
Build Tool: Vite 7.1.7
Package Manager: npm
🚀 Getting Started
Prerequisites
Node.js (v18 or higher)
npm or yarn
Installation
Install dependencies

npm install
Start development server

npm run dev
Open in browser Navigate to http://localhost:5173

Available Scripts
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint
📁 Project Structure
src/
├── components/          # Reusable UI components
│   ├── Footer.jsx      # Site footer with links and stats
│   ├── Loading.jsx     # Loading spinner component
│   ├── MealCard.jsx    # Reusable meal card component
│   └── Navbar.jsx      # Navigation header with auth state
├── pages/              # Main application pages
│   ├── CustomerDashboard.jsx    # Customer meal discovery interface
│   ├── Home.jsx                 # Landing page with hero and features
│   ├── Login.jsx                # User authentication login
│   ├── Profile.jsx              # User profile and settings
│   ├── Register.jsx             # User registration form
│   ├── ReservationPage.jsx      # Meal reservation and payment flow
│   └── RestaurantDashboard.jsx  # Restaurant management interface
├── App.jsx             # Main app component with routing
├── index.css           # Global styles and Tailwind imports
└── main.jsx           # React app entry point
✨ Key Features Implemented
🏠 Landing Page
Hero Section: Eye-catching design with animated food elements
How It Works: Step-by-step process for customers and restaurants
Features Showcase: Environmental impact, savings, and user experience
Call-to-Action: Clear conversion paths for both user types
🔐 Authentication System
Login/Register: Complete user authentication flow with validation
Demo Accounts: Quick access buttons for testing different user types
Form Validation: Client-side validation with comprehensive error handling
Responsive Design: Mobile-optimized authentication forms
👥 Customer Experience
Meal Discovery: Advanced search and filtering by cuisine, diet, location
Real-time Updates: Live meal availability and quantity tracking
Reservation Flow: 3-step booking process (Details → Payment → Confirmation)
QR Code Generation: Secure pickup verification system
Profile Management: Track personal savings and environmental impact
🏪 Restaurant Management
Multi-tab Dashboard: Overview, Listings, and Orders management
Quick Actions: Streamlined meal addition and order management
Revenue Tracking: Real-time earnings and performance metrics
Impact Analytics: CO₂ saved and waste reduction tracking
Order Management: Status updates and QR code verification
🎨 Design System
Modern UI/UX
Zomato-Inspired Design: Food-focused visual language with appetizing colors
Responsive Layout: Mobile-first approach with desktop enhancements
Interactive Elements: Smooth transitions and hover effects
Accessibility: WCAG compliant with proper contrast and navigation
Component Library
Reusable Components: MealCard, Loading, Navigation components
Consistent Styling: Unified color palette and typography
State Management: Loading states, error handling, and success feedback
🔧 Technical Implementation
State Management
React Hooks: useState, useEffect for local component state
Mock Data: Comprehensive demo data for development and testing
API Ready: Structured for easy backend integration
Performance Optimizations
Code Organization: Modular component structure
Lazy Loading: Efficient resource loading
Responsive Images: Optimized for different screen sizes
🚀 Production Ready Features
Security Considerations
Input Validation: Client-side form validation
XSS Prevention: Safe rendering of user content
Authentication Flow: JWT token structure (ready for backend)
Deployment Ready
Environment Configuration: Ready for environment variables
Build Optimization: Vite production builds
SEO Friendly: Proper meta tags and semantic HTML
🔮 Future Enhancements
Planned Features
Real-time Notifications: Push notifications for meal availability
Advanced Geolocation: GPS-based restaurant discovery
Social Features: Reviews, ratings, and meal sharing
Loyalty Program: Points and rewards system
Multi-language Support: Internationalization ready
Technical Roadmap
Backend Integration: API integration with Node.js/Express
State Management: Context API or Redux implementation
Testing Suite: Unit and integration tests
PWA Features: Offline capabilities and app installation
📱 Mobile Experience
Responsive Design
Touch-Friendly: Optimized touch targets and gestures
Mobile Navigation: Collapsible menu and mobile-first layout
Performance: Fast loading on mobile networks
Cross-Platform: Consistent experience across devices
🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open a Pull Request
Made with 💚 for the planet - Fighting food waste, one meal at a time.

📞 Support
For questions or support, please contact the development team or create an issue in the repository.
