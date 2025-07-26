import api from '../helpers/api.js';

class CheckoutService {
    // Create new order
    async createOrder(orderData) {
        try {
            const response = await api.post('/checkout', orderData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create order');
        }
    }

    // Create order from cart
    async createOrderFromCart(customerInfo) {
        try {
            const response = await api.post('/checkout/cart', customerInfo);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create order from cart');
        }
    }

    // Get user's orders
    async getUserOrders() {
        try {
            const response = await api.get('/checkout/orders');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get user orders');
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
}

export default new CheckoutService(); 