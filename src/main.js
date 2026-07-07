import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import { Auth } from './services/auth'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = Auth.me()
  
  if (authRequired && !loggedIn) {
    next('/login')
  } else if (to.path === '/login' && loggedIn) {
    next('/dashboard')
  } else if (to.path === '/') {
    next('/dashboard')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
