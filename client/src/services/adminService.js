import api from '../helpers/api.js';

class AdminService {
    // Get all orders for admin
    async getAllOrders() {
        try {
            const response = await api.get(`/orders`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get orders');
        }
    }

    // Get order by ID
    async getOrderById(orderId) {
        try {
            const response = await api.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get order');
        }
    }

    // Update order status
    async updateOrderStatus(orderId, status) {
        try {
            const response = await api.put(`/checkout/orders/${orderId}/status`, { status });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update order status');
        }
    }

    // Get all users
    async getAllUsers() {
        try {
            const response = await api.get(`/users/all`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get users');
        }
    }

    // Get all products
    async getAllProducts() {
        try {
            const response = await api.get(`/products`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get products');
        }
    }

    // Create new product
    async createProduct(productData) {
        try {
            const response = await api.post(`/products`, productData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create product');
        }
    }

    // Update product
    async updateProduct(productId, productData) {
        try {
            const response = await api.put(`/products/${productId}`, productData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update product');
        }
    }

    // Delete product
    async deleteProduct(productId) {
        try {
            const response = await api.delete(`/products/${productId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete product');
        }
    }

    // Get order statistics
    async getOrderStats() {
        try {
            const response = await api.get(`/orders/stats`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get order stats');
        }
    }
}

export default new AdminService(); 