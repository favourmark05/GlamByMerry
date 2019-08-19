import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _77d0faa8 = () => interopDefault(import('../pages/bookings.vue' /* webpackChunkName: "pages/bookings" */))
const _0b01760e = () => interopDefault(import('../pages/categories.vue' /* webpackChunkName: "pages/categories" */))
const _59e3e339 = () => interopDefault(import('../pages/courses/index.vue' /* webpackChunkName: "pages/courses/index" */))
const _6f913dd3 = () => interopDefault(import('../pages/customers.vue' /* webpackChunkName: "pages/customers" */))
const _da06d860 = () => interopDefault(import('../pages/gallery.vue' /* webpackChunkName: "pages/gallery" */))
const _5d45a9e7 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _37487952 = () => interopDefault(import('../pages/orders.vue' /* webpackChunkName: "pages/orders" */))
const _d1a80c4e = () => interopDefault(import('../pages/products/index.vue' /* webpackChunkName: "pages/products/index" */))
const _8ed36f5a = () => interopDefault(import('../pages/services/index.vue' /* webpackChunkName: "pages/services/index" */))
const _71cb9f15 = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _d06cffec = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _221af85d = () => interopDefault(import('../pages/courses/course-form.vue' /* webpackChunkName: "pages/courses/course-form" */))
const _0a4ccea5 = () => interopDefault(import('../pages/courses/create.vue' /* webpackChunkName: "pages/courses/create" */))
const _76078c05 = () => interopDefault(import('../pages/products/create.vue' /* webpackChunkName: "pages/products/create" */))
const _9fa5eb5a = () => interopDefault(import('../pages/products/edit.vue' /* webpackChunkName: "pages/products/edit" */))
const _7d372681 = () => interopDefault(import('../pages/products/edit/_id/index.vue' /* webpackChunkName: "pages/products/edit/_id/index" */))
const _fc31e66a = () => interopDefault(import('../pages/services/create.vue' /* webpackChunkName: "pages/services/create" */))
const _1e848147 = () => interopDefault(import('../pages/services/edit/_id/index.vue' /* webpackChunkName: "pages/services/edit/_id/index" */))
const _d8c3f260 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/bookings",
      component: _77d0faa8,
      name: "bookings"
    }, {
      path: "/categories",
      component: _0b01760e,
      name: "categories"
    }, {
      path: "/courses",
      component: _59e3e339,
      name: "courses"
    }, {
      path: "/customers",
      component: _6f913dd3,
      name: "customers"
    }, {
      path: "/gallery",
      component: _da06d860,
      name: "gallery"
    }, {
      path: "/login",
      component: _5d45a9e7,
      name: "login"
    }, {
      path: "/orders",
      component: _37487952,
      name: "orders"
    }, {
      path: "/products",
      component: _d1a80c4e,
      name: "products"
    }, {
      path: "/services",
      component: _8ed36f5a,
      name: "services"
    }, {
      path: "/settings",
      component: _71cb9f15,
      name: "settings"
    }, {
      path: "/signup",
      component: _d06cffec,
      name: "signup"
    }, {
      path: "/courses/course-form",
      component: _221af85d,
      name: "courses-course-form"
    }, {
      path: "/courses/create",
      component: _0a4ccea5,
      name: "courses-create"
    }, {
      path: "/products/create",
      component: _76078c05,
      name: "products-create"
    }, {
      path: "/products/edit",
      component: _9fa5eb5a,
      name: "products-edit",
      children: [{
        path: ":id",
        component: _7d372681,
        name: "products-edit-id"
      }]
    }, {
      path: "/services/create",
      component: _fc31e66a,
      name: "services-create"
    }, {
      path: "/services/edit/:id?",
      component: _1e848147,
      name: "services-edit-id"
    }, {
      path: "/",
      component: _d8c3f260,
      name: "index"
    }],

    fallback: false
  })
}
