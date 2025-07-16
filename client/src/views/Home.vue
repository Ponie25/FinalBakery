<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <HeroSection />
        
        <!-- About Section -->
        <AboutSection />
        
        <!-- Bakery Section -->
        <BakerySection />
        
        <!-- Beverage Section -->
        <BeverageSection />
        
        <!-- Location Section -->
        <LocationSection />
        
        <!-- Press Section -->
        <PressSection />
        
        <!-- Newsletter Section -->
        <NewsletterSection />
    </div>
</template>

<script>
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import BakerySection from '../components/sections/BakerySection.vue'
import BeverageSection from '../components/sections/BeverageSection.vue'
import LocationSection from '../components/sections/LocationSection.vue'
import PressSection from '../components/sections/PressSection.vue'
import NewsletterSection from '../components/sections/NewsletterSection.vue'

export default {
    name: 'Home',
    components: {
        HeroSection,
        AboutSection,
        BakerySection,
        BeverageSection,
        LocationSection,
        PressSection,
        NewsletterSection
    }
}
</script> 