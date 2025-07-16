const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

// GET /api/products - Get all products
// POST /api/products - Create new product
router.route("/")
    .get(ProductController.getAllProducts)
    .post(ProductController.createProduct);

// GET /api/products/:id - Get product by ID
// PUT /api/products/:id - Update product
// DELETE /api/products/:id - Delete product
router.route("/:id")
    .get(ProductController.getProductById)
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct);

// GET /api/products/category/:category - Get products by category
router.route("/category/:category")
    .get(ProductController.getProductsByCategory);

module.exports = router;