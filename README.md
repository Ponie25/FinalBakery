# 🍰 Bakery E-commerce Platform

A modern, full-stack e-commerce platform for a bakery business built with Vue.js 3 and Node.js/Express. This application provides a complete solution for online bakery ordering with user authentication, product management, shopping cart functionality, and admin dashboard.

## ✨ Features

### Customer Features
- **User Authentication**: Secure login/signup with JWT tokens
- **Product Catalog**: Browse bakery items with categories and search
- **Shopping Cart**: Add/remove items with real-time updates
- **Order Management**: Place orders and track order history
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user actions

### Admin Features
- **Dashboard Analytics**: Sales and order statistics
- **Product Management**: Add, edit, and delete products
- **Order Management**: Process and track customer orders
- **User Management**: Manage customer accounts
- **Menu Management**: Organize products by categories

## 🛠️ Tech Stack

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Heroicons** - Beautiful SVG icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Bakery/
├── client/                 # Vue.js frontend
│   ├── src/
│   │   ├── components/     # Vue components
│   │   │   ├── common/     # Shared components (modals, notifications)
│   │   │   ├── layout/     # Layout components (navbar, footer)
│   │   │   └── sections/   # Page sections
│   │   ├── views/          # Page components
│   │   │   └── admin/      # Admin dashboard views
│   │   ├── services/       # API service layer
│   │   ├── helpers/        # Utility functions
│   │   └── router.js       # Vue Router configuration
│   └── package.json
├── server/                 # Node.js backend
│   ├── api/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   └── routes/         # API routes
│   ├── middleware/         # Custom middleware
│   └── app.js             # Express server setup
├── env.example            # Environment variables template
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Bakery
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Edit `.env` file with your configuration:
   - Database connection string
   - JWT secret key
   - Server and client URLs
   - CORS origins

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Set up the database**
   - Create a MongoDB database
   - Update the `DATABASE_URL` in your `.env` file
   - Run the admin creation script (if needed):
     ```bash
     cd ../server
     node createAdmin.js
     ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run serve
   ```
   The client will run on `http://localhost:8080`

3. **Build for production**
   ```bash
   cd client
   npm run build
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/current` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (admin)

### Checkout
- `POST /api/checkout` - Process checkout

## 🔧 Configuration

### Environment Variables

Key environment variables you need to configure:

```env
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/bakery

# JWT
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Server
SERVER_PORT=3000
SERVER_URL=http://localhost:3000

# Client
CLIENT_URL=http://localhost:8080

# CORS
CORS_ORIGINS=http://localhost:8080,http://localhost:3000
```

### Database Models

The application uses MongoDB with the following main models:
- **User**: Customer accounts and authentication
- **Product**: Bakery items with categories and pricing
- **Cart**: Shopping cart items for each user
- **Order**: Customer orders with status tracking

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:
- Colors in `client/tailwind.config.js`
- Global styles in `client/src/style.css`
- Component-specific styles in individual Vue components

### Adding New Features
- **New API endpoints**: Add routes in `server/api/routes/`
- **New components**: Create Vue components in `client/src/components/`
- **New pages**: Add views in `client/src/views/` and update router

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Deploy to platforms like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3

### Environment Variables for Production
Make sure to set all required environment variables in your production environment, especially:
- `DATABASE_URL`
- `JWT_SECRET`
- `CORS_ORIGINS` (with your production domain)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔮 Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Email notifications
- Inventory management
- Customer reviews and ratings
- Loyalty program
- Mobile app development
- Advanced analytics and reporting 