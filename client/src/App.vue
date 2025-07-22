<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar @open-cart="showCartModal = true" @user-changed="currentUser = $event" ref="navbar" />
    <router-view @cart-updated="handleCartUpdate" :user="currentUser" />
    <Footer />
    <NotificationManager ref="notificationManager" />
    <CartModal 
      :isOpen="showCartModal" 
      @close="showCartModal = false" 
      :user="currentUser" 
    />
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import NotificationManager from './components/common/NotificationManager.vue'
import CartModal from './components/common/CartModal.vue'
import { notificationService } from './services/notificationService'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    NotificationManager,
    CartModal
  },
  data() {
    return {
      showCartModal: false,
      currentUser: null
    }
  },
  methods: {
    handleCartUpdate() {
      // Update cart count in navbar
      if (this.$refs.navbar) {
        this.$refs.navbar.updateCartCount()
      }
    }
  },
  mounted() {
    // Register the notification manager with the service
    notificationService.registerManager(this.$refs.notificationManager)
  }
}
</script>
