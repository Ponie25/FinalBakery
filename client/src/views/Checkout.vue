<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p class="text-lg text-gray-600">Complete your order</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Order Summary -->
        <div class="lg:order-2">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div class="space-y-4">
              <div v-for="item in cartItems" :key="item.product_id" class="flex justify-between items-center py-3 border-b border-gray-100">
                <div class="flex items-center space-x-3">
                  <img v-if="item.image" :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded-lg">
                  <div>
                    <p class="font-medium text-gray-900">{{ item.name }}</p>
                    <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                  </div>
                </div>
                <p class="font-semibold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
              <div class="border-t pt-4">
                <div class="flex justify-between items-center">
                  <span class="text-xl font-bold text-gray-900">Total:</span>
                  <span class="text-2xl font-bold text-gray-900">${{ totalPrice.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Information Form -->
        <div class="lg:order-1">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Customer Information</h2>
            <form @submit.prevent="processCheckout" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input 
                    v-model="formData.customer_name" 
                    type="text" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your full name"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    v-model="formData.customer_email" 
                    type="email" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your email"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    v-model="formData.customer_phone" 
                    type="tel" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your phone number"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select 
                    v-model="formData.payment_method" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <textarea 
                  v-model="formData.customer_address" 
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your delivery address"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Order Notes (Optional)</label>
                <textarea 
                  v-model="formData.notes" 
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Any special instructions or notes"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="pt-6">
                <button 
                  type="submit" 
                  :disabled="isProcessing"
                  class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-semibold text-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="isProcessing" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                  <span v-else>Place Order</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkoutService from '../services/checkoutService.js';
import { notificationService } from '../services/notificationService.js';
import cartService from '../services/cartService.js';

export default {
  name: 'Checkout',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isProcessing: false,
      cartItems: [],
      totalPrice: 0,
      formData: {
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_address: '',
        payment_method: 'cash',
        notes: ''
      }
    };
  },
  async mounted() {
    if (!this.user) {
      this.$router.push('/');
      return;
    }
    await this.loadCart();
    this.initializeForm();
  },
  methods: {
    async loadCart() {
      try {
        const cart = await cartService.getCart();
        
        if (cart && cart.items) {
          // Populate cart items with product details
          this.cartItems = await Promise.all(cart.items.map(async (item) => {
            try {
              const product = await cartService.getProductById(item.product_id);
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
    
    initializeForm() {
      // Pre-fill form with user data if available
      this.formData = {
        customer_name: this.user.fullName || '',
        customer_email: this.user.email || '',
        customer_phone: this.user.phoneNumber || '',
        customer_address: '',
        payment_method: 'cash',
        notes: ''
      };
    },
    
    async processCheckout() {
      if (!this.user || this.cartItems.length === 0) {
        notificationService.error('Invalid checkout data');
        return;
      }

      // Validate required fields
      if (!this.formData.customer_name.trim()) {
        notificationService.error('Please enter your full name');
        return;
      }

      if (!this.formData.customer_email && !this.formData.customer_phone) {
        notificationService.error('Please provide either email or phone number');
        return;
      }

      this.isProcessing = true;

      try {
        const orderData = {
          customer_name: this.formData.customer_name,
          customer_email: this.formData.customer_email,
          customer_phone: this.formData.customer_phone,
          customer_address: this.formData.customer_address,
          payment_method: this.formData.payment_method,
          notes: this.formData.notes
        };

        const result = await checkoutService.createOrderFromCart(orderData);
        
        notificationService.success('Order placed successfully!');
        
        // Redirect to order confirmation or home
        this.$router.push('/');
        
      } catch (error) {
        console.error('Checkout error:', error);
        notificationService.error(error.message || 'Failed to place order');
      } finally {
        this.isProcessing = false;
      }
    }
  }
};
</script> 