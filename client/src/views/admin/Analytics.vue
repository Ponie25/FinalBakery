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
        <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
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
export default {
  name: 'Analytics',
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script> 