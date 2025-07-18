<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Menu Header -->
        <section class="bg-gradient-to-r from-orange-50 to-yellow-50 py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Our Menu</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Discover our artisanal collection of freshly baked goods, premium beverages, and specialty items. 
                    Each product is crafted with the finest ingredients and traditional techniques.
                </p>
            </div>
        </section>

        <!-- Loading State -->
        <div v-if="loading" class="py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p class="text-xl text-gray-600">Loading delicious menu items...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                    <div class="text-4xl mb-4">😔</div>
                    <h3 class="text-xl font-semibold text-red-800 mb-2">Unable to Load Menu</h3>
                    <p class="text-red-600 mb-4">{{ error }}</p>
                    <button 
                        @click="fetchProducts" 
                        class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>

        <!-- Menu Content -->
        <section v-else class="py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Category Navigation -->
                <div class="flex flex-wrap justify-center gap-4 mb-16">
                    <button 
                        @click="activeCategory = 'all'"
                        :class="[
                            'px-6 py-3 rounded-full font-semibold transition-all duration-200',
                            activeCategory === 'all' 
                                ? 'bg-orange-600 text-white shadow-lg' 
                                : 'bg-white text-gray-700 hover:bg-orange-50 shadow-md'
                        ]"
                    >
                        All Items ({{ products.length }})
                    </button>
                    <button 
                        v-for="category in availableCategories" 
                        :key="category"
                        @click="activeCategory = category"
                        :class="[
                            'px-6 py-3 rounded-full font-semibold transition-all duration-200 capitalize',
                            activeCategory === category 
                                ? 'bg-orange-600 text-white shadow-lg' 
                                : 'bg-white text-gray-700 hover:bg-orange-50 shadow-md'
                        ]"
                    >
                        {{ category }} ({{ getProductCountByCategory(category) }})
                    </button>
                </div>

                <!-- No Products Message -->
                <div v-if="filteredProducts.length === 0" class="text-center py-20">
                    <div class="text-6xl mb-4">🍽️</div>
                    <h3 class="text-2xl font-semibold text-gray-900 mb-2">No items available</h3>
                    <p class="text-gray-600">{{ activeCategory === 'all' ? 'No products found' : `No ${activeCategory} items available` }}</p>
                </div>

                <!-- Menu Items Grid -->
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div 
                        v-for="product in filteredProducts" 
                        :key="product._id"
                        class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <!-- Product Image -->
                        <div class="relative h-48 bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden">
                            <img 
                                v-if="product.image" 
                                :src="product.image" 
                                :alt="product.name"
                                class="w-full h-full object-cover"
                                @error="handleImageError"
                            >
                            <div v-else class="absolute inset-0 flex items-center justify-center">
                                <span class="text-6xl">{{ getCategoryEmoji(product.category) }}</span>
                            </div>
                            
                            <!-- Stock indicator -->
                            <div v-if="product.stock === 0" class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Out of Stock
                            </div>
                            <div v-else-if="product.stock < 5" class="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Low Stock
                            </div>
                        </div>

                        <!-- Product Details -->
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-3">
                                <h3 class="text-xl font-bold text-gray-900">{{ product.name }}</h3>
                                <span class="text-xl font-bold text-orange-600">${{ product.price.toFixed(2) }}</span>
                            </div>
                            <p class="text-gray-600 mb-4 text-sm leading-relaxed">{{ product.description }}</p>
                            
                            <!-- Category Tag -->
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full capitalize">
                                    {{ product.category }}
                                </span>
                                <span v-if="product.stock > 0" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    In Stock ({{ product.stock }})
                                </span>
                            </div>

                            <!-- Add to Cart Button -->
                            <button 
                                :disabled="product.stock === 0"
                                :class="[
                                    'w-full py-3 rounded-lg font-semibold transition-colors duration-200',
                                    product.stock > 0 
                                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                ]"
                                @click="addToCart(product)"
                            >
                                {{ product.stock > 0 ? 'Add to Order' : 'Out of Stock' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { productAPI } from '../helpers/api.js'
import cartService from '../services/cartService.js'
import { notificationService } from '../services/notificationService.js'

export default {
    name: 'Menu',
    data() {
        return {
            products: [],
            loading: true,
            error: null,
            activeCategory: 'all'
        }
    },
    computed: {
        availableCategories() {
            const categories = [...new Set(this.products.map(product => product.category))]
            return categories.sort()
        },
        filteredProducts() {
            if (this.activeCategory === 'all') {
                return this.products
            }
            return this.products.filter(product => product.category === this.activeCategory)
        }
    },
    methods: {
        async fetchProducts() {
            this.loading = true
            this.error = null
            try {
                const data = await productAPI.getAllProducts()
                this.products = data || []
            } catch (error) {
                console.error('Error fetching products:', error)
                this.error = 'Failed to load menu items. Please check if the server is running.'
            } finally {
                this.loading = false
            }
        },
        getProductCountByCategory(category) {
            return this.products.filter(product => product.category === category).length
        },
        getCategoryEmoji(category) {
            const emojiMap = {
                'bread': '🍞',
                'cake': '🍰',
                'pastry': '🥐',
                'coffee': '☕',
                'tea': '🍵',
                'smoothie': '🥤',
                'beverage': '🥤',
                'drink': '🥤'
            }
            return emojiMap[category.toLowerCase()] || '🍽️'
        },
        handleImageError(event) {
            event.target.style.display = 'none'
        },
        async addToCart(product) {
            try {
                // Check if user is logged in
                const currentUser = this.getCurrentUser();
                if (!currentUser) {
                    notificationService.error('Please login to add items to cart');
                    return;
                }
                
                await cartService.addToCart(currentUser._id, product._id, 1, product.price);
                
                // Refresh cart count in navbar
                this.$parent?.$parent?.$refs?.navbar?.loadCartCount();
                
                this.$emit('add-to-cart', product);
                notificationService.success(`${product.name} added to cart!`);
            } catch (error) {
                console.error('Failed to add to cart:', error);
                notificationService.error('Failed to add item to cart');
            }
        },
        
        getCurrentUser() {
            // Try to get user from parent components or global state
            // This is a simple way to access the user - in a real app you'd use Vuex or Pinia
            return this.$parent?.$parent?.$refs?.navbar?.user || null;
        }
    },
    async mounted() {
        await this.fetchProducts()
    }
}
</script>

