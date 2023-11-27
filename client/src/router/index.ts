import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const beforeEnter = (to: any, __: any, next: any) => {
    if (!store.getters.logged) next('/login')
    else if (to.meta.role === 'all') next()
    else if (to.meta.role !== store.getters.role) next(store.getters.role==='ADMIN'?'/':'/staff')
    else next()
}

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('../views/Dashboard.vue'), beforeEnter, meta: { role: 'ADMIN' } },
        { path: '/staff', component: () => import('../views/StaffBookings.vue'), beforeEnter, meta: { role: 'all' } }, 
        { path: '/users', component: () => import('../views/Users.vue'), beforeEnter, meta: { role: 'ADMIN' } }, 
        { path: '/chats', component: () => import('../views/Chat.vue'), beforeEnter, meta: { role: 'all' } },
        { path: '/bookings', component: () => import('../views/Reversation.vue'), beforeEnter, meta: { role: 'ADMIN' } }, 
        { path: '/translator', component: () => import('../views/Translator.vue'), beforeEnter, meta: { role: 'all' } }, 
        { path: '/settings', component: () => import('../views/Settings.vue'), beforeEnter, meta: { role: 'all' } }, 
        { path: '/rooms', component: () => import('../views/Rooms.vue'), beforeEnter, meta: { role: 'ADMIN' } },
        // { path: '/videochats', component: () => import('../views/VideoCall.vue'), beforeEnter, meta: { role: 'all' } },
        
        { path: '/login', component: () => import('../views/Login.vue') },
    ]
})