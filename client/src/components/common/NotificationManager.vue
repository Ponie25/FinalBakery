<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <transition-group name="notification" tag="div" class="space-y-2">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="max-w-sm bg-white rounded-lg shadow-lg border-l-4 p-4 flex items-start space-x-3"
        :class="getNotificationClass(notification.type)"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <CheckCircleIcon 
            v-if="notification.type === 'success'" 
            class="w-5 h-5 text-green-500" 
          />
          <XCircleIcon 
            v-else-if="notification.type === 'error'" 
            class="w-5 h-5 text-red-500" 
          />
          <ExclamationTriangleIcon 
            v-else-if="notification.type === 'warning'" 
            class="w-5 h-5 text-yellow-500" 
          />
          <InformationCircleIcon 
            v-else 
            class="w-5 h-5 text-blue-500" 
          />
        </div>
        
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
          <p v-if="notification.message" class="text-sm text-gray-500 mt-1">{{ notification.message }}</p>
        </div>
        
        <!-- Close Button -->
        <button 
          @click="removeNotification(notification.id)"
          class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { 
    CheckCircleIcon, 
    XCircleIcon, 
    ExclamationTriangleIcon, 
    InformationCircleIcon, 
    XMarkIcon 
} from '@heroicons/vue/24/outline'

export default {
  name: 'NotificationManager',
  components: {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon
  },
  data() {
    return {
      notifications: []
    }
  },
  methods: {
    addNotification(notification) {
      const id = Date.now() + Math.random()
      const newNotification = {
        id,
        type: notification.type || 'info',
        title: notification.title || 'Notification',
        message: notification.message || '',
        ...notification
      }
      
      this.notifications.push(newNotification)
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        this.removeNotification(id)
      }, 5000)
    },
    
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    },
    
    getNotificationClass(type) {
      const classes = {
        success: 'border-green-500 bg-green-50',
        error: 'border-red-500 bg-red-50',
        warning: 'border-yellow-500 bg-yellow-50',
        info: 'border-blue-500 bg-blue-50'
      }
      return classes[type] || classes.info
    }
  }
}
</script>

<style scoped>
.notification-enter-active {
  transition: all 0.3s ease;
}
.notification-leave-active {
  transition: all 0.3s ease;
}
.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.notification-move {
  transition: transform 0.3s ease;
}
</style> 