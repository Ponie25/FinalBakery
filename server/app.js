const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

// Session middleware
const session = require("express-session");
app.use(session({
    secret: 'bakery-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Express parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const mongoose = require("mongoose");
const database = "mongodb+srv://ponie255:LeB5hxmGdYplj95a@web2.epqkjyi.mongodb.net/bakery";
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
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;