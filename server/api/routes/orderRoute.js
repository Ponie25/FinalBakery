const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

// GET /api/orders - Get all orders
router.route("/")
    .get(OrderController.getAllOrders);

// GET /api/orders/stats - Get order statistics (must come before /:id route)
router.get("/stats", OrderController.getOrderStats);

// GET /api/orders/:id - Get order by ID
// PUT /api/orders/:id - Update order
// DELETE /api/orders/:id - Delete order
router.route("/:id")
    .get(OrderController.getOrderById)
    .put(OrderController.updateOrder)
    .delete(OrderController.deleteOrder);

module.exports = router;