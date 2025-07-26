<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
          <!-- Backdrop -->
      <div 
        class="fixed inset-0 backdrop-blur-md transition-all duration-300"
        style="background-color: rgba(255, 255, 255, 0.4);"
        @click="closeModal"
      ></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-sm mx-4 transform transition-all duration-300 scale-100" style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);">
      <!-- Close button -->
      <button 
        @click="closeModal"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>

      <!-- Modal Content -->
      <div class="p-6">
        <!-- Header -->
        <div class="text-center mb-6">
          <div class="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
            <UserIcon class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
          <p class="text-sm text-gray-600">Sign in to your TOUS les JOURS account</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- General Error -->
          <div v-if="errors.general" class="bg-red-50 border border-red-200 rounded-lg p-2">
            <p class="text-red-600 text-xs">{{ errors.general }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon class="w-4 h-4 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                placeholder="Enter your email"
                :class="{ 'border-red-500': errors.email }"
              />
            </div>
            <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="w-4 h-4 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-9 pr-9 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                placeholder="Enter your password"
                :class="{ 'border-red-500': errors.password }"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="showPassword" class="w-4 h-4 text-gray-400" />
                <EyeSlashIcon v-else class="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                class="h-3 w-3 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label for="remember" class="ml-2 block text-xs text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="button"
              @click="showForgotPassword"
              class="text-xs text-orange-600 hover:text-orange-500 font-medium"
            >
              Forgot password?
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            @click="signInWithGoogle"
            class="w-full inline-flex justify-center py-2 px-3 border border-gray-300 rounded-lg shadow-sm bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="ml-1">Google</span>
          </button>
          <button
            type="button"
            @click="signInWithFacebook"
            class="w-full inline-flex justify-center py-2 px-3 border border-gray-300 rounded-lg shadow-sm bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg class="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="ml-1">Facebook</span>
          </button>
        </div>

        <!-- Sign Up Link -->
        <div class="mt-4 text-center">
          <p class="text-xs text-gray-600">
            Don't have an account?
            <button
              type="button"
              @click="showSignUp"
              class="text-orange-600 hover:text-orange-500 font-medium"
            >
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userAPI } from '@/helpers/api'
import { notificationService } from '@/services/notificationService'
import { 
    XMarkIcon, 
    UserIcon, 
    EnvelopeIcon, 
    LockClosedIcon, 
    EyeIcon, 
    EyeSlashIcon 
} from '@heroicons/vue/24/outline'

export default {
  name: 'LoginModal',
  components: {
    XMarkIcon,
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        remember: false
      },
      errors: {},
      loading: false,
      showPassword: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.resetForm()
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    resetForm() {
      this.form = {
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        remember: false
      }
      this.errors = {}
      this.loading = false
      this.showPassword = false
    },
    validateForm() {
      this.errors = {}
      
      if (!this.form.email) {
        this.errors.email = 'Email is required'
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
      }
      
      if (!this.form.password) {
        this.errors.password = 'Password is required'
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
      }
      
      return Object.keys(this.errors).length === 0
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    async handleSubmit() {
      if (!this.validateForm()) return
      
      this.loading = true
      this.errors.general = null
      
      try {
        // API call to login
        const response = await userAPI.loginUser(this.form)
        
        // Show success notification
        notificationService.success('Login successful!', `Welcome back, ${response.user.fullName}`)
        
        // Emit user data to parent component
        this.$emit('user-logged-in', response.user)
        this.closeModal()
      } catch (error) {
        // Show error notification
        const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
        
        if (error.response?.status === 401) {
          this.errors.general = 'Invalid email or password.'
          notificationService.error('Login failed', 'Invalid email or password.')
        } else {
          this.errors.general = errorMessage
          notificationService.error('Login failed', errorMessage)
        }
      } finally {
        this.loading = false
      }
    },
    signInWithGoogle() {
      // Implement Google OAuth
    },
    signInWithFacebook() {
      // Implement Facebook OAuth
    },
    showForgotPassword() {
      // Implement forgot password functionality
    },
    showSignUp() {
      this.$emit('show-signup')
    }
  },
  mounted() {
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeModal()
      }
    })
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-enter-active {
  animation: fadeIn 0.3s ease-out;
}
</style> 