<template>
    <section class="py-20 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <!-- Header -->
            <div class="mb-12">
                <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Join Our Newsletter
                </h2>
                <p class="text-xl text-gray-600 leading-relaxed">
                    Stay up to date with our latest news, new bakery items, special offers, and exclusive recipes. 
                    Be the first to know about everything happening at TOUS les JOURS.
                </p>
            </div>

            <!-- Newsletter Form -->
            <div class="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                <form @submit.prevent="submitNewsletter" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- First Name -->
                        <div class="text-left">
                            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                v-model="form.firstName"
                                required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                                placeholder="Enter your first name"
                            >
                        </div>

                        <!-- Last Name -->
                        <div class="text-left">
                            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                v-model="form.lastName"
                                required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                                placeholder="Enter your last name"
                            >
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="text-left">
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            v-model="form.email"
                            required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                            placeholder="Enter your email address"
                        >
                    </div>

                    <!-- Preferences -->
                    <div class="text-left">
                        <label class="block text-sm font-medium text-gray-700 mb-3">
                            What would you like to receive?
                        </label>
                        <div class="space-y-2">
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    v-model="form.preferences"
                                    value="new-products"
                                    class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                >
                                <span class="ml-2 text-gray-700">New product announcements</span>
                            </label>
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    v-model="form.preferences"
                                    value="special-offers"
                                    class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                >
                                <span class="ml-2 text-gray-700">Special offers and promotions</span>
                            </label>
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    v-model="form.preferences"
                                    value="recipes"
                                    class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                >
                                <span class="ml-2 text-gray-700">Exclusive recipes and baking tips</span>
                            </label>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-4">
                        <button
                            type="submit"
                            class="w-full bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 text-lg"
                        >
                            Subscribe to Newsletter
                        </button>
                    </div>
                </form>

                <!-- Success Message -->
                <div v-if="showSuccess" class="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Thank you for subscribing! Check your email for confirmation.</span>
                    </div>
                </div>
            </div>

            <!-- Benefits -->
            <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">📧</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Weekly Updates</h3>
                    <p class="text-gray-600">Get the latest news delivered to your inbox every week</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">🎁</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Exclusive Offers</h3>
                    <p class="text-gray-600">Be the first to know about special promotions and discounts</p>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">👨‍🍳</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Baking Tips</h3>
                    <p class="text-gray-600">Learn from our expert bakers with exclusive recipes and techniques</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'NewsletterSection',
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                preferences: []
            },
            showSuccess: false
        }
    },
    methods: {
        submitNewsletter() {
            // Simulate form submission
            this.showSuccess = true;
            setTimeout(() => {
                this.showSuccess = false;
                this.form = {
                    firstName: '',
                    lastName: '',
                    email: '',
                    preferences: []
                };
            }, 3000);
        }
    }
}
</script> 