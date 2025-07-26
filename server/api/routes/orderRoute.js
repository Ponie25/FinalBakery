const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const { authenticateToken, requireAdmin } = require("../../middleware/auth");

// GET /api/orders - Get all orders (admin only)
router.route("/")
    .get(authenticateToken, requireAdmin, OrderController.getAllOrders);

// GET /api/orders/stats - Get order statistics (admin only)
router.get("/stats", authenticateToken, requireAdmin, OrderController.getOrderStats);

// GET /api/orders/:id - Get order by ID (admin only)
// PUT /api/orders/:id - Update order (admin only)
// DELETE /api/orders/:id - Delete order (admin only)
router.route("/:id")
    .get(authenticateToken, requireAdmin, OrderController.getOrderById)
    .put(authenticateToken, requireAdmin, OrderController.updateOrder)
    .delete(authenticateToken, requireAdmin, OrderController.deleteOrder);

module.exports = router;