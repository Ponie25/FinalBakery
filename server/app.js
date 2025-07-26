require('dotenv').config({ path: '../.env' });
const express = require("express");
const app = express();

const cors = require("cors");

// CORS configuration with environment variable support
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Get allowed origins from environment variable or use defaults
        const allowedOrigins = process.env.CORS_ORIGINS 
            ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
            : [
                'http://localhost:8080',
                'http://localhost:3000',
                'http://localhost:5173', // Vite default port
                'https://finalbakery.onrender.com',
                'https://final-bakery-lake.vercel.app'
            ];
        
        // Add the client URL from environment if it exists
        if (process.env.CLIENT_URL && !allowedOrigins.includes(process.env.CLIENT_URL)) {
            allowedOrigins.push(process.env.CLIENT_URL);
        }
        
        // Add the VUE_APP_CLIENT_URL if it exists
        if (process.env.VUE_APP_CLIENT_URL && !allowedOrigins.includes(process.env.VUE_APP_CLIENT_URL)) {
            allowedOrigins.push(process.env.VUE_APP_CLIENT_URL);
        }
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
};

app.use(cors(corsOptions));

// Basic logging middleware
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    });
}

// Express parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const mongoose = require("mongoose");
const database = process.env.DATABASE_URL;

// Validate required environment variables
if (!database) {
    console.error("❌ DATABASE_URL environment variable is required!");
    process.exit(1);
}

// Connect to database first, then start server
mongoose.connect(database)
.then(() => {
    console.log("✅ Connected to database");

    // Start server only after database connection
    const port = process.env.SERVER_PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`🚀 Server is running on ${process.env.SERVER_URL || `http://localhost:${port}`}`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
        console.log('🛑 SIGTERM received, shutting down gracefully...');
        server.close(() => {
            mongoose.connection.close(false, () => {
                console.log('✅ Server and database connections closed');
                process.exit(0);
            });
        });
    });

    process.on('SIGINT', () => {
        console.log('🛑 SIGINT received, shutting down gracefully...');
        server.close(() => {
            mongoose.connection.close(false, () => {
                console.log('✅ Server and database connections closed');
                process.exit(0);
            });
        });
    });
})
.catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
});

// Routes
const productRouter = require("./api/routes/productRoute");
const orderRouter = require("./api/routes/orderRoute");
const userRouter = require("./api/routes/userRoute");
const cartRouter = require("./api/routes/cartRoute");
const checkoutRouter = require("./api/routes/checkoutRoute");

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);

module.exports = app;