import config from '../config';

const API_URL = config.API_BASE_URL;

import axios from 'axios';

// Configure axios to include credentials for sessions
axios.defaults.withCredentials = true;

// Create configured axios instance
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Product API functions
export const productAPI = {
    // Get all products
    getAllProducts: async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Get products by category
    getProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`${API_URL}/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    },

    // Get product by ID
    getProductById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    },

    // Create new product
    createProduct: async (productData) => {
        try {
            const response = await axios.post(`${API_URL}/products`, productData);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    // Update product
    updateProduct: async (id, productData) => {
        try {
            const response = await axios.put(`${API_URL}/products/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    // Delete product
    deleteProduct: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
};

// User API functions
export const userAPI = {
    // Register a new user
    registerUser: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/users/register`, userData);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },

    // Login a user
    loginUser: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, userData);
            return response.data;
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error;
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await axios.get(`${API_URL}/users/current`);
            return response.data;
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    },

    // Logout user
    logoutUser: async () => {
        try {
            const response = await axios.post(`${API_URL}/users/logout`);
            return response.data;
        } catch (error) {
            console.error('Error logging out user:', error);
            throw error;
        }
    },

    // Admin functions - Get all users
    getAllUsers: async () => {
        try {
            const response = await axios.get(`${API_URL}/users/all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    },

    // Admin functions - Get user by ID
    getUserById: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    },

    // Admin functions - Update user role
    updateUserRole: async (userId, role) => {
        try {
            const response = await axios.put(`${API_URL}/users/${userId}/role`, { role });
            return response.data;
        } catch (error) {
            console.error('Error updating user role:', error);
            throw error;
        }
    },

    // Admin functions - Delete user
    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(`${API_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
};

// Cart API functions
export const cartAPI = {
    // Get cart
    getCart: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/cart/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting cart:', error);
            throw error;
        }   
    },

    // Add item to cart
    addToCart: async (userId, productId, quantity, price) => {
        try {
            const response = await axios.post(`${API_URL}/cart/add/${userId}`, {
                productId,
                quantity,
                price
            });
            return response.data;
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    },

    // Update item quantity
    updateQuantity: async (userId, productId, quantity) => {
        try {
            const response = await axios.put(`${API_URL}/cart/update/${userId}`, {
                productId,
                quantity
            });
            return response.data;
        } catch (error) {
            console.error('Error updating item quantity:', error);
            throw error;
        }
    },

    // Remove item from cart
    removeFromCart: async (userId, productId) => {
        try {
            const response = await axios.delete(`${API_URL}/cart/remove/${userId}`, {
                data: { productId }
            });
            return response.data;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            throw error;
        }
    },

    // Clear entire cart
    clearCart: async (userId) => {
        try {
            const response = await axios.delete(`${API_URL}/cart/clear/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }
};

// Default export for general API usage
export default api;