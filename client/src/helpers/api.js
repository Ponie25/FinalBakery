import config from '../config';

const API_URL = config.API_BASE_URL;

import axios from 'axios';

// Create configured axios instance
const api = axios.create({
    baseURL: API_URL
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Product API functions
export const productAPI = {
    // Get all products
    getAllProducts: async () => {
        try {
            const response = await api.get(`/products`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Get products by category
    getProductsByCategory: async (category) => {
        try {
            const response = await api.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    },

    // Get product by ID
    getProductById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    },

    // Create new product
    createProduct: async (productData) => {
        try {
            const response = await api.post(`/products`, productData);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    // Update product
    updateProduct: async (id, productData) => {
        try {
            const response = await api.put(`/products/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    // Delete product
    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/products/${id}`);
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
            const response = await api.post(`/users/register`, userData);
            // Store JWT token in localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },

    // Login a user
    loginUser: async (userData) => {
        try {
            const response = await api.post(`/users/login`, userData);
            // Store JWT token in localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await api.get(`/users/current`);
            return response.data;
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    },

    // Logout user
    logoutUser: async () => {
        try {
            const response = await api.post(`/users/logout`);
            // Remove JWT token from localStorage
            localStorage.removeItem('token');
            return response.data;
        } catch (error) {
            console.error('Error logging out user:', error);
            // Still remove token even if logout fails
            localStorage.removeItem('token');
            throw error;
        }
    },

    // Admin functions - Get all users
    getAllUsers: async () => {
        try {
            const response = await api.get(`/users/all`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    },

    // Admin functions - Get user by ID
    getUserById: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    },

    // Admin functions - Update user role
    updateUserRole: async (userId, role) => {
        try {
            const response = await api.put(`/users/${userId}/role`, { role });
            return response.data;
        } catch (error) {
            console.error('Error updating user role:', error);
            throw error;
        }
    },

    // Admin functions - Delete user
    deleteUser: async (userId) => {
        try {
            const response = await api.delete(`/users/${userId}`);
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
    getCart: async () => {
        try {
            const response = await api.get(`/cart`);
            return response.data;
        } catch (error) {
            console.error('Error getting cart:', error);
            throw error;
        }   
    },

    // Add item to cart
    addToCart: async (productId, quantity, price) => {
        try {
            const response = await api.post(`/cart/add`, {
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
    updateQuantity: async (productId, quantity) => {
        try {
            const response = await api.put(`/cart/update`, {
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
    removeFromCart: async (productId) => {
        try {
            const response = await api.delete(`/cart/remove`, {
                data: { productId }
            });
            return response.data;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            throw error;
        }
    },

    // Clear entire cart
    clearCart: async () => {
        try {
            const response = await api.delete(`/cart/clear`);
            return response.data;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }
};

// Default export for general API usage
export default api;