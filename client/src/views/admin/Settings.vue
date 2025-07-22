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
        <svg class="h-8 w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
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
export default {
  name: 'Settings',
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script> 