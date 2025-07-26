<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      <p class="mt-2 text-gray-600">Welcome to your bakery management dashboard</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <UserGroupIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.totalUsers }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <CubeIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.totalProducts }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                <ShoppingBagIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.totalOrders }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <CurrencyDollarIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                <dd class="text-lg font-medium text-gray-900">${{ stats.totalRevenue }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Quick Actions -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <router-link
              to="/admin/products"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <PlusIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">Add New Product</h4>
                <p class="text-sm text-gray-500">Create a new product listing</p>
              </div>
            </router-link>

            <router-link
              to="/admin/users"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UsersIcon class="w-6 h-6 text-green-600" />
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">Manage Users</h4>
                <p class="text-sm text-gray-500">View and manage user accounts</p>
              </div>
            </router-link>

            <router-link
              to="/admin/orders"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <ClipboardDocumentListIcon class="w-6 h-6 text-orange-600" />
              </div>
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">View Orders</h4>
                <p class="text-sm text-gray-500">Check recent orders and status</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div class="p-6">
          <div v-if="recentActivity.length > 0" class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <InboxIcon class="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm text-gray-900">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <ExclamationCircleIcon class="w-6 h-6 text-gray-400" />
            </div>
            <p class="text-sm text-gray-500">No recent activity</p>
            <p class="text-xs text-gray-400 mt-1">Orders will appear here when customers place them</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminService from '../../services/adminService.js';
import { notificationService } from '../../services/notificationService.js';
import {
  UserGroupIcon,
  CubeIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  PlusIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  InboxIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline';

export default {
  name: 'AdminDashboard',
  components: {
    UserGroupIcon,
    CubeIcon,
    ShoppingBagIcon,
    CurrencyDollarIcon,
    PlusIcon,
    UsersIcon,
    ClipboardDocumentListIcon,
    InboxIcon,
    ExclamationCircleIcon
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      stats: {
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0
      },
      recentActivity: []
    }
  },
  async mounted() {
    await this.loadStats()
    await this.loadRecentActivity()
  },
  methods: {
    async loadStats() {
      try {
        // Load order stats
        const orderStats = await adminService.getOrderStats();
        
        // Load user and product counts
        const users = await adminService.getAllUsers();
        const products = await adminService.getAllProducts();
        
        this.stats = {
          totalUsers: users.length,
          totalProducts: products.length,
          totalOrders: orderStats.totalOrders,
          totalRevenue: orderStats.totalRevenue.toFixed(2)
        };
      } catch (error) {
        console.error('Failed to load stats:', error);
        notificationService.error('Failed to load dashboard statistics');
        
        // Set default values on error
        this.stats = {
          totalUsers: 0,
          totalProducts: 0,
          totalOrders: 0,
          totalRevenue: '0.00'
        };
      }
    },

    async loadRecentActivity() {
      try {
        // Load recent orders for activity feed
        const orders = await adminService.getAllOrders();
        
        // Backend already sorts by newest first, so just take the first 5
        const recentOrders = orders.slice(0, 5);
        
        this.recentActivity = recentOrders.map((order, index) => ({
          id: index + 1,
          description: `Order #${order.order_number} - ${order.customer_name} - $${order.total_amount.toFixed(2)}`,
          time: this.formatTimeAgo(order.order_date),
          type: 'order'
        }));
      } catch (error) {
        console.error('Failed to load recent activity:', error);
        this.recentActivity = [];
      }
    },

    formatTimeAgo(dateString) {
      if (!dateString) {
        return 'Unknown time';
      }
      
      const date = new Date(dateString);
      const now = new Date();
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return 'Invalid date';
      }
      
      const diffInMs = now.getTime() - date.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      
      if (diffInMinutes < 1) {
        return 'Just now';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
      } else {
        // For older dates, show the actual date
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
    }
  }
}
</script>