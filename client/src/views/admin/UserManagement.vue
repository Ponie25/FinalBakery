<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
        <p class="mt-2 text-gray-600">Manage user accounts and permissions</p>
      </div>

      <!-- Access Denied Message -->
      <div v-if="!isAdmin" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Access Denied</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>You need administrator privileges to access this page.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Dashboard -->
      <div v-else>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ users.length }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ activeUsersCount }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Admins</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ adminUsersCount }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Recent Activity</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ recentUsersCount }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div class="flex-1 max-w-lg">
                <label for="search" class="sr-only">Search users</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    v-model="searchQuery"
                    type="text"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Search users by name, email, or username"
                  />
                </div>
              </div>
              <div class="mt-4 sm:mt-0 sm:ml-4">
                <select
                  v-model="roleFilter"
                  class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div v-if="loading" class="flex flex-col justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
            <p class="text-gray-500">Loading users...</p>
          </div>
          
          <div v-else-if="filteredUsers.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
          
          <ul v-else class="divide-y divide-gray-200">
            <li v-for="user in filteredUsers" :key="user._id" class="px-6 py-4 hover:bg-gray-50">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-orange-800">
                        {{ user.fullName.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="flex items-center">
                      <p class="text-sm font-medium text-gray-900">{{ user.fullName }}</p>
                      <span
                        :class="[
                          'ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        ]"
                      >
                        {{ user.role }}
                      </span>
                    </div>
                    <div class="mt-1 flex items-center text-sm text-gray-500">
                      <span>{{ user.email }}</span>
                      <span v-if="user.username" class="ml-2">• {{ user.username }}</span>
                      <span v-if="user.phoneNumber" class="ml-2">• {{ user.phoneNumber }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <!-- Role Change Dropdown -->
                  <select
                    v-if="user._id !== currentUser._id"
                    :value="user.role"
                    @change="updateUserRole(user._id, $event.target.value)"
                    class="text-sm border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  
                  <!-- Delete Button -->
                  <button
                    v-if="user._id !== currentUser._id"
                    @click="confirmDeleteUser(user)"
                    class="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                  
                  <!-- Current User Indicator -->
                  <span v-else class="text-sm text-gray-500">Current User</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Delete User</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete <strong>{{ userToDelete?.fullName }}</strong>? This action cannot be undone.
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="deleteUser"
              class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete
            </button>
            <button
              @click="showDeleteModal = false"
              class="mt-2 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userAPI } from '@/helpers/api'
import { notificationService } from '@/services/notificationService'

export default {
  name: 'UserManagement',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      users: [],
      loading: true,
      searchQuery: '',
      roleFilter: '',
      showDeleteModal: false,
      userToDelete: null
    }
  },
  computed: {
    isAdmin() {
      return this.user && this.user.role === 'admin'
    },
    currentUser() {
      return this.user
    },
    filteredUsers() {
      let filtered = this.users

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(user => 
          user.fullName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          (user.username && user.username.toLowerCase().includes(query))
        )
      }

      // Filter by role
      if (this.roleFilter) {
        filtered = filtered.filter(user => user.role === this.roleFilter)
      }

      return filtered
    },
    activeUsersCount() {
      return this.users.length
    },
    adminUsersCount() {
      return this.users.filter(user => user.role === 'admin').length
    },
    recentUsersCount() {
      // Return users registered in the last 7 days
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      return this.users.filter(user => {
        const userDate = new Date(user.createdAt || user._id);
        return userDate >= oneWeekAgo;
      }).length;
    }
  },
  async mounted() {
    if (this.isAdmin) {
      await this.loadUsers()
    }
  },
  watch: {
    user: {
      handler(newUser) {
        if (newUser && newUser.role === 'admin') {
          this.loadUsers()
        }
      },
      immediate: true
    }
  },
  methods: {
    async loadUsers() {
      try {
        this.loading = true
        const users = await userAPI.getAllUsers()
        this.users = users
      } catch (error) {
        console.error('Error loading users:', error)
        if (error.response?.status === 403) {
          notificationService.error('Access Denied', 'You need to be logged in as an admin to access this page.')
        } else if (error.response?.status === 401) {
          notificationService.error('Authentication Required', 'Please log in first.')
        } else {
          notificationService.error('Error', 'Failed to load users: ' + (error.response?.data?.message || error.message))
        }
      } finally {
        this.loading = false
      }
    },
    async updateUserRole(userId, newRole) {
      try {
        await userAPI.updateUserRole(userId, newRole)
        notificationService.success('Success', 'User role updated successfully')
        await this.loadUsers() // Reload users to get updated data
      } catch (error) {
        console.error('Error updating user role:', error)
        const errorMessage = error.response?.data?.message || 'Failed to update user role'
        notificationService.error('Error', errorMessage)
      }
    },
    confirmDeleteUser(user) {
      this.userToDelete = user
      this.showDeleteModal = true
    },
    async deleteUser() {
      if (!this.userToDelete) return

      try {
        await userAPI.deleteUser(this.userToDelete._id)
        notificationService.success('Success', 'User deleted successfully')
        this.showDeleteModal = false
        this.userToDelete = null
        await this.loadUsers() // Reload users to get updated data
      } catch (error) {
        console.error('Error deleting user:', error)
        const errorMessage = error.response?.data?.message || 'Failed to delete user'
        notificationService.error('Error', errorMessage)
      }
    }
  }
}
</script> 