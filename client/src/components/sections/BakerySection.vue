<template>
    <section class="py-20 bg-gradient-to-b from-amber-50 to-orange-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Bakery</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Discover our artisanal collection of freshly baked goods, crafted with passion and the finest ingredients. 
                    Each item tells a story of tradition, quality, and exceptional taste.
                </p>
            </div>

            <!-- Products Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Bread -->
                <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div class="relative h-64 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                        <div class="text-8xl group-hover:scale-110 transition-transform duration-300">🍞</div>
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                    <div class="p-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Bread</h3>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            Artisan breads baked fresh daily with traditional techniques. From classic baguettes to innovative Asian-inspired loaves.
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-orange-600">15+ Varieties</span>
                            <button class="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200">
                                View All
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Cake -->
                <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div class="relative h-64 bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center">
                        <div class="text-8xl group-hover:scale-110 transition-transform duration-300">🍰</div>
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                    <div class="p-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Cake</h3>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            Exquisite cakes that celebrate life's special moments. Each creation is a masterpiece of flavor and artistry.
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-orange-600">20+ Options</span>
                            <button class="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200">
                                View All
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Pastry -->
                <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div class="relative h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                        <div class="text-8xl group-hover:scale-110 transition-transform duration-300">🥐</div>
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                    <div class="p-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Pastry</h3>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            Delicate pastries that showcase the perfect balance of French technique and Asian innovation. A treat for all senses.
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-orange-600">25+ Selections</span>
                            <button class="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200">
                                View All
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom CTA -->
            <div class="text-center mt-16">
                <button class="bg-gray-900 text-white px-12 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 text-lg">
                    Explore Full Menu
                </button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BakerySection'
}
</script> 