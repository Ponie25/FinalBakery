const API_URL = 'http://localhost:3000/api';

import axios from 'axios';

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


