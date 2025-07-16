<template>
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Beverage</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Complement your bakery experience with our premium beverage selection. From aromatic coffees to refreshing smoothies, 
                    every sip is crafted to perfection.
                </p>
            </div>

            <!-- Beverages Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Coffee -->
                <div class="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div class="relative h-64 bg-gradient-to-br from-brown-100 to-orange-200 flex items-center justify-center">
                        <div class="text-8xl group-hover:scale-110 transition-transform duration-300">☕</div>
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                    <div class="p-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Coffee</h3>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            Premium coffee beans sourced from the world's finest regions. Each cup delivers rich flavor and aromatic excellence.
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-orange-600">12+ Varieties</span>
                            <button class="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200">
                                View Menu
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Tea & More -->
                <div class="group bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div class="relative h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                        <div class="text-8xl group-hover:scale-110 transition-transform duration-300">🍵</div>
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                    <div class="p-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Tea & More</h3>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            Traditional teas and specialty beverages including matcha, bubble tea, and herbal infusions for every taste preference.
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-orange-600">18+ Options</span>
                            <button class="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200">
                                View Menu
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Smoothie -->
                <div class="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div class="relative h-64 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                        <div class="text-8xl group-hover:scale-110 transition-transform duration-300">🥤</div>
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                    <div class="p-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Smoothie</h3>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            Fresh fruit smoothies made with real ingredients. Healthy, delicious, and perfect for any time of day.
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-orange-600">10+ Blends</span>
                            <button class="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200">
                                View Menu
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Featured Drinks -->
            <div class="mt-16 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8">
                <div class="text-center">
                    <h3 class="text-3xl font-bold text-gray-900 mb-4">Today's Special</h3>
                    <p class="text-xl text-gray-600 mb-6">
                        Try our signature Matcha Latte paired with fresh croissants - the perfect combination of East meets West!
                    </p>
                    <div class="flex justify-center items-center space-x-4">
                        <span class="text-4xl">🍵</span>
                        <span class="text-2xl text-orange-600">+</span>
                        <span class="text-4xl">🥐</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BeverageSection'
}
</script> 