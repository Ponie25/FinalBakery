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
            <UserPlusIcon class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-1">Join TOUS les JOURS</h2>
          <p class="text-sm text-gray-600">Create your account and start your pastry journey</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- General Error -->
          <div v-if="errors.general" class="bg-red-50 border border-red-200 rounded-lg p-2">
            <p class="text-red-600 text-xs">{{ errors.general }}</p>
          </div>

          <!-- Name -->
          <div>
            <label for="name" class="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="w-4 h-4 text-gray-400" />
              </div>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                required
                class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                placeholder="Enter your full name"
                :class="{ 'border-red-500': errors.fullName }"
              />
            </div>
            <p v-if="errors.fullName" class="text-red-500 text-xs mt-1">{{ errors.fullName }}</p>
          </div>

          <!-- Username -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your username"
                :class="{ 'border-red-500': errors.username }"
              />
            </div>
            <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                :class="{ 'border-red-500': errors.email }"
              />
            </div>
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Create a password"
                :class="{ 'border-red-500': errors.password }"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="showPassword" class="w-5 h-5 text-gray-400" />
                <EyeSlashIcon v-else class="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CheckCircleIcon class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Confirm your password"
                :class="{ 'border-red-500': errors.confirmPassword }"
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="showConfirmPassword" class="w-5 h-5 text-gray-400" />
                <EyeSlashIcon v-else class="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Phone Number -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="phone"
                v-model="form.phoneNumber"
                type="tel"
                class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your phone number"
                :class="{ 'border-red-500': errors.phoneNumber }"
              />
            </div>
            <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">{{ errors.phoneNumber }}</p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="form.terms"
                type="checkbox"
                class="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="text-gray-700">
                I agree to the 
                <a href="#" class="text-orange-600 hover:text-orange-500 font-medium">Terms of Service</a>
                and 
                <a href="#" class="text-orange-600 hover:text-orange-500 font-medium">Privacy Policy</a>
              </label>
            </div>
          </div>
          <p v-if="errors.terms" class="text-red-500 text-sm mt-1">{{ errors.terms }}</p>

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
              Creating Account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            @click="signUpWithGoogle"
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
            @click="signUpWithFacebook"
            class="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg class="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span class="ml-1">Facebook</span>
          </button>
        </div>

        <!-- Sign In Link -->
        <div class="mt-4 text-center">
          <p class="text-xs text-gray-600">
            Already have an account?
            <button
              type="button"
              @click="showSignIn"
              class="text-orange-600 hover:text-orange-500 font-medium"
            >
              Sign in here
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
    UserPlusIcon, 
    UserIcon, 
    EnvelopeIcon, 
    LockClosedIcon, 
    EyeIcon, 
    EyeSlashIcon, 
    CheckCircleIcon, 
    PhoneIcon 
} from '@heroicons/vue/24/outline'

export default {
  name: 'SignUpModal',
  components: {
    XMarkIcon,
    UserPlusIcon,
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckCircleIcon,
    PhoneIcon
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
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      },
      errors: {},
      loading: false,
      showPassword: false,
      showConfirmPassword: false
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
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    resetForm() {
      this.form = {
        fullName: '',
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      }
      this.errors = {}
      this.loading = false
      this.showPassword = false
      this.showConfirmPassword = false
    },
    validateForm() {
      this.errors = {}
      
      if (!this.form.fullName) {
        this.errors.fullName = 'Full name is required'
      } else if (this.form.fullName.length < 2) {
        this.errors.fullName = 'Name must be at least 2 characters'
      }
      
      if (!this.form.username) {
        this.errors.username = 'Username is required'
      } else if (this.form.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters'
      } else if (this.form.username.length > 20) {
        this.errors.username = 'Username must be less than 20 characters'
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.form.username)) {
        this.errors.username = 'Username can only contain letters, numbers, and underscores'
      }
      
      if (!this.form.email) {
        this.errors.email = 'Email is required'
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
      }
      
      if (!this.form.password) {
        this.errors.password = 'Password is required'
      } else if (this.form.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters'
      } else if (!this.isStrongPassword(this.form.password)) {
        this.errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      }
      
      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = 'Please confirm your password'
      } else if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match'
      }
      
      if (this.form.phoneNumber && !this.isValidPhone(this.form.phoneNumber)) {
        this.errors.phoneNumber = 'Please enter a valid phone number'
      }
      
      if (!this.form.terms) {
        this.errors.terms = 'You must agree to the terms and conditions'
      }
      
      return Object.keys(this.errors).length === 0
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    isStrongPassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
      return passwordRegex.test(password)
    },
    isValidPhone(phone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      return phoneRegex.test(phone.replace(/\s/g, ''))
    },
    async handleSubmit() {
      if (!this.validateForm()) return
      
      this.loading = true
      this.errors.general = null
      
      try {
        // Prepare data for API call - only send fields the backend expects
        const userData = {
          fullName: this.form.fullName,
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          phoneNumber: this.form.phoneNumber || undefined
        }
        
        // API call to register
        const response = await userAPI.registerUser(userData)
        
        // Show success notification
        notificationService.success('Registration successful!', `Welcome to TOUS les JOURS, ${response.user.fullName}!`)
        
        // Emit user data to parent component
        this.$emit('user-registered', response.user)
        this.closeModal()
      } catch (error) {
        // Show error notification
        const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.'
        
        if (error.response?.status === 400) {
          if (errorMessage.includes('already exists')) {
            this.errors.general = 'Email or username already exists.'
            notificationService.error('Registration failed', 'Email or username already exists.')
          } else {
            this.errors.general = errorMessage
            notificationService.error('Registration failed', errorMessage)
          }
        } else {
          this.errors.general = errorMessage
          notificationService.error('Registration failed', errorMessage)
        }
      } finally {
        this.loading = false
      }
    },
    signUpWithGoogle() {
      // Implement Google OAuth
    },
    signUpWithFacebook() {
      // Implement Facebook OAuth
    },
    showSignIn() {
      this.$emit('show-signin')
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