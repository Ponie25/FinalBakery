<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 backdrop-blur-md transition-all duration-300"
      style="background-color: rgba(255, 255, 255, 0.4);"
      @click="closeCheckout"
    ></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100" style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);">
      <!-- Close button -->
      <button 
        @click="closeCheckout"
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-1">Checkout</h2>
        <p class="text-sm text-gray-600">Complete your order</p>
      </div>

      <!-- Checkout Content - Scrollable -->
      <div class="flex-1 overflow-y-auto px-6">
        <!-- Order Summary -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div class="bg-gray-50 rounded-lg p-4">
            <div v-for="item in cartItems" :key="item.product_id" class="flex justify-between items-center py-2">
              <div class="flex items-center space-x-3">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="w-10 h-10 object-cover rounded">
                <div>
                  <p class="font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                </div>
              </div>
              <p class="font-semibold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
            <div class="border-t pt-3 mt-3">
              <div class="flex justify-between items-center">
                <span class="text-lg font-bold text-gray-900">Total:</span>
                <span class="text-xl font-bold text-gray-900">${{ totalPrice.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Information Form -->
        <form @submit.prevent="processCheckout" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input 
                v-model="formData.customer_name" 
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter your full name"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                v-model="formData.customer_email" 
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter your email"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input 
                v-model="formData.customer_phone" 
                type="tel" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter your phone number"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select 
                v-model="formData.payment_method" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
            <textarea 
              v-model="formData.customer_address" 
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Enter your delivery address"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
            <textarea 
              v-model="formData.notes" 
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Any special instructions or notes"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button 
              type="submit" 
              :disabled="isProcessing"
              class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isProcessing" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
</template>

<script>
import checkoutService from '../../services/checkoutService.js';
import { notificationService } from '../../services/notificationService.js';

export default {
  name: 'CheckoutModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    },
    cartItems: {
      type: Array,
      default: () => []
    },
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isProcessing: false,
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
  watch: {
    isOpen(newVal) {
      if (newVal && this.user) {
        this.initializeForm();
      }
    }
  },
  methods: {
    closeCheckout() {
      this.$emit('close');
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
          userId: this.user._id,
          customer_name: this.formData.customer_name,
          customer_email: this.formData.customer_email,
          customer_phone: this.formData.customer_phone,
          customer_address: this.formData.customer_address,
          payment_method: this.formData.payment_method,
          notes: this.formData.notes
        };

        const result = await checkoutService.createOrderFromCart(this.user._id, orderData);
        
        notificationService.success('Order placed successfully!');
        
        // Emit success event to parent
        this.$emit('order-success', result.order);
        
        // Close checkout modal
        this.closeCheckout();
        
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