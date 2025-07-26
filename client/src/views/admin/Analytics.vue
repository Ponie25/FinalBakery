<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Analytics</h2>
      <p class="mt-2 text-gray-600">View business insights and performance metrics</p>
    </div>

    <!-- Coming Soon Message -->
    <div class="bg-white shadow rounded-lg p-8 text-center">
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
        <ChartBarIcon class="h-8 w-8 text-blue-600" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
      <p class="text-gray-600 mb-6">
        This feature is currently under development. You'll be able to view detailed business analytics and insights here.
      </p>
      <div class="space-y-2 text-sm text-gray-500">
        <p>• Sales performance metrics</p>
        <p>• Customer behavior analysis</p>
        <p>• Product popularity trends</p>
        <p>• Revenue reports and charts</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ChartBarIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'Analytics',
  components: {
    ChartBarIcon
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script> 