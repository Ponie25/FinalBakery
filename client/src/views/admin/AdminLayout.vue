<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">Welcome, {{ user?.fullName }}</span>
            <router-link to="/" class="text-orange-600 hover:text-orange-500 text-sm font-medium">
              Back to Site
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Admin Sidebar -->
        <div class="lg:w-64 flex-shrink-0">
          <nav class="bg-white shadow rounded-lg p-4">
            <div class="space-y-2">
              <router-link
                v-for="item in adminMenuItems"
                :key="item.path"
                :to="item.path"
                class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                :class="[
                  $route.path === item.path
                    ? 'bg-orange-100 text-orange-700 border-r-2 border-orange-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                ]"
              >
                <component :is="item.icon" class="w-5 h-5 mr-3" />
                {{ item.name }}
              </router-link>
            </div>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <router-view :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  UserGroupIcon, 
  CubeIcon, 
  ShoppingCartIcon, 
  ChartBarIcon,
  CogIcon,
  HomeIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'AdminLayout',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      adminMenuItems: [
        {
          name: 'Dashboard',
          path: '/admin',
          icon: HomeIcon
        },
        {
          name: 'User Management',
          path: '/admin/users',
          icon: UserGroupIcon
        },
        {
          name: 'Product Management',
          path: '/admin/products',
          icon: CubeIcon
        },
        {
          name: 'Order Management',
          path: '/admin/orders',
          icon: ShoppingCartIcon
        },
        {
          name: 'Analytics',
          path: '/admin/analytics',
          icon: ChartBarIcon
        },
        {
          name: 'Settings',
          path: '/admin/settings',
          icon: CogIcon
        }
      ]
    }
  },
  computed: {
    isAdmin() {
      return this.user && this.user.role === 'admin'
    }
  },
  mounted() {
    if (!this.isAdmin) {
      this.$router.push('/')
    }
  }
}
</script> 