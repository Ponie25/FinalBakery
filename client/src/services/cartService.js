import api from '../helpers/api.js';

class CartService {
    // Get user's cart
    async getCart(userId) {
        try {
            const response = await api.get(`/cart/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get cart');
        }
    }

    // Add item to cart
    async addToCart(userId, productId, quantity, price) {
        try {
            const response = await api.post('/cart/add', {
                user_id: userId,
                product_id: productId,
                quantity: quantity,
                price: price
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to add item to cart');
        }
    }

    // Update item quantity
    async updateQuantity(userId, productId, quantity) {
        try {
            const response = await api.put(`/cart/update/${userId}`, {
                productId: productId,
                quantity: quantity
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update quantity');
        }
    }

    // Remove item from cart
    async removeFromCart(userId, productId) {
        try {
            const response = await api.delete(`/cart/remove/${userId}`, {
                data: { productId: productId }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to remove item');
        }
    }

    // Clear entire cart
    async clearCart(userId) {
        try {
            const response = await api.delete(`/cart/clear/${userId}`);
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