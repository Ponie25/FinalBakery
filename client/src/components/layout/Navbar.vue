<template>
    <nav class="bg-white shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 space-x-4">
                <!-- Logo -->
                <div class="flex items-center space-x-2 flex-shrink-0">
                    <img 
                        src="https://cdn.prod.website-files.com/649249d29a20bd6bc3deac45/649249d29a20bd6bc3dead00_TLJ-Logo%201.png" 
                        alt="TOUS les JOURS" 
                        class="h-5 w-auto"
                    >
                </div>

                <!-- Navigation Menu -->
                <div class="hidden md:flex items-center justify-center flex-1">
                    <div class="flex items-center space-x-8">
                        <router-link to="/" class="text-gray-900 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center" :class="{'text-orange-600': $route.name === 'Home'}">
                            <HomeIcon class="w-4 h-4 mr-1" />
                            Home
                        </router-link>
                        <router-link to="/menu" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center" :class="{'text-orange-600': $route.name === 'Menu'}">
                            <Bars3Icon class="w-4 h-4 mr-1" />
                            Menu
                        </router-link>
                        <router-link to="/offers" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center" :class="{'text-orange-600': $route.name === 'Offers'}">
                            <GiftIcon class="w-4 h-4 mr-1" />
                            Offers
                        </router-link>
                        <router-link to="/contact" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center" :class="{'text-orange-600': $route.name === 'Contact'}">
                            <EnvelopeIcon class="w-4 h-4 mr-1" />
                            Contact
                        </router-link>
                    </div>
                </div>

                <!-- User Profile -->
                <div class="flex items-center space-x-6 flex-shrink-0">
                    <!-- Cart Button - Only show for logged-in users -->
                    <button 
                        v-if="user"
                        @click="$emit('open-cart')"
                        class="relative p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                    >
                        <ShoppingBagIcon class="w-5 h-5" />
                        <!-- Cart item count badge -->
                        <span v-if="cartItemCount > 0" class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">{{ cartItemCount }}</span>
                    </button>
                    
                    <!-- If not logged in -->
                    <div v-if="!user" class="flex items-center space-x-2">
                        <button 
                            @click="showLoginModal = true"
                            class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200"
                        >
                            Login
                        </button>
                        <span class="text-gray-300">|</span>
                        <button 
                            @click="showSignUpModal = true"
                            class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                        >
                            Sign Up
                        </button>
                    </div>
                    
                    <!-- If logged in -->
                    <div v-else class="flex items-center space-x-3">
                        <!-- User Avatar Dropdown -->
                        <div class="relative">
                            <button 
                                @click.stop="toggleUserDropdown"
                                class="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors duration-200 focus:outline-none"
                            >
                                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-sm font-medium">{{ user.fullName.charAt(0).toUpperCase() }}</span>
                                </div>
                                <span class="font-medium">{{ user.fullName }}</span>
                                <ChevronDownIcon class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showUserDropdown }" />
                            </button>
                            
                            <!-- Dropdown Menu -->
                            <div v-if="showUserDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50" @click.stop>
                                <!-- Orders -->
                                <button 
                                    @click="openOrderHistory"
                                    class="w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center"
                                >
                                    <ClipboardDocumentListIcon class="w-4 h-4 mr-3" />
                                    Orders
                                </button>
                                
                                <!-- Admin (only for admin users) -->
                                <router-link 
                                    v-if="user.role === 'admin'"
                                    to="/admin" 
                                    @click="closeUserDropdown"
                                    class="block w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center"
                                >
                                    <ChartBarIcon class="w-4 h-4 mr-3" />
                                    Admin Dashboard
                                </router-link>
                                
                                <!-- Divider -->
                                <div class="border-t border-gray-100 my-1"></div>
                                
                                <!-- Logout -->
                                <button 
                                    @click="handleLogout"
                                    class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center"
                                >
                                    <ArrowRightOnRectangleIcon class="w-4 h-4 mr-3" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                        <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
                        <XMarkIcon v-else class="w-6 h-6" />
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 pt-4 pb-3">
                <div class="flex flex-col space-y-3">
                    <router-link to="/" class="text-gray-900 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center" :class="{'text-orange-600': $route.name === 'Home'}" @click="mobileMenuOpen = false">
                        <HomeIcon class="w-4 h-4 mr-2" />
                        Home
                    </router-link>
                    <router-link to="/menu" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center" :class="{'text-orange-600': $route.name === 'Menu'}" @click="mobileMenuOpen = false">
                        <Bars3Icon class="w-4 h-4 mr-2" />
                        Menu
                    </router-link>
                    <router-link to="/offers" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center" :class="{'text-orange-600': $route.name === 'Offers'}" @click="mobileMenuOpen = false">
                        <GiftIcon class="w-4 h-4 mr-2" />
                        Offers
                    </router-link>
                    <router-link to="/contact" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200 flex items-center" :class="{'text-orange-600': $route.name === 'Contact'}" @click="mobileMenuOpen = false">
                        <EnvelopeIcon class="w-4 h-4 mr-2" />
                        Contact
                    </router-link>
                    
                    <!-- Mobile User Section -->
                    <div class="border-t border-gray-200 pt-3 mt-3">
                        <div v-if="!user" class="flex flex-col space-y-2">
                            <button 
                                @click="showLoginModal = true; mobileMenuOpen = false"
                                class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200 text-left"
                            >
                                Login
                            </button>
                            <button 
                                @click="showSignUpModal = true; mobileMenuOpen = false"
                                class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 text-left"
                            >
                                Sign Up
                            </button>
                        </div>
                        
                        <div v-else class="flex flex-col space-y-2">
                            <!-- Mobile User Dropdown -->
                            <div class="border-t border-gray-200 pt-3">
                                <div class="flex items-center space-x-2 mb-3">
                                    <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                        <span class="text-white text-sm font-medium">{{ user.fullName.charAt(0).toUpperCase() }}</span>
                                    </div>
                                    <span class="text-gray-700 font-medium">{{ user.fullName }}</span>
                                </div>
                                
                                <!-- Orders -->
                                <button 
                                    @click="$router.push('/orders'); mobileMenuOpen = false"
                                    class="w-full text-left px-3 py-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-200 flex items-center"
                                >
                                    <ClipboardDocumentListIcon class="w-4 h-4 mr-3" />
                                    Orders
                                </button>
                                
                                <!-- Admin (only for admin users) -->
                                <router-link 
                                    v-if="user.role === 'admin'"
                                    to="/admin" 
                                    @click="mobileMenuOpen = false"
                                    class="block w-full text-left px-3 py-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors duration-200 flex items-center"
                                >
                                    <ChartBarIcon class="w-4 h-4 mr-3" />
                                    Admin Dashboard
                                </router-link>
                                
                                <!-- Logout -->
                                <button 
                                    @click="handleLogout(); mobileMenuOpen = false"
                                    class="w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center"
                                >
                                    <ArrowRightOnRectangleIcon class="w-4 h-4 mr-3" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Login Modal -->    
            <LoginModal 
                :isOpen="showLoginModal" 
                @close="showLoginModal = false"
                @user-logged-in="handleLoginSuccess"
                @show-signup="handleShowSignUp"
            />
            
            <!-- Sign Up Modal -->
            <SignUpModal 
                :isOpen="showSignUpModal" 
                @close="showSignUpModal = false"
                @user-registered="handleSignUpSuccess"
                @show-signin="handleShowSignIn"
            />
        </div>
    </nav>
</template>

<script>
import LoginModal from '@/components/common/LoginModal.vue'
import SignUpModal from '@/components/common/SignUpModal.vue'
import { userAPI } from '@/helpers/api'
import { notificationService } from '@/services/notificationService'
import cartService from '@/services/cartService'
import { 
    HomeIcon, 
    Bars3Icon, 
    GiftIcon, 
    EnvelopeIcon, 
    ShoppingBagIcon, 
    ChevronDownIcon, 
    ClipboardDocumentListIcon, 
    ChartBarIcon, 
    ArrowRightOnRectangleIcon, 
    XMarkIcon 
} from '@heroicons/vue/24/outline'

export default {
    name: 'Navbar',
    components: {
        LoginModal,
        SignUpModal,
        HomeIcon,
        Bars3Icon,
        GiftIcon,
        EnvelopeIcon,
        ShoppingBagIcon,
        ChevronDownIcon,
        ClipboardDocumentListIcon,
        ChartBarIcon,
        ArrowRightOnRectangleIcon,
        XMarkIcon
    },
    data() {
        return {
            mobileMenuOpen: false,
            showLoginModal: false,
            showSignUpModal: false,
            showUserDropdown: false,
            user: null,
            cartItemCount: 0
        }
    },
    async mounted() {
        // Check if user is already logged in
        await this.checkCurrentUser()
        
        // Add click outside listener for dropdown
        document.addEventListener('click', this.handleClickOutside)
    },
    
    beforeUnmount() {
        // Remove click outside listener
        document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
        async checkCurrentUser() {
            try {
                // Check if JWT token exists
                const token = localStorage.getItem('token');
                if (!token) {
                    this.user = null;
                    this.cartItemCount = 0;
                    this.$emit('user-changed', null);
                    return;
                }
                
                const response = await userAPI.getCurrentUser()
                this.user = response
                this.$emit('user-changed', response)
                // Load cart count if user is logged in
                if (response) {
                    await this.loadCartCount()
                    notificationService.info('Welcome back!', `Hello ${response.fullName}`)
                }
            } catch (error) {
                // User not logged in or token invalid, clear token
                localStorage.removeItem('token');
                this.user = null
                this.cartItemCount = 0
                this.$emit('user-changed', null)
            }
        },
        handleLoginSuccess(userData) {
            this.user = userData
            this.$emit('user-changed', userData)
            this.loadCartCount()
        },
        handleShowSignUp() {
            this.showLoginModal = false
            this.showSignUpModal = true
        },
        handleSignUpSuccess(userData) {
            this.user = userData
            this.$emit('user-changed', userData)
            this.loadCartCount()
        },
        handleShowSignIn() {
            this.showSignUpModal = false
            this.showLoginModal = true
        },
        async handleLogout() {
            try {
                await userAPI.logoutUser()
                this.user = null
                this.cartItemCount = 0
                this.$emit('user-changed', null)
                notificationService.success('Logged out successfully!', 'See you again!')
            } catch (error) {
                // Handle logout error if needed
                localStorage.removeItem('token'); // Ensure token is removed
                this.user = null
                this.cartItemCount = 0
                this.$emit('user-changed', null)
                notificationService.error('Logout failed', 'An error occurred during logout')
            }
        },

        async loadCartCount() {
            try {
                if (!this.user) {
                    this.cartItemCount = 0
                    return
                }
                
                const cart = await cartService.getCart()
                if (cart && cart.items) {
                    // Calculate total quantity of all items
                    this.cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0)
                } else {
                    this.cartItemCount = 0
                }
            } catch (error) {
                console.error('Failed to load cart count:', error)
                this.cartItemCount = 0
            }
        },

        // Alias for loadCartCount - called from other components when cart is updated
        async updateCartCount() {
            await this.loadCartCount()
        },
        
        // Dropdown methods
        toggleUserDropdown() {
            this.showUserDropdown = !this.showUserDropdown
        },
        
        closeUserDropdown() {
            this.showUserDropdown = false
        },
        
        openOrderHistory() {
            this.closeUserDropdown()
            this.$router.push('/orders')
        },
        
        handleClickOutside(event) {
            // Close dropdown if clicking outside
            if (this.showUserDropdown && !event.target.closest('.relative')) {
                this.closeUserDropdown()
            }
        }
    }
}
</script>