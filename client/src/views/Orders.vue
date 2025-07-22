<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
        <p class="text-lg text-gray-600">Your past orders and their status</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <svg class="animate-spin h-12 w-12 text-orange-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-500 text-lg">Loading your orders...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="orders.length === 0" class="text-center py-12">
        <svg class="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <h2 class="text-2xl font-bold text-gray-500 mb-2">No orders found</h2>
        <p class="text-gray-400 text-lg mb-6">Start shopping to see your order history here</p>
        <router-link to="/menu" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          Browse Menu
        </router-link>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order._id" class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <!-- Order Header -->
          <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div class="mb-4 md:mb-0">
              <h3 class="text-xl font-bold text-gray-900 mb-1">Order #{{ order.order_number }}</h3>
              <p class="text-gray-600">{{ formatDate(order.order_date) }}</p>
            </div>
            <div class="flex flex-col items-start md:items-end space-y-2">
              <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
              </span>
              <p class="text-2xl font-bold text-gray-900">${{ order.total_amount.toFixed(2) }}</p>
            </div>
          </div>

          <!-- Order Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 mb-3">Customer Information</h4>
              <div class="space-y-2">
                <p class="text-sm"><span class="font-medium">Name:</span> {{ order.customer_name }}</p>
                <p v-if="order.customer_email" class="text-sm"><span class="font-medium">Email:</span> {{ order.customer_email }}</p>
                <p v-if="order.customer_phone" class="text-sm"><span class="font-medium">Phone:</span> {{ order.customer_phone }}</p>
                <p v-if="order.customer_address" class="text-sm"><span class="font-medium">Address:</span> {{ order.customer_address }}</p>
              </div>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 mb-3">Payment Information</h4>
              <div class="space-y-2">
                <p class="text-sm"><span class="font-medium">Method:</span> <span class="capitalize">{{ order.payment_method.replace('_', ' ') }}</span></p>
                <span :class="getPaymentStatusClass(order.payment_status)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Products -->
          <div class="border-t pt-6">
            <h4 class="font-semibold text-gray-900 mb-4">Products</h4>
            <div class="space-y-4">
              <div v-for="product in order.products" :key="product._id" class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img v-if="product.image" :src="product.image" :alt="product.name" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-sm text-gray-600 line-clamp-2">{{ product.description }}</p>
                </div>
                <p class="font-semibold text-gray-900">${{ product.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkoutService from '../services/checkoutService.js';
import { notificationService } from '../services/notificationService.js';

export default {
  name: 'Orders',
  props: {
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
  async mounted() {
    if (!this.user) {
      this.$router.push('/');
      return;
    }
    await this.loadOrders();
  },
  methods: {
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
        month: 'long',
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