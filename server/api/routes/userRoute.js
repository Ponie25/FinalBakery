const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// POST /api/users/register - Register a new user
router.route("/register")
    .post(UserController.registerUser);

// POST /api/users/login - Login a user
router.route("/login")
    .post(UserController.loginUser);

// POST /api/users/logout - Logout a user
router.route("/logout")
    .post(UserController.logoutUser);

// GET /api/users/current - Get current user
router.route("/current")
    .get(UserController.getCurrentUser);

module.exports = router;