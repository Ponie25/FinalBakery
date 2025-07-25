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
        
        console.log('Allowed origins:', allowedOrigins);
        console.log('Request origin:', origin);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Session middleware with MongoDB store
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(session({
    secret: process.env.SESSION_SECRET || 'bakery-secret-key',
    resave: false, // Changed back to false to prevent unnecessary saves
    saveUninitialized: false, // Changed back to false to prevent empty sessions
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL || "mongodb+srv://ponie255:LeB5hxmGdYplj95a@web2.epqkjyi.mongodb.net/bakery",
        collectionName: 'sessions',
        ttl: 24 * 60 * 60, // 24 hours in seconds
        autoRemove: 'native' // Use MongoDB's TTL index
    }),
    cookie: { 
        secure: false, // Set to false for now to ensure cookies work
        maxAge: parseInt(process.env.SESSION_MAX_AGE) || 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// Session debugging middleware (only in development)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        console.log('Session ID:', req.sessionID);
        console.log('Session user:', req.session.user);
        console.log('Cookies:', req.headers.cookie);
        console.log('---');
        next();
    });
}

// Express parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const mongoose = require("mongoose");
const database = process.env.DATABASE_URL || "mongodb+srv://ponie255:LeB5hxmGdYplj95a@web2.epqkjyi.mongodb.net/bakery";

// Connect to database first, then start server
mongoose.connect(database)
.then(() => {
    console.log("Connected to database");
    
    // Start server only after database connection
    const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on ${process.env.SERVER_URL || `http://localhost:${port}`}`);
    });
})
.catch((err) => {
    console.log("Database connection failed:", err);
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