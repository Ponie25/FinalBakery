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
                    <button class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                    @click="showLoginModal = true">
                        Login/Register
                    </button>
                    <!-- If logged in -->
                    <div class="flex items-center space-x-3">
                        <span class="text-gray-600">Welcome, User</span>
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
                </div>
            </div>

            <!-- Login Modal -->    
            <LoginModal 
                :isOpen="showLoginModal" 
                @close="showLoginModal = false"
                @login-success="handleLoginSuccess"
                @show-signup="handleShowSignUp"
            />
            
            <!-- Sign Up Modal -->
            <SignUpModal 
                :isOpen="showSignUpModal" 
                @close="showSignUpModal = false"
                @signup-success="handleSignUpSuccess"
                @show-signin="handleShowSignIn"
            />
        </div>
    </nav>
</template>

<script>
import LoginModal from '@/components/common/LoginModal.vue'
import SignUpModal from '@/components/common/SignUpModal.vue'

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
    methods: {
        handleLoginSuccess(userData) {
            this.user = userData
            console.log('User logged in:', userData)
            // Handle successful login (e.g., store user data, redirect, etc.)
        },
        handleShowSignUp() {
            this.showLoginModal = false
            this.showSignUpModal = true
        },
        handleSignUpSuccess(userData) {
            this.user = userData
            console.log('User signed up:', userData)
            // Handle successful signup (e.g., store user data, redirect, etc.)
        },
        handleShowSignIn() {
            this.showSignUpModal = false
            this.showLoginModal = true
        }
    }
}
</script>