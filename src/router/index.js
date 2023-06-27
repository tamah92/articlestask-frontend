import Vue from 'vue'
import VueRouter from 'vue-router'

// import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn } from '@/auth/utils'
// import constants from '@/app-configs/constants'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'ARTICLEPORTAL_HOME',
        breadcrumb: [
          {
            text: 'ARTICLEPORTAL_HOME',
            active: true,
          },
        ],
        layout: 'full',
        resource: 'Auth',
        action: 'read',
        // action: constants.action.permissionLogin,
        // resource: constants.resource.user,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        action: 'read',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/not-authorized',
      name: 'misc-not-authorized',
      component: () => import('@/views/402/NotAuthorized.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  if (!isLoggedIn && to.name !== 'login') {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }
  // if (!isLoggedIn) console.log('isLoggedIn', to)
  // Redirect if logged in

  return next()
})

export default router
