const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const { authenticateToken, requireAdmin } = require("../../middleware/auth");

// GET /api/products - Get all products (public)
// POST /api/products - Create new product (admin only)
router.route("/")
    .get(ProductController.getAllProducts)
    .post(authenticateToken, requireAdmin, ProductController.createProduct);

// GET /api/products/:id - Get product by ID (public)
// PUT /api/products/:id - Update product (admin only)
// DELETE /api/products/:id - Delete product (admin only)
router.route("/:id")
    .get(ProductController.getProductById)
    .put(authenticateToken, requireAdmin, ProductController.updateProduct)
    .delete(authenticateToken, requireAdmin, ProductController.deleteProduct);

// GET /api/products/category/:category - Get products by category
router.route("/category/:category")
    .get(ProductController.getProductsByCategory);

module.exports = router;