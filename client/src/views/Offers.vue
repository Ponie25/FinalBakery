<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-orange-50 to-yellow-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Special Offers</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our amazing combo packs, seasonal promotions, and exclusive deals. 
            Save more while enjoying the finest French Asian bakery experience!
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Promotion Banner -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-2xl overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Left side - Content -->
            <div class="p-8 lg:p-12">
              <div class="text-white">
                <span class="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  🎉 LIMITED TIME OFFER
                </span>
                <h2 class="text-3xl lg:text-4xl font-bold mb-4">
                  Grand Opening Special
                </h2>
                <p class="text-orange-100 text-lg mb-6 leading-relaxed">
                  Celebrate with us! Get 30% off on all combo packs and free delivery on orders over $50. 
                  Valid until the end of this month.
                </p>
                                 <div class="flex items-center space-x-4">
                   <button 
                     @click="shopNow"
                     class="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                   >
                     Shop Now
                   </button>
                   <span class="text-orange-100 text-sm">
                     Ends in: <span class="font-bold text-white">15 days</span>
                   </span>
                 </div>
              </div>
            </div>
            
            <!-- Right side - Visual -->
            <div class="p-8 lg:p-12">
              <div class="relative">
                <div class="w-80 h-80 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                  <div class="text-center">
                    <div class="text-8xl mb-4">🎁</div>
                    <p class="text-white font-bold text-2xl">30% OFF</p>
                    <p class="text-orange-100">All Combo Packs</p>
                  </div>
                </div>
                <!-- Floating elements -->
                <div class="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span class="text-2xl">🥐</span>
                </div>
                <div class="absolute bottom-8 left-4 w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center">
                  <span class="text-3xl">🍰</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Combo Packs Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Combo Packs</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Perfect combinations of our bestsellers at unbeatable prices. Great for families, offices, or special occasions.
          </p>
        </div>

                 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <!-- Dynamic Combo Packs -->
           <div 
             v-for="combo in comboPacks" 
             :key="combo.id"
             class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
           >
             <div class="relative h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
               <div class="text-6xl">{{ combo.emoji }}</div>
               <div class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                 Save {{ formatPrice(combo.savings) }}
               </div>
             </div>
             <div class="p-6">
               <h3 class="text-xl font-bold text-gray-900 mb-2">{{ combo.name }}</h3>
               <p class="text-gray-600 mb-4">
                 {{ combo.description }}
               </p>
               <div class="flex items-center justify-between mb-4">
                 <div>
                   <span class="text-2xl font-bold text-orange-600">{{ formatPrice(combo.price) }}</span>
                   <span class="text-sm text-gray-500 line-through ml-2">{{ formatPrice(combo.originalPrice) }}</span>
                 </div>
                 <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                   {{ combo.badge }}
                 </span>
               </div>
               <button 
                 @click="addToCart(combo)"
                 :disabled="loading"
                 class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <span v-if="loading">Adding...</span>
                 <span v-else>Add to Cart</span>
               </button>
             </div>
           </div>
         </div>
      </div>
    </section>

    <!-- Seasonal Promotions -->
    <section class="py-16 bg-gradient-to-b from-amber-50 to-orange-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Seasonal Promotions</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on our limited-time seasonal offers and holiday specials!
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Holiday Special -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="p-8">
              <div class="flex items-center mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-red-100 to-green-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-3xl">🎄</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">Holiday Special</h3>
                  <p class="text-gray-600">Valid until December 31st</p>
                </div>
              </div>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <span class="text-gray-700">🎂 Holiday Cakes</span>
                  <span class="font-semibold text-red-600">20% OFF</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span class="text-gray-700">🍪 Cookie Gift Boxes</span>
                  <span class="font-semibold text-green-600">Buy 2 Get 1 FREE</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                  <span class="text-gray-700">🥧 Seasonal Pies</span>
                  <span class="font-semibold text-amber-600">15% OFF</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Student Discount -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="p-8">
              <div class="flex items-center mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-3xl">🎓</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">Student Discount</h3>
                  <p class="text-gray-600">Show your student ID</p>
                </div>
              </div>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span class="text-gray-700">☕ Coffee & Pastry</span>
                  <span class="font-semibold text-blue-600">15% OFF</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <span class="text-gray-700">🥪 Lunch Combos</span>
                  <span class="font-semibold text-purple-600">10% OFF</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                  <span class="text-gray-700">📚 Study Group Orders</span>
                  <span class="font-semibold text-indigo-600">Extra 5% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loyalty Program -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden">
          <div class="p-8 lg:p-12 text-center">
            <div class="text-white">
              <div class="text-6xl mb-6">⭐</div>
              <h2 class="text-3xl lg:text-4xl font-bold mb-4">Join Our Loyalty Program</h2>
              <p class="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                Earn points with every purchase and unlock exclusive rewards, birthday treats, and member-only promotions!
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white bg-opacity-20 rounded-xl p-6">
                  <div class="text-3xl mb-2">🎯</div>
                  <h3 class="font-semibold mb-2">Earn Points</h3>
                  <p class="text-purple-100 text-sm">Get 1 point for every $1 spent</p>
                </div>
                <div class="bg-white bg-opacity-20 rounded-xl p-6">
                  <div class="text-3xl mb-2">🎁</div>
                  <h3 class="font-semibold mb-2">Redeem Rewards</h3>
                  <p class="text-purple-100 text-sm">100 points = $10 reward</p>
                </div>
                <div class="bg-white bg-opacity-20 rounded-xl p-6">
                  <div class="text-3xl mb-2">🎂</div>
                  <h3 class="font-semibold mb-2">Birthday Treats</h3>
                  <p class="text-purple-100 text-sm">Free cake slice on your birthday</p>
                </div>
              </div>
              
                             <button 
                 @click="joinLoyaltyProgram"
                 class="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg"
               >
                 Sign Up Now - It's Free!
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Terms and Conditions -->
    <section class="py-12 bg-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Terms & Conditions</h2>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="text-sm text-gray-600 space-y-3">
            <p>• All offers are valid for a limited time and subject to availability.</p>
            <p>• Combo pack prices are final and cannot be combined with other offers unless specified.</p>
            <p>• Student discount requires valid student ID. Cannot be combined with other promotions.</p>
            <p>• Loyalty program points expire 12 months after earning date.</p>
            <p>• Holiday specials are valid while supplies last. Some restrictions may apply.</p>
            <p>• Prices subject to change without notice. See store for complete terms and conditions.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import cartService from '../services/cartService.js'
import { notificationService } from '../services/notificationService.js'

export default {
  name: 'Offers',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      comboPacks: [
        {
          id: 'breakfast-combo',
          name: 'Breakfast Combo',
          description: '2 Fresh Croissants + 2 Premium Coffee + 1 Seasonal Fruit Tart',
          price: 18.99,
          originalPrice: 26.99,
          savings: 8.00,
          badge: 'Best Seller',
          emoji: '🥐☕',
          category: 'combo'
        },
        {
          id: 'family-pack',
          name: 'Family Celebration Pack',
          description: '1 Medium Cake + 6 Cupcakes + 4 Pastries + 2 Beverages',
          price: 45.99,
          originalPrice: 60.99,
          savings: 15.00,
          badge: 'Family Size',
          emoji: '🍰🧁',
          category: 'combo'
        },
        {
          id: 'office-pack',
          name: 'Office Sharing Pack',
          description: '12 Assorted Pastries + 6 Sandwiches + 8 Beverages',
          price: 65.99,
          originalPrice: 77.99,
          savings: 12.00,
          badge: '12+ Servings',
          emoji: '🥖🍞',
          category: 'combo'
        }
      ]
    }
  },
  methods: {
    async addToCart(comboPack) {
      // Check if user is logged in
      const user = this.getCurrentUser()
      if (!user) {
        notificationService.error('Please log in', 'You need to be logged in to add items to cart')
        return
      }

      this.loading = true
      try {
        const result = await cartService.addToCart(user._id, comboPack.id, 1, comboPack.price)
        notificationService.success('Added to cart!', `${comboPack.name} has been added to your cart`)
        
        // Emit event to update cart count in navbar
        this.$emit('cart-updated')
      } catch (error) {
        console.error('Error adding to cart:', error)
        notificationService.error('Failed to add to cart', error.message || 'Please try again later')
      } finally {
        this.loading = false
      }
    },

    shopNow() {
      // Redirect to menu page
      this.$router.push('/menu')
    },

    joinLoyaltyProgram() {
      // Check if user is logged in
      const user = this.getCurrentUser()
      if (!user) {
        notificationService.error('Please log in', 'You need to be logged in to join the loyalty program')
        return
      }

      // Simulate joining loyalty program
      notificationService.success('Welcome to our Loyalty Program!', 'You\'re now earning points with every purchase')
    },

    getCurrentUser() {
      // Try multiple ways to get the current user
      return this.user || 
             this.$parent?.$parent?.$refs?.navbar?.user || 
             JSON.parse(localStorage.getItem('user'))
    },

    formatPrice(price) {
      return `$${price.toFixed(2)}`
    }
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style> 