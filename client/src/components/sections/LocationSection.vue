<template>
    <section class="py-20 bg-gradient-to-r from-amber-100 to-orange-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Left side - Content -->
                <div class="space-y-8">
                    <div>
                        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Find A TOUS les JOURS Near You
                        </h2>
                        <p class="text-xl text-gray-600 leading-relaxed mb-8">
                            Discover the closest TOUS les JOURS location and experience the finest French Asian bakery 
                            in your neighborhood. Each store offers the same commitment to quality and freshness you love.
                        </p>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold text-gray-900">Store Locator</h3>
                                <p class="text-gray-600">Find the nearest location with our interactive map</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold text-gray-900">Store Hours</h3>
                                <p class="text-gray-600">Check opening hours and special holiday schedules</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold text-gray-900">Contact Info</h3>
                                <p class="text-gray-600">Get phone numbers and store-specific details</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pt-4">
                        <button class="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 text-lg">
                            Find A Store
                        </button>
                    </div>
                </div>

                <!-- Right side - Store Image -->
                <div class="relative">
                    <div class="rounded-2xl overflow-hidden shadow-2xl">
                        <div class="aspect-w-4 aspect-h-3 bg-gradient-to-br from-orange-200 to-yellow-200">
                            <div class="flex items-center justify-center bg-white bg-opacity-90">
                                <div class="text-center">
                                    <div class="text-6xl mb-4">🏪</div>
                                    <p class="text-xl font-semibold text-gray-800">TOUS les JOURS Store</p>
                                    <p class="text-gray-600 mt-2">Visit us today!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Floating elements -->
                    <div class="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <span class="text-2xl">📍</span>
                    </div>
                    <div class="absolute -bottom-4 -left-4 w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center shadow-lg">
                        <span class="text-3xl">🛒</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'LocationSection'
}
</script>

<style scoped>
.aspect-w-4 {
    position: relative;
    padding-bottom: 75%;
}

.aspect-h-3 {
    position: relative;
}

.aspect-w-4 > div {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style> 