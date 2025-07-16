<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>
