const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

// GET /api/orders - Get all orders
// POST /api/orders - Create new order
router.route("/")
    .get(OrderController.getAllOrders);
    // .post(OrderController.createOrder);

// GET /api/orders/:id - Get order by ID
// PUT /api/orders/:id - Update order
// DELETE /api/orders/:id - Delete order
router.route("/:id");
    // .get(OrderController.getOrderById)
    // .put(OrderController.updateOrder)
    // .delete(OrderController.deleteOrder);

module.exports = router;