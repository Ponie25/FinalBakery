const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController");
const { authenticateToken } = require("../../middleware/auth");

// All cart routes require authentication
router.use(authenticateToken);

// GET /api/cart - Get current user's cart
router.get("/", CartController.getUserCart);

// POST /api/cart/add - Add item to cart
router.post("/add", CartController.addItemToCart);

// PUT /api/cart/update - Update item quantity
router.put("/update", CartController.updateItemQuantity);

// DELETE /api/cart/remove - Remove item from cart
router.delete("/remove", CartController.removeItemFromCart);

// DELETE /api/cart/clear - Clear cart
router.delete("/clear", CartController.clearCart);

module.exports = router;