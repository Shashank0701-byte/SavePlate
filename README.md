# 🍽️ SavePlate — Fight Food Waste, One Meal at a Time

SavePlate is a full-stack web application that connects restaurants with surplus food to customers looking for affordable, quality meals — helping reduce food waste and promote sustainability.

---

## 🌟 Overview

**Frontend:** React.js (Vite + Tailwind CSS)  
**Backend:** Node.js (Express + MongoDB + JWT)  
**Goal:** Bridge the gap between food surplus and food demand while rewarding eco-conscious dining.

---

## ✨ Features

### 👥 Customer Features
- 🔍 **Meal Discovery:** Browse surplus meals from nearby restaurants in real-time  
- 📍 **Location-Based Search:** Discover meals near your current location  
- 💳 **Secure Payments:** Instant online payments and seamless reservations  
- 📱 **QR Code Pickup:** Contactless pickup using dynamic QR codes  
- 👤 **Profile Dashboard:** Track savings, rescued meals, and environmental impact  

### 🏪 Restaurant Features
- 📊 **Smart Dashboard:** Manage meal listings, orders, and analytics in one place  
- 💰 **Revenue Tracking:** Monitor surplus meal earnings in real-time  
- 📋 **Order Management:** Process orders and verify QR codes  
- 🌱 **Impact Analytics:** Visualize CO₂ saved and meals diverted from waste  
- ⚡ **Quick Listings:** Post surplus meals in seconds  

### 💻 General Features
- 🎨 **Modern UI/UX:** Responsive, mobile-first design with Tailwind CSS  
- 🚀 **Fast Performance:** Built with Vite for blazing-fast builds  
- ♿ **Accessibility:** WCAG-compliant, keyboard navigable design  
- 🔐 **Authentication:** Secure JWT-based auth system for both customers & restaurants  

---

## 🛠️ Tech Stack

### 🖥️ Frontend
| Technology | Purpose |
|-------------|----------|
| **React.js 19.1.1** | Core frontend framework |
| **React Router DOM 7.9.4** | SPA routing |
| **Tailwind CSS 4.1.16** | Styling and responsive design |
| **qrcode.react 4.2.0** | QR code generation |
| **Vite 7.1.7** | Build and dev tool |
| **npm** | Package manager |

### 🌍 Backend
| Technology | Purpose |
|-------------|----------|
| **Node.js / Express.js** | RESTful backend framework |
| **MongoDB + Mongoose** | Database and schema modeling |
| **JWT Authentication** | Secure login and token validation |
| **dotenv, cors** | Config and security middlewares |

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas cluster)

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/saveplate.git
cd saveplate


2️⃣ Backend Setup
cd backend
cp .env.example .env


Configure your .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173


Install dependencies:

npm install


Run development server:

npm run dev


Backend runs on: http://localhost:8000

3️⃣ Frontend Setup
cd ../frontend
npm install


Start development server:

npm run dev


Frontend runs on: http://localhost:5173

📁 Project Structure
saveplate/
├── backend/
│   ├── server.js            # Express server entry point
│   ├── routes/              # API route handlers
│   ├── controllers/         # Business logic
│   ├── models/              # MongoDB schemas
│   ├── middleware/          # Auth & error handling
│   └── .env.example         # Environment config sample
│
└── frontend/
    ├── src/
    │   ├── components/      
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── MealCard.jsx
    │   │   └── Loading.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── CustomerDashboard.jsx
    │   │   ├── RestaurantDashboard.jsx
    │   │   ├── Profile.jsx
    │   │   └── ReservationPage.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── vite.config.js
    └── package.json

🎨 Frontend Highlights
🏠 Landing Page

Hero section with animated visuals

“How it Works” step-by-step guide

Environmental impact showcase

Dual call-to-action for customers and restaurants

🔐 Authentication

Login/Register with full validation

Demo accounts for quick testing

JWT-ready frontend structure

Responsive design for mobile devices

🍴 Customer Flow

Browse & search by cuisine, location, diet

Real-time updates for availability

3-step reservation process

Auto QR generation for meal pickup

Impact tracking in profile

🧾 Restaurant Flow

Manage meals, orders, and analytics

Real-time order status and QR verification

Quick listing and revenue insights

CO₂ savings and impact data visualization

⚙️ Backend Highlights

🔐 JWT Authentication: Secure token-based login system

🧠 MVC Structure: Clean and scalable code organization

🗄️ MongoDB Integration: Efficient and flexible data storage

🧾 API-Ready: Designed for easy frontend communication

🌍 CORS Support: Configurable origins for local and production setups

🔮 Future Enhancements
Feature	Description
🔔 Real-time Notifications	Push alerts for meal availability
📡 Advanced Geolocation	GPS-based meal discovery
💬 Social Features	Reviews and ratings
🏆 Loyalty Program	Earn rewards for rescued meals
🌐 Multi-language Support	Internationalization (i18n)
💾 PWA Mode	Offline access and app installation
🧪 Testing Suite	Jest-based unit and integration tests
📱 Mobile Experience

Touch-optimized UI

Collapsible mobile navigation

Lightweight and responsive components

Fast performance on low-bandwidth connections

🤝 Contributing

We welcome contributions!
To contribute:

Fork the repository

Create a feature branch

git checkout -b feature/amazing-feature


Commit changes

git commit -m "Add amazing feature"


Push to branch

git push origin feature/amazing-feature


Open a Pull Request

📞 Support

For questions, bugs, or feedback —
🧑‍💻 Open an issue on GitHub or contact the development team.

💚 Made with Love for the Planet

SavePlate — Fighting food waste, one meal at a time.


---

Would you like me to format this README for **GitHub-flavored markdown with emojis, badges (e.g., React
