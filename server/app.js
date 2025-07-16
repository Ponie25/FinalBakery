const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

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

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;