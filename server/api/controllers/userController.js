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
        if (!req.session.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        
        // Get fresh user data from database
        const user = await User.findById(req.session.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
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
    getCurrentUser
};