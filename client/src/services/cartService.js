import api from '../helpers/api.js';

class CartService {
    // Get user's cart
    async getCart() {
        try {
            const response = await api.get(`/cart`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get cart');
        }
    }

    // Add item to cart
    async addToCart(productId, quantity, price) {
        try {
            const requestData = {
                product_id: productId,
                quantity: quantity,
                price: price
            };
            
            const response = await api.post('/cart/add', requestData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to add item to cart');
        }
    }

    // Update item quantity
    async updateQuantity(productId, quantity) {
        try {
            const response = await api.put(`/cart/update`, {
                product_id: productId,
                quantity: quantity
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update quantity');
        }
    }

    // Remove item from cart
    async removeFromCart(productId) {
        try {
            const response = await api.delete(`/cart/remove`, {
                data: { product_id: productId }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to remove item');
        }
    }

    // Clear entire cart
    async clearCart() {
        try {
            const response = await api.delete(`/cart/clear`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to clear cart');
        }
    }

    // Get product by ID
    async getProductById(productId) {
        try {
            const response = await api.get(`/products/${productId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get product details');
        }
    }
}

export default new CartService(); 