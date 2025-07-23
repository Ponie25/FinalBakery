require('dotenv').config({ path: '../.env' });
const mongoose = require("mongoose");
const User = require("./api/models/userModel");
const bcrypt = require("bcrypt");

async function createAdminUser() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to database");

        // Check if admin user already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log("Admin user already exists:", existingAdmin.email);
            return;
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash("admin123", saltRounds);

        // Create admin user
        const adminUser = new User({
            fullName: "Admin User",
            username: "admin",
            phoneNumber: "1234567890",
            email: "admin@bakery.com",
            password: hashedPassword,
            role: "admin"
        });

        await adminUser.save();
        console.log("Admin user created successfully:", adminUser.email);
        console.log("Login credentials:");
        console.log("Email: admin@bakery.com");
        console.log("Password: admin123");

    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from database");
    }
}

createAdminUser(); 