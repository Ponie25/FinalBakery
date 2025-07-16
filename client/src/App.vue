<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <router-view />
    <Footer />
    <NotificationManager ref="notificationManager" />
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import NotificationManager from './components/common/NotificationManager.vue'
import { notificationService } from './services/notificationService'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    NotificationManager
  },
  mounted() {
    // Register the notification manager with the service
    notificationService.registerManager(this.$refs.notificationManager)
  }
}
</script>
