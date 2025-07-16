<template>
    <section class="relative h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
        <!-- Background decorative elements -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-20 right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 left-20 w-80 h-80 bg-yellow-200 rounded-full blur-3xl"></div>
        </div>

        <!-- Main content -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div class="flex items-center justify-between h-full">
                <!-- Left side - Text content -->
                <div class="flex-1 max-w-2xl">
                    <div class="mb-8">
                        <p class="text-orange-600 font-medium text-lg mb-2">Premium French Asian Bakery</p>
                        <h1 class="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                            <span class="block">TOUS</span>
                            <span class="block text-orange-600">les JOURS</span>
                        </h1>
                    </div>
                    
                    <p class="text-xl text-gray-600 mb-12 leading-relaxed">
                        Experience the perfect blend of French elegance and Asian flavors. 
                        Freshly baked every day with the finest ingredients and traditional techniques.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4">
                        <router-link to="/menu" class="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 text-lg text-center">
                            Explore Menu
                        </router-link>
                        <button class="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 text-lg">
                            Find Store
                        </button>
                    </div>
                </div>

                <!-- Right side - Visual elements -->
                <div class="hidden lg:flex flex-1 justify-center items-center relative">
                    <!-- Pastry display -->
                    <div class="relative">
                        <!-- Main display circle -->
                        <div class="w-96 h-96 bg-white rounded-full shadow-2xl flex items-center justify-center relative">
                            <div class="text-6xl">🥐</div>
                            
                            <!-- Floating pastries -->
                            <div class="absolute -top-8 -right-8 w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg">
                                <span class="text-2xl">🧁</span>
                            </div>
                            <div class="absolute -bottom-12 -left-12 w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center shadow-lg">
                                <span class="text-3xl">🍰</span>
                            </div>
                            <div class="absolute top-1/2 -right-16 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center shadow-lg">
                                <span class="text-xl">🥖</span>
                            </div>
                            <div class="absolute -top-16 left-1/2 w-18 h-18 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                <span class="text-2xl">🍪</span>
                            </div>
                        </div>
                        
                        <!-- Decorative elements -->
                        <div class="absolute inset-0 animate-pulse">
                            <div class="absolute top-0 left-0 w-4 h-4 bg-orange-300 rounded-full"></div>
                            <div class="absolute bottom-0 right-0 w-3 h-3 bg-yellow-300 rounded-full"></div>
                            <div class="absolute top-1/2 left-0 w-2 h-2 bg-pink-300 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div class="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
                <div class="w-1 h-3 bg-orange-400 rounded-full mt-2"></div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HeroSection'
}
</script>

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: .5;
    }
}
</style> 