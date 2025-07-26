const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { fullName, username, phoneNumber, email, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const user = new User({
            fullName,
            username,
            phoneNumber,
            email,
            password: hashedPassword,
            role: role || "user"
        });
        
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { 
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role
        };
        
        res.status(201).json({
            message: "User registered successfully",
            user: userResponse,
            token: token
        });

        console.log("login success");

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }   

        // Generate JWT token
        const token = jwt.sign(
            { 
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                phoneNumber: user.phoneNumber,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role
        };
        
        res.status(200).json({ 
            message: "Login successful", 
            user: userResponse,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        // With JWT, logout is handled client-side by removing the token
        // Server doesn't need to do anything since JWT is stateless
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        // User data is already available from JWT middleware
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        
        // Get fresh user data from database
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Admin Controller
// Get all users
const getAllUsers = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserRole = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const { userId } = req.params;
        const { role } = req.body;
        
        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be 'admin' or 'user'." });
        }
        
        // Prevent admin from changing their own role
        if (userId === req.user._id) {
            return res.status(400).json({ message: "Cannot change your own role." });
        }
        
        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.status(200).json({
            message: "User role updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const { userId } = req.params;
        
        // Prevent admin from deleting themselves
        if (userId === req.user._id) {
            return res.status(400).json({ message: "Cannot delete your own account." });
        }
        
        const user = await User.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getUserById
};