<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Settings</h2>
      <p class="mt-2 text-gray-600">Configure your bakery management system</p>
    </div>

    <!-- Coming Soon Message -->
    <div class="bg-white shadow rounded-lg p-8 text-center">
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
        <Cog6ToothIcon class="h-8 w-8 text-gray-600" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Settings Coming Soon</h3>
      <p class="text-gray-600 mb-6">
        This feature is currently under development. You'll be able to configure system settings here.
      </p>
      <div class="space-y-2 text-sm text-gray-500">
        <p>• Store information settings</p>
        <p>• Notification preferences</p>
        <p>• System configuration</p>
        <p>• User permissions management</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Cog6ToothIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'Settings',
  components: {
    Cog6ToothIcon
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script> 