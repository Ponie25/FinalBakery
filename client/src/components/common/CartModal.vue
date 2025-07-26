<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 backdrop-blur-md transition-all duration-300"
      style="background-color: rgba(255, 255, 255, 0.4);"
      @click="closeCart"
    ></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-lg mx-4 max-h-[80vh] flex flex-col transform transition-all duration-300 scale-100" style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);">
      <!-- Close button -->
      <button 
        @click="closeCart"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>

      <!-- Header -->
      <div class="text-center p-6 pb-4">
        <div class="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
          <ShoppingBagIcon class="w-6 h-6 text-white" />
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-1">Your Cart</h2>
        <p class="text-sm text-gray-600">Review your selected items</p>
      </div>

      <!-- Cart Content - Scrollable -->
      <div class="flex-1 overflow-y-auto px-6">
        <div v-if="!user" class="text-center py-12">
          <UserIcon class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500 text-lg">Please login to view your cart</p>
          <p class="text-gray-400 text-sm mt-1">Sign in to add items and manage your orders</p>
          <button @click="closeCart" class="mt-4 text-orange-500 hover:text-orange-600 font-medium">
            Close and Login
          </button>
        </div>
        
        <div v-else-if="cartItems.length === 0" class="text-center py-12">
          <ShoppingBagIcon class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500 text-lg">Your cart is empty</p>
          <p class="text-gray-400 text-sm mt-1">Add some delicious items from our menu!</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="item in cartItems" :key="item.product_id" class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <!-- Product Image -->
            <div class="flex-shrink-0">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg">
              <div v-else class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <PhotoIcon class="w-8 h-8 text-gray-400" />
              </div>
            </div>
            
            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 truncate">{{ item.name || 'Unknown Product' }}</h3>
              <p class="text-sm text-gray-600 mt-1">${{ item.price.toFixed(2) }} each</p>
              <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ item.description }}</p>
            </div>
            
            <!-- Quantity Controls -->
            <div class="flex-shrink-0 flex items-center">
              <button @click="decreaseQuantity(item)" class="bg-white hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 transition-colors shadow-sm border">
                <MinusIcon class="w-3 h-3" />
              </button>
              <span class="w-8 text-center text-sm font-semibold">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="bg-white hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 transition-colors shadow-sm border">
                <PlusIcon class="w-3 h-3" />
              </button>
              <button @click="removeItem(item)" class="text-red-400 hover:text-red-600 ml-2 transition-colors p-1">
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Footer - Fixed at bottom -->
      <div v-if="user && cartItems.length > 0" class="p-6 pt-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-bold text-gray-900">Total: ${{ totalPrice.toFixed(2) }}</span>
        </div>
        
        <div class="space-y-3">
          <button @click="checkout" class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-semibold text-lg shadow-lg">
            Checkout
          </button>
          <button @click="clearAllItems" class="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartService from '../../services/cartService.js';
import { notificationService } from '../../services/notificationService.js';
import { 
    XMarkIcon, 
    ShoppingBagIcon, 
    UserIcon, 
    PhotoIcon, 
    MinusIcon, 
    PlusIcon, 
    TrashIcon 
} from '@heroicons/vue/24/outline'

export default {
  name: 'CartModal',
  components: {
    XMarkIcon,
    ShoppingBagIcon,
    UserIcon,
    PhotoIcon,
    MinusIcon,
    PlusIcon,
    TrashIcon
  },
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
      cartItems: [],
      totalPrice: 0
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.loadCart();
      }
    }
  },
  methods: {
    closeCart() {
      this.$emit('close');
    },
    
    async loadCart() {
      try {
        if (!this.user) {
          this.cartItems = [];
          this.totalPrice = 0;
          return;
        }
        
        const cart = await cartService.getCart();
        
        if (cart && cart.items) {
          // Populate cart items with product details
          this.cartItems = await Promise.all(cart.items.map(async (item) => {
            try {
              const product = await this.getProductById(item.product_id);
              return {
                ...item,
                name: product.name,
                image: product.image,
                description: product.description
              };
            } catch (error) {
              console.error('Failed to load product details:', error);
              return {
                ...item,
                name: 'Unknown Product',
                image: '',
                description: ''
              };
            }
          }));
          this.totalPrice = cart.total_price || 0;
        } else {
          this.cartItems = [];
          this.totalPrice = 0;
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
        this.cartItems = [];
        this.totalPrice = 0;
      }
    },

    async getProductById(productId) {
      try {
        const response = await cartService.getProductById(productId);
        return response;
      } catch (error) {
        throw error;
      }
    },
    
    async increaseQuantity(item) {
      try {
        if (!this.user) return;
        
        const newQuantity = item.quantity + 1;
        await cartService.updateQuantity(item.product_id, newQuantity);
        await this.loadCart();
        this.updateCartCount();
        notificationService.success('Quantity updated');
      } catch (error) {
        notificationService.error('Failed to update quantity');
      }
    },
    
    async decreaseQuantity(item) {
      if (item.quantity <= 1) {
        await this.removeItem(item);
        return;
      }
      
      try {
        if (!this.user) return;
        
        const newQuantity = item.quantity - 1;
        await cartService.updateQuantity(item.product_id, newQuantity);
        await this.loadCart();
        this.updateCartCount();
        notificationService.success('Quantity updated');
      } catch (error) {
        notificationService.error('Failed to update quantity');
      }
    },
    
    async removeItem(item) {
      try {
        if (!this.user) return;
        
        await cartService.removeFromCart(item.product_id);
        await this.loadCart();
        this.updateCartCount();
        notificationService.success('Item removed from cart');
      } catch (error) {
        notificationService.error('Failed to remove item');
      }
    },
    
    async clearAllItems() {
      try {
        if (!this.user) return;
        
        await cartService.clearCart();
        await this.loadCart();
        this.updateCartCount();
        notificationService.success('Cart cleared');
      } catch (error) {
        notificationService.error('Failed to clear cart');
      }
    },

    updateCartCount() {
      // Update cart count in navbar
      this.$parent?.$refs?.navbar?.loadCartCount();
    },
    
    checkout() {
      this.closeCart();
      this.$router.push('/checkout');
    }
  }
};
</script> 