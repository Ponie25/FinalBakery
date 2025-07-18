<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 backdrop-blur-md transition-all duration-300"
      style="background-color: rgba(255, 255, 255, 0.4);"
      @click="closeCart"
    ></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-lg mx-4 max-h-[80vh] flex flex-col transform transition-all duration-300 scale-100" style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);">
      <!-- Close button -->
      <button 
        @click="closeCart"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Header -->
      <div class="text-center p-6 pb-4">
        <div class="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13l-1.5 6.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-1">Your Cart</h2>
        <p class="text-sm text-gray-600">Review your selected items</p>
      </div>

      <!-- Cart Content - Scrollable -->
      <div class="flex-1 overflow-y-auto px-6">
        <div v-if="!user" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <p class="text-gray-500 text-lg">Please login to view your cart</p>
          <p class="text-gray-400 text-sm mt-1">Sign in to add items and manage your orders</p>
          <button @click="closeCart" class="mt-4 text-orange-500 hover:text-orange-600 font-medium">
            Close and Login
          </button>
        </div>
        
        <div v-else-if="cartItems.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13l-1.5 6.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
          </svg>
          <p class="text-gray-500 text-lg">Your cart is empty</p>
          <p class="text-gray-400 text-sm mt-1">Add some delicious items from our menu!</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="item in cartItems" :key="item.product_id" class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <!-- Product Image -->
            <div class="flex-shrink-0">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg">
              <div v-else class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            
            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 truncate">{{ item.name || 'Unknown Product' }}</h3>
              <p class="text-sm text-gray-600 mt-1">${{ item.price.toFixed(2) }} each</p>
              <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ item.description }}</p>
            </div>
            
            <!-- Quantity Controls -->
            <div class="flex-shrink-0 flex items-center">
              <button @click="decreaseQuantity(item)" class="bg-white hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 transition-colors shadow-sm border">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                </svg>
              </button>
              <span class="w-8 text-center text-sm font-semibold">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="bg-white hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 transition-colors shadow-sm border">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
              <button @click="removeItem(item)" class="text-red-400 hover:text-red-600 ml-2 transition-colors p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Footer - Fixed at bottom -->
      <div v-if="user && cartItems.length > 0" class="p-6 pt-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-bold text-gray-900">Total: ${{ totalPrice.toFixed(2) }}</span>
        </div>
        
        <div class="space-y-3">
          <button @click="checkout" class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-semibold text-lg shadow-lg">
            Checkout
          </button>
          <button @click="clearAllItems" class="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartService from '../../services/cartService.js';
import { notificationService } from '../../services/notificationService.js';

export default {
  name: 'CartModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      cartItems: [],
      totalPrice: 0
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.loadCart();
      }
    }
  },
  methods: {
    closeCart() {
      this.$emit('close');
    },
    
    async loadCart() {
      try {
        if (!this.user) {
          this.cartItems = [];
          this.totalPrice = 0;
          return;
        }
        
        const userId = this.user._id;
        const cart = await cartService.getCart(userId);
        
        if (cart && cart.items) {
          // Populate cart items with product details
          this.cartItems = await Promise.all(cart.items.map(async (item) => {
            try {
              const product = await this.getProductById(item.product_id);
              return {
                ...item,
                name: product.name,
                image: product.image,
                description: product.description
              };
            } catch (error) {
              console.error('Failed to load product details:', error);
              return {
                ...item,
                name: 'Unknown Product',
                image: '',
                description: ''
              };
            }
          }));
          this.totalPrice = cart.total_price || 0;
        } else {
          this.cartItems = [];
          this.totalPrice = 0;
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
        this.cartItems = [];
        this.totalPrice = 0;
      }
    },

    async getProductById(productId) {
      try {
        const response = await cartService.getProductById(productId);
        return response;
      } catch (error) {
        throw error;
      }
    },
    
        async increaseQuantity(item) {
      try {
        if (!this.user) return;
        
        const userId = this.user._id;
        const newQuantity = item.quantity + 1;
        await cartService.updateQuantity(userId, item.product_id, newQuantity);
        await this.loadCart();
        this.updateCartCount();
        notificationService.success('Quantity updated');
      } catch (error) {
        notificationService.error('Failed to update quantity');
      }
    },
    
    async decreaseQuantity(item) {
      if (item.quantity <= 1) {
        await this.removeItem(item);
        return;
      }
      
      try {
        if (!this.user) return;
        
        const userId = this.user._id;
        const newQuantity = item.quantity - 1;
        await cartService.updateQuantity(userId, item.product_id, newQuantity);
        await this.loadCart();
        this.updateCartCount();
        notificationService.success('Quantity updated');
      } catch (error) {
        notificationService.error('Failed to update quantity');
      }
    },
    
    async removeItem(item) {
      try {
        if (!this.user) return;
        
        const userId = this.user._id;
        await cartService.removeFromCart(userId, item.product_id);
        await this.loadCart();
        this.updateCartCount();
        notificationService.success('Item removed from cart');
      } catch (error) {
        notificationService.error('Failed to remove item');
      }
    },
    
    async clearAllItems() {
      try {
        if (!this.user) return;
        
        const userId = this.user._id;
        await cartService.clearCart(userId);
        await this.loadCart();
        this.updateCartCount();
        notificationService.success('Cart cleared');
      } catch (error) {
        notificationService.error('Failed to clear cart');
      }
    },

    updateCartCount() {
      // Update cart count in navbar
      this.$parent?.$refs?.navbar?.loadCartCount();
    },
    
    checkout() {
      // TODO: Implement checkout functionality
             notificationService.info('Checkout functionality coming soon!');
      this.closeCart();
    }
  }
};
</script> 