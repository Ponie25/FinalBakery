<template>
  <div>
    <!-- Order Details View -->
    <div v-if="selectedOrder" class="space-y-6">
      <!-- Back Button and Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button 
            @click="selectedOrder = null"
            class="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium"
          >
            <ArrowLeftIcon class="w-5 h-5" />
            <span>Back to Orders</span>
          </button>
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Order #{{ selectedOrder.order_number }}</h2>
      </div>

      <!-- Order Status Update Section -->
      <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h4 class="font-semibold text-gray-900 mb-4">Update Order Status</h4>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">Current Status:</span>
          <span :class="getStatusClass(selectedOrder.status)" class="px-3 py-1 text-sm font-medium rounded-full">
            {{ selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) }}
          </span>
          <span class="text-sm text-gray-600">→</span>
          <select 
            v-model="newStatus" 
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button 
            @click="updateOrderStatus(selectedOrder._id, newStatus)"
            :disabled="newStatus === selectedOrder.status || isUpdating"
            class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isUpdating">Updating...</span>
            <span v-else>Update Status</span>
          </button>
        </div>
      </div>

      <!-- Order Information Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Customer Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h4 class="font-semibold text-gray-900 mb-4 flex items-center">
            <UserIcon class="w-5 h-5 text-gray-500 mr-2" />
            Customer Information
          </h4>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-gray-500">Name</p>
              <p class="text-gray-900">{{ selectedOrder.customer_name }}</p>
            </div>
            <div v-if="selectedOrder.customer_email">
              <p class="text-sm font-medium text-gray-500">Email</p>
              <p class="text-gray-900">{{ selectedOrder.customer_email }}</p>
            </div>
            <div v-if="selectedOrder.customer_phone">
              <p class="text-sm font-medium text-gray-500">Phone</p>
              <p class="text-gray-900">{{ selectedOrder.customer_phone }}</p>
            </div>
            <div v-if="selectedOrder.customer_address">
              <p class="text-sm font-medium text-gray-500">Address</p>
              <p class="text-gray-900">{{ selectedOrder.customer_address }}</p>
            </div>
          </div>
        </div>

        <!-- Order Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h4 class="font-semibold text-gray-900 mb-4 flex items-center">
            <ClipboardDocumentIcon class="w-5 h-5 text-gray-500 mr-2" />
            Order Information
          </h4>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-gray-500">Order Date</p>
              <p class="text-gray-900">{{ formatDate(selectedOrder.order_date) }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Total Amount</p>
              <p class="text-2xl font-bold text-gray-900">${{ selectedOrder.total_amount.toFixed(2) }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Payment Method</p>
              <p class="text-gray-900 capitalize">{{ selectedOrder.payment_method.replace('_', ' ') }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Payment Status</p>
              <span :class="getPaymentStatusClass(selectedOrder.payment_status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ selectedOrder.payment_status.charAt(0).toUpperCase() + selectedOrder.payment_status.slice(1) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Order Status -->
        <div class="bg-white rounded-lg shadow p-6">
          <h4 class="font-semibold text-gray-900 mb-4 flex items-center">
            <CubeIcon class="w-5 h-5 text-gray-500 mr-2" />
            Order Status
          </h4>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-gray-500">Current Status</p>
              <span :class="getStatusClass(selectedOrder.status)" class="px-3 py-1 text-sm font-medium rounded-full">
                {{ selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) }}
              </span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Items</p>
              <p class="text-gray-900">{{ selectedOrder.products.length }} product{{ selectedOrder.products.length !== 1 ? 's' : '' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h4 class="font-semibold text-gray-900 flex items-center">
            <InboxIcon class="w-5 h-5 text-gray-500 mr-2" />
            Products ({{ selectedOrder.products.length }})
          </h4>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="product in selectedOrder.products" :key="product._id" class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img v-if="product.image" :src="product.image" :alt="product.name" class="w-16 h-16 object-cover rounded-lg">
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ product.name }}</p>
                <p class="text-sm text-gray-600">{{ product.description }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">${{ product.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders List View -->
    <div v-else>
      <!-- Page Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Order Management</h2>
        <p class="mt-2 text-gray-600">Manage customer orders and track delivery status</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <ClipboardDocumentIcon class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Orders</p>
              <p class="text-2xl font-bold text-gray-900">{{ orders.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-orange-100 rounded-lg">
              <InboxIcon class="w-6 h-6 text-orange-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-bold text-gray-900">{{ pendingOrders.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon class="w-6 h-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Delivered</p>
              <p class="text-2xl font-bold text-gray-900">{{ deliveredOrders.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <XMarkIcon class="w-6 h-6 text-red-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Cancelled</p>
              <p class="text-2xl font-bold text-gray-900">{{ cancelledOrders.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow mb-6 p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select v-model="paymentFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option value="">All Payment Methods</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <div class="flex space-x-2">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search orders..." 
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
            <button 
              @click="refreshOrders" 
              :disabled="isLoading"
              class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              <ArrowPathIcon v-if="isLoading" class="animate-spin h-5 w-5" />
              <ArrowPathIcon v-else class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <ArrowPathIcon class="animate-spin h-12 w-12 text-orange-500 mx-auto mb-4" />
        <p class="text-gray-500 text-lg">Loading orders...</p>
      </div>

      <!-- Orders Table -->
      <div v-else-if="filteredOrders.length > 0" class="bg-white shadow rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in filteredOrders" :key="order._id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#{{ order.order_number }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ order.customer_name }}</div>
                  <div class="text-sm text-gray-500">{{ order.customer_email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-bold text-gray-900">${{ order.total_amount.toFixed(2) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(order.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.order_date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="viewOrderDetails(order)"
                    class="text-orange-600 hover:text-orange-900 font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white shadow rounded-lg p-8 text-center">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
          <ClipboardDocumentIcon class="h-8 w-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
        <p class="text-gray-600">No orders match your current filters.</p>
      </div>
    </div>
  </div>
</template>

<script>
import adminService from '../../services/adminService.js';
import { notificationService } from '../../services/notificationService.js';
import {
  ArrowLeftIcon,
  UserIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  CubeIcon,
  ClockIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  InboxIcon
} from '@heroicons/vue/24/outline';

export default {
  name: 'OrderManagement',
  components: {
    ArrowLeftIcon,
    UserIcon,
    ClipboardDocumentIcon,
    CheckCircleIcon,
    CubeIcon,
    ClockIcon,
    CheckIcon,
    XMarkIcon,
    ArrowPathIcon,
    InboxIcon
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      orders: [],
      isLoading: false,
      isUpdating: false,
      selectedOrder: null,
      newStatus: '',
      statusFilter: '',
      paymentFilter: '',
      searchQuery: ''
    };
  },
  computed: {
    filteredOrders() {
      let filtered = this.orders;

      // Status filter
      if (this.statusFilter) {
        filtered = filtered.filter(order => order.status === this.statusFilter);
      }

      // Payment filter
      if (this.paymentFilter) {
        filtered = filtered.filter(order => order.payment_method === this.paymentFilter);
      }

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(order => 
          order.order_number.toLowerCase().includes(query) ||
          order.customer_name.toLowerCase().includes(query) ||
          order.customer_email?.toLowerCase().includes(query) ||
          order.customer_phone?.toLowerCase().includes(query)
        );
      }

      return filtered;
    },
    pendingOrders() {
      return this.orders.filter(order => order.status === 'pending');
    },
    deliveredOrders() {
      return this.orders.filter(order => order.status === 'delivered');
    },
    cancelledOrders() {
      return this.orders.filter(order => order.status === 'cancelled');
    }
  },
  async mounted() {
    await this.loadOrders();
  },
  methods: {
    async loadOrders() {
      this.isLoading = true;
      try {
        const orders = await adminService.getAllOrders();
        this.orders = orders || [];
              } catch (error) {
          console.error('Failed to load orders:', error);
          notificationService.error('Failed to load orders');
          this.orders = [];
      } finally {
        this.isLoading = false;
      }
    },

    async refreshOrders() {
      await this.loadOrders();
    },

    async updateOrderStatus(orderId, status) {
      this.isUpdating = true;
      try {
        await adminService.updateOrderStatus(orderId, status);
        notificationService.success('Order status updated successfully');
        await this.loadOrders(); // Refresh the list
        this.selectedOrder.status = status; // Update the current view
      } catch (error) {
        console.error('Failed to update order status:', error);
        notificationService.error('Failed to update order status');
      } finally {
        this.isUpdating = false;
      }
    },

    viewOrderDetails(order) {
      this.selectedOrder = order;
      this.newStatus = order.status; // Initialize with current status
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