import { reactive } from 'vue'

// Global notification state
const state = reactive({
  notificationManager: null
})

export const notificationService = {
  // Register the notification manager component
  registerManager(manager) {
    state.notificationManager = manager
  },

  // Show success notification
  success(title, message = '') {
    if (state.notificationManager) {
      state.notificationManager.addNotification({
        type: 'success',
        title,
        message
      })
    }
  },

  // Show error notification
  error(title, message = '') {
    if (state.notificationManager) {
      state.notificationManager.addNotification({
        type: 'error',
        title,
        message
      })
    }
  },

  // Show warning notification
  warning(title, message = '') {
    if (state.notificationManager) {
      state.notificationManager.addNotification({
        type: 'warning',
        title,
        message
      })
    }
  },

  // Show info notification
  info(title, message = '') {
    if (state.notificationManager) {
      state.notificationManager.addNotification({
        type: 'info',
        title,
        message
      })
    }
  },

  // Generic notification
  show(notification) {
    if (state.notificationManager) {
      state.notificationManager.addNotification(notification)
    }
  }
} 