const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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

        // Save user to session
        req.session.user = {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            role: user.role
        };
        
        // Force session save
        req.session.save((err) => {
            if (err) {
                console.log('❌ Session save error:', err);
            } else {
                console.log('✅ Session saved successfully');
            }
        });

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
            user: userResponse
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

        // Save user to session
        req.session.user = {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role
        };
        
        // Force session save
        req.session.save((err) => {
            if (err) {
                console.log('❌ Session save error:', err);
            } else {
                console.log('✅ Session saved successfully');
            }
        });

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
            user: userResponse
        });

        console.log(userResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Could not log out" });
            }
            res.clearCookie('connect.sid'); // Clear session cookie
            res.status(200).json({ message: "Logged out successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        console.log('=== GET CURRENT USER ===');
        console.log('Session ID:', req.sessionID);
        console.log('Session user:', req.session.user);
        console.log('Session exists:', !!req.session);
        console.log('=======================');
        
        if (!req.session.user) {
            console.log('❌ No user in session');
            return res.status(401).json({ message: "Not authenticated" });
        }
        
        // Get fresh user data from database
        const user = await User.findById(req.session.user._id).select('-password');
        if (!user) {
            console.log('❌ User not found in database');
            return res.status(404).json({ message: "User not found" });
        }
        
        console.log('✅ User found:', user.email);
        res.status(200).json(user);
    } catch (error) {
        console.log('❌ Error in getCurrentUser:', error.message);
        res.status(500).json({ message: error.message });
    }
};


// Admin Controller
// Get all users
const getAllUsers = async (req, res) => {
    try {
        // Check if current user is admin
        if (!req.session.user || req.session.user.role !== 'admin') {
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
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const { userId } = req.params;
        const { role } = req.body;
        
        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be 'admin' or 'user'." });
        }
        
        // Prevent admin from changing their own role
        if (userId === req.session.user._id) {
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
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        const { userId } = req.params;
        
        // Prevent admin from deleting themselves
        if (userId === req.session.user._id) {
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
        if (!req.session.user || req.session.user.role !== 'admin') {
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