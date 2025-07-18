const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController");

// GET /api/cart/:userId - Get user's cart
router.get("/:userId", CartController.getUserCart);

// POST /api/cart/add - Add item to cart
router.post("/add", CartController.addItemToCart);

// PUT /api/cart/update/:userId - Update item quantity
router.put("/update/:userId", CartController.updateItemQuantity);

// DELETE /api/cart/remove/:userId - Remove item from cart
router.delete("/remove/:userId", CartController.removeItemFromCart);

// DELETE /api/cart/clear/:userId - Clear cart
router.delete("/clear/:userId", CartController.clearCart);

module.exports = router;