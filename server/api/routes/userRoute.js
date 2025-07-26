const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { authenticateToken, requireAdmin } = require("../../middleware/auth");

// POST /api/users/register - Register a new user
router.route("/register")
    .post(UserController.registerUser);

// POST /api/users/login - Login a user
router.route("/login")
    .post(UserController.loginUser);

// POST /api/users/logout - Logout a user
router.route("/logout")
    .post(UserController.logoutUser);

// GET /api/users/current - Get current user (requires authentication)
router.route("/current")
    .get(authenticateToken, UserController.getCurrentUser);

// Admin routes - User management
// GET /api/users/all - Get all users (admin only)
router.route("/all")
    .get(authenticateToken, requireAdmin, UserController.getAllUsers);

// GET /api/users/:userId - Get specific user (admin only)
router.route("/:userId")
    .get(authenticateToken, requireAdmin, UserController.getUserById);

// PUT /api/users/:userId/role - Update user role (admin only)
router.route("/:userId/role")
    .put(authenticateToken, requireAdmin, UserController.updateUserRole);

// DELETE /api/users/:userId - Delete user (admin only)
router.route("/:userId")
    .delete(authenticateToken, requireAdmin, UserController.deleteUser);

module.exports = router;