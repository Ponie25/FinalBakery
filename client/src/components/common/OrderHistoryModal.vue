<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 backdrop-blur-md transition-all duration-300"
      style="background-color: rgba(255, 255, 255, 0.4);"
      @click="closeOrderHistory"
    ></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100" style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);">
      <!-- Close button -->
      <button 
        @click="closeOrderHistory"
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-1">Order History</h2>
        <p class="text-sm text-gray-600">Your past orders and their status</p>
      </div>

      <!-- Content - Scrollable -->
      <div class="flex-1 overflow-y-auto px-6">
        <div v-if="isLoading" class="text-center py-12">
          <svg class="animate-spin h-8 w-8 text-orange-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-500">Loading your orders...</p>
        </div>

        <div v-else-if="orders.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <p class="text-gray-500 text-lg">No orders found</p>
          <p class="text-gray-400 text-sm mt-1">Start shopping to see your order history here</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="order in orders" :key="order._id" class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <!-- Order Header -->
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-semibold text-gray-900">Order #{{ order.order_number }}</h3>
                <p class="text-sm text-gray-600">{{ formatDate(order.order_date) }}</p>
              </div>
              <div class="text-right">
                <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                </span>
                <p class="text-lg font-bold text-gray-900 mt-1">${{ order.total_amount.toFixed(2) }}</p>
              </div>
            </div>

            <!-- Order Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <p class="text-sm font-medium text-gray-700">Customer</p>
                <p class="text-sm text-gray-900">{{ order.customer_name }}</p>
                <p v-if="order.customer_email" class="text-sm text-gray-600">{{ order.customer_email }}</p>
                <p v-if="order.customer_phone" class="text-sm text-gray-600">{{ order.customer_phone }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Payment</p>
                <p class="text-sm text-gray-900 capitalize">{{ order.payment_method.replace('_', ' ') }}</p>
                <span :class="getPaymentStatusClass(order.payment_status)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1) }}
                </span>
              </div>
            </div>

            <!-- Products -->
            <div class="border-t pt-3">
              <p class="text-sm font-medium text-gray-700 mb-2">Products:</p>
              <div class="space-y-2">
                <div v-for="product in order.products" :key="product._id" class="flex items-center space-x-3">
                  <img v-if="product.image" :src="product.image" :alt="product.name" class="w-8 h-8 object-cover rounded">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-xs text-gray-600">{{ product.description }}</p>
                  </div>
                  <p class="text-sm font-semibold text-gray-900">${{ product.price.toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <!-- Address -->
            <div v-if="order.customer_address" class="border-t pt-3 mt-3">
              <p class="text-sm font-medium text-gray-700">Delivery Address:</p>
              <p class="text-sm text-gray-900">{{ order.customer_address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkoutService from '../../services/checkoutService.js';
import { notificationService } from '../../services/notificationService.js';

export default {
  name: 'OrderHistoryModal',
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
      orders: [],
      isLoading: false
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal && this.user) {
        this.loadOrders();
      }
    }
  },
  methods: {
    closeOrderHistory() {
      this.$emit('close');
    },
    
    async loadOrders() {
      if (!this.user) return;
      
      this.isLoading = true;
      try {
        const orders = await checkoutService.getUserOrders(this.user._id);
        this.orders = orders || [];
      } catch (error) {
        console.error('Failed to load orders:', error);
        notificationService.error('Failed to load order history');
        this.orders = [];
      } finally {
        this.isLoading = false;
      }
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    getStatusClass(status) {
      const classes = {
        pending: 'bg-orange-100 text-orange-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    },
    
    getPaymentStatusClass(status) {
      const classes = {
        pending: 'bg-orange-100 text-orange-800',
        paid: 'bg-green-100 text-green-800',
        failed: 'bg-red-100 text-red-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    }
  }
};
</script> 