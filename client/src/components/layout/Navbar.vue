<template>
    <nav class="bg-white shadow-sm border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
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
                        <router-link to="/" class="text-gray-900 hover:text-orange-500 font-medium transition-colors duration-200" :class="{'text-orange-600': $route.name === 'Home'}">Home</router-link>
                        <router-link to="/menu" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200" :class="{'text-orange-600': $route.name === 'Menu'}">Menu</router-link>
                        <a href="#" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200">Offers</a>
                        <a href="#" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200">Contact</a>
                    </div>
                </div>

                <!-- User Profile -->
                <div class="flex items-center space-x-3 flex-shrink-0">
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
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                <span class="text-white text-sm font-medium">{{ user.fullName.charAt(0).toUpperCase() }}</span>
                            </div>
                            <span class="text-gray-700 font-medium">{{ user.fullName }}</span>
                        </div>
                        <button 
                            @click="handleLogout"
                            class="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 pt-4 pb-3">
                <div class="flex flex-col space-y-3">
                    <router-link to="/" class="text-gray-900 hover:text-orange-500 font-medium transition-colors duration-200" :class="{'text-orange-600': $route.name === 'Home'}" @click="mobileMenuOpen = false">Home</router-link>
                    <router-link to="/menu" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200" :class="{'text-orange-600': $route.name === 'Menu'}" @click="mobileMenuOpen = false">Menu</router-link>
                    <a href="#" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200" @click="mobileMenuOpen = false">Offers</a>
                    <a href="#" class="text-gray-600 hover:text-orange-500 font-medium transition-colors duration-200" @click="mobileMenuOpen = false">Contact</a>
                    
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
                            <div class="flex items-center space-x-2">
                                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-sm font-medium">{{ user.fullName.charAt(0).toUpperCase() }}</span>
                                </div>
                                <span class="text-gray-700 font-medium">{{ user.fullName }}</span>
                            </div>
                            <button 
                                @click="handleLogout(); mobileMenuOpen = false"
                                class="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 text-left"
                            >
                                Logout
                            </button>
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

export default {
    name: 'Navbar',
    components: {
        LoginModal,
        SignUpModal
    },
    data() {
        return {
            mobileMenuOpen: false,
            showLoginModal: false,
            showSignUpModal: false,
            user: null
        }
    },
    async mounted() {
        // Check if user is already logged in
        await this.checkCurrentUser()
    },
    methods: {
        async checkCurrentUser() {
            try {
                const response = await userAPI.getCurrentUser()
                this.user = response
                // Show welcome back notification only if user was previously logged in
                if (response) {
                    notificationService.info('Welcome back!', `Hello ${response.fullName}`)
                }
            } catch (error) {
                // User not logged in, which is fine
                this.user = null
            }
        },
        handleLoginSuccess(userData) {
            this.user = userData
        },
        handleShowSignUp() {
            this.showLoginModal = false
            this.showSignUpModal = true
        },
        handleSignUpSuccess(userData) {
            this.user = userData
        },
        handleShowSignIn() {
            this.showSignUpModal = false
            this.showLoginModal = true
        },
        async handleLogout() {
            try {
                await userAPI.logoutUser()
                this.user = null
                notificationService.success('Logged out successfully!', 'See you again!')
            } catch (error) {
                // Handle logout error if needed
                this.user = null
                notificationService.error('Logout failed', 'An error occurred during logout')
            }
        }
    }
}
</script>