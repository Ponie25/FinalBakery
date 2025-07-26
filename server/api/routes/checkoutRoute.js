const express = require("express");
const router = express.Router();
const CheckoutController = require("../controllers/checkoutController");
const { authenticateToken } = require("../../middleware/auth");

// All checkout routes require authentication
router.use(authenticateToken);

// POST /api/checkout - Create new order
router.post("/", CheckoutController.createOrder);

// POST /api/checkout/cart - Create order from cart
router.post("/cart", CheckoutController.createOrderFromCart);

// GET /api/checkout/orders - Get current user's orders
router.get("/orders", CheckoutController.getUserOrders);

// PUT /api/checkout/orders/:orderId/status - Update order status
router.put("/orders/:orderId/status", CheckoutController.updateOrderStatus);

module.exports = router;