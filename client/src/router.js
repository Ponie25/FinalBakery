import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Menu from './views/Menu.vue'
import Contact from './views/Contact.vue'
import Offers from './views/Offers.vue'
import Checkout from './views/Checkout.vue'
import Orders from './views/Orders.vue'
import AdminLayout from './views/admin/AdminLayout.vue'
import AdminDashboard from './views/admin/Dashboard.vue'
import UserManagement from './views/admin/UserManagement.vue'
import ProductManagement from './views/admin/ProductManagement.vue'
import OrderManagement from './views/admin/OrderManagement.vue'
import Analytics from './views/admin/Analytics.vue'
import Settings from './views/admin/Settings.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/menu',
        name: 'Menu',
        component: Menu
    },
    {
        path: '/offers',
        name: 'Offers',
        component: Offers
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
        props: true
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders,
        props: true
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            {
                path: '',
                name: 'AdminDashboard',
                component: AdminDashboard
            },
            {
                path: 'users',
                name: 'UserManagement',
                component: UserManagement
            },
            {
                path: 'products',
                name: 'ProductManagement',
                component: ProductManagement
            },
            {
                path: 'orders',
                name: 'OrderManagement',
                component: OrderManagement
            },
            {
                path: 'analytics',
                name: 'Analytics',
                component: Analytics
            },
            {
                path: 'settings',
                name: 'Settings',
                component: Settings
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
