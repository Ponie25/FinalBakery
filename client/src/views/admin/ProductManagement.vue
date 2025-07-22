<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Product Management</h2>
          <p class="mt-2 text-gray-600">Manage your bakery products and inventory</p>
        </div>
        <button
          @click="showAddModal = true"
          class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Product
        </button>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex-1 max-w-lg">
            <label for="search" class="sr-only">Search products</label>
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
                placeholder="Search products by name or category"
              />
            </div>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-4">
            <select
              v-model="categoryFilter"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
            >
              <option value="">All Categories</option>
              <option value="cakes">Cakes</option>
              <option value="breads">Breads</option>
              <option value="pastries">Pastries</option>
              <option value="beverages">Beverages</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div v-if="loading" class="flex flex-col justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
        <p class="text-gray-500">Loading products...</p>
      </div>
      
      <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
        <div class="mt-6">
          <button
            @click="showAddModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Product
          </button>
        </div>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div v-for="product in filteredProducts" :key="product._id" class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-t-lg">
            <img 
              :src="product.image || '/placeholder-product.jpg'" 
              :alt="product.name"
              class="w-full h-48 object-cover rounded-t-lg"
            />
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ product.category }}
              </span>
            </div>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ product.description }}</p>
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-bold text-gray-900">${{ product.price }}</span>
              <span class="text-sm text-gray-500">Stock: {{ product.stock }}</span>
            </div>
            <div class="flex space-x-2">
              <button
                @click="editProduct(product)"
                class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(product)"
                class="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showEditModal ? 'Edit Product' : 'Add New Product' }}
          </h3>
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  v-model="productForm.name"
                  type="text"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  v-model="productForm.description"
                  rows="3"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Category</label>
                <select
                  v-model="productForm.category"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="cakes">Cakes</option>
                  <option value="breads">Breads</option>
                  <option value="pastries">Pastries</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  v-model="productForm.price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  v-model="productForm.stock"
                  type="number"
                  min="0"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  v-model="productForm.image"
                  type="url"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div class="mt-6 flex space-x-3">
              <button
                type="submit"
                class="flex-1 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors duration-200"
              >
                {{ showEditModal ? 'Update Product' : 'Add Product' }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
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
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Delete Product</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete <strong>{{ productToDelete?.name }}</strong>? This action cannot be undone.
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="confirmDelete"
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
import { productAPI } from '@/helpers/api'
import { notificationService } from '@/services/notificationService'

export default {
  name: 'ProductManagement',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      products: [],
      loading: true,
      searchQuery: '',
      categoryFilter: '',
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      productToDelete: null,
      productForm: {
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        image: ''
      }
    }
  },
  computed: {
    filteredProducts() {
      let filtered = this.products

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        )
      }

      // Filter by category
      if (this.categoryFilter) {
        filtered = filtered.filter(product => product.category === this.categoryFilter)
      }

      return filtered
    }
  },
  async mounted() {
    await this.loadProducts()
  },
  methods: {
    async loadProducts() {
      try {
        this.loading = true
        const products = await productAPI.getAllProducts()
        this.products = products
      } catch (error) {
        console.error('Error loading products:', error)
        notificationService.error('Error', 'Failed to load products')
      } finally {
        this.loading = false
      }
    },
    
    editProduct(product) {
      this.productForm = { ...product }
      this.showEditModal = true
    },
    
    deleteProduct(product) {
      this.productToDelete = product
      this.showDeleteModal = true
    },
    
    async confirmDelete() {
      if (!this.productToDelete) return

      try {
        await productAPI.deleteProduct(this.productToDelete._id)
        notificationService.success('Success', 'Product deleted successfully')
        this.showDeleteModal = false
        this.productToDelete = null
        await this.loadProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
        notificationService.error('Error', 'Failed to delete product')
      }
    },
    
    async handleSubmit() {
      try {
        if (this.showEditModal) {
          await productAPI.updateProduct(this.productForm._id, this.productForm)
          notificationService.success('Success', 'Product updated successfully')
        } else {
          await productAPI.createProduct(this.productForm)
          notificationService.success('Success', 'Product created successfully')
        }
        this.closeModal()
        await this.loadProducts()
      } catch (error) {
        console.error('Error saving product:', error)
        notificationService.error('Error', 'Failed to save product')
      }
    },
    
    closeModal() {
      this.showAddModal = false
      this.showEditModal = false
      this.resetForm()
    },
    
    resetForm() {
      this.productForm = {
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        image: ''
      }
    }
  }
}
</script> 