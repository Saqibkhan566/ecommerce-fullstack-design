Ecommerce Marketplace — Full Stack Web App
A scalable, responsive ecommerce platform built with React, Express, and MongoDB, featuring dynamic product listings, supplier quote requests, and modular UI components. Designed for pixel-perfect frontend demoability and robust backend integration.

Features
Frontend (React)
- Responsive layout with desktop, tablet, and mobile views
- Dynamic product cards with discount overlays
- Category-based product grids
- Supplier quote form with quantity/unit inputs
- Newsletter subscription and footer with app download links
- Sidebar navigation and user onboarding prompts
- Fully modular components (ProductCard, Navbar, etc.)
Backend (Express + MongoDB)
- RESTful API for products, categories, and user authentication
- JWT-based secure login and registration
- Quote submission endpoint with validation
- Scalable structure with modular routes and controllers

Setup Instructions
1. Clone the repo
git clone https://github.com/your-username/ecommerce-marketplace.git
cd ecommerce-marketplace
2. Install dependencies
cd frontend
npm install

cd ../backend
npm install


3. Configure environment variables
Create .env files in both frontend/ and backend/ folders:
# backend/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret

Run the app
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev

