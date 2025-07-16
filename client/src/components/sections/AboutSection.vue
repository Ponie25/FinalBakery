<template>
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <!-- Left side - Images -->
                <div class="grid grid-cols-2 gap-4">
                    <!-- Large image -->
                    <div class="col-span-2 relative overflow-hidden rounded-2xl shadow-xl">
                        <div class="aspect-w-16 aspect-h-10 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                            <div class="text-center">
                                <div class="text-8xl mb-4">🥐</div>
                                <p class="text-gray-600 font-medium">Fresh Croissants</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Small images -->
                    <div class="relative overflow-hidden rounded-xl shadow-lg">
                        <div class="aspect-w-1 aspect-h-1 bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
                            <div class="text-center">
                                <div class="text-5xl mb-2">🍰</div>
                                <p class="text-gray-600 text-sm">Artisan Cakes</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative overflow-hidden rounded-xl shadow-lg">
                        <div class="aspect-w-1 aspect-h-1 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                            <div class="text-center">
                                <div class="text-5xl mb-2">🍞</div>
                                <p class="text-gray-600 text-sm">Fresh Bread</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right side - Content -->
                <div class="space-y-8">
                    <div>
                        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            TOUS les JOURS:<br>
                            <span class="text-orange-600">French Asian Bakery</span>
                        </h2>
                        
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-2xl font-semibold text-gray-900 mb-3">
                                    Freshly Baked. Everyday.
                                </h3>
                                <p class="text-gray-600 text-lg leading-relaxed">
                                    At TOUS les JOURS, we believe in the art of baking. Every morning, our skilled bakers 
                                    craft fresh breads, pastries, and cakes using traditional French techniques combined 
                                    with innovative Asian flavors.
                                </p>
                            </div>
                            
                            <p class="text-gray-600 text-lg leading-relaxed">
                                From our signature croissants to our unique matcha pastries, each item is made with 
                                premium ingredients and genuine care. We're committed to bringing you the finest 
                                bakery experience that celebrates both French elegance and Asian creativity.
                            </p>
                            
                            <div class="flex items-center space-x-4 pt-4">
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    <span class="text-gray-700 font-medium">Premium Ingredients</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    <span class="text-gray-700 font-medium">Daily Fresh</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    <span class="text-gray-700 font-medium">Artisan Quality</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pt-6">
                        <button class="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 text-lg">
                            Our Story
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AboutSection'
}
</script>

<style scoped>
.aspect-w-16 {
    position: relative;
    padding-bottom: 62.5%;
}

.aspect-h-10 {
    position: relative;
}

.aspect-w-16 > div,
.aspect-h-10 > div {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.aspect-w-1 {
    position: relative;
    padding-bottom: 100%;
}

.aspect-h-1 {
    position: relative;
}

.aspect-w-1 > div,
.aspect-h-1 > div {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style> 