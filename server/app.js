require('dotenv').config({ path: '../.env' });
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:8080',
            'http://localhost:3000',
            'https://bakery-theta-eight.vercel.app',
            'https://bakery-u9iz.onrender.com'
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Session middleware
const session = require("express-session");
app.use(session({
    secret: process.env.SESSION_SECRET || 'bakery-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Set to true in production with HTTPS
        maxAge: parseInt(process.env.SESSION_MAX_AGE) || 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Express parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const mongoose = require("mongoose");
const database = process.env.DATABASE_URL || "mongodb+srv://ponie255:LeB5hxmGdYplj95a@web2.epqkjyi.mongodb.net/bakery";
mongoose.connect(database)
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.log(err);
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

// Start server
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${process.env.SERVER_URL || `http://localhost:${port}`}`);
});

module.exports = app;