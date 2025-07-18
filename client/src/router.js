import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Menu from './views/Menu.vue'
import Contact from './views/Contact.vue'
import Offers from './views/Offers.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
