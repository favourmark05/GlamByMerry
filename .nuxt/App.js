import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'
import NuxtBuildIndicator from './components/nuxt-build-indicator'

import '../assets/app.scss'

import _6f6c098b from '../layouts/default.vue'
import _77a66d33 from '../layouts/login.vue'
import _ee76a6e4 from '../layouts/signup.vue'

const layouts = { "_default": _6f6c098b,"_login": _77a66d33,"_signup": _ee76a6e4 }

export default {
  head: {"title":"glam-dashboard","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"My unreal Nuxt.js project"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fcss\u002Fbootstrap.min.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fcss\u002Fbootstrap-reset.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fassets\u002Ffont-awesome\u002Fcss\u002Ffont-awesome.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fassets\u002Fjquery-easy-pie-chart\u002Fjquery.easy-pie-chart.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fcss\u002Fowl.carousel.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fcss\u002Fslidebars.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fcss\u002Fstyle.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fcss\u002Fstyle-responsive.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002Fcss\u002Fgallery.css"}],"script":[{"src":"\u002Fjs\u002Fjquery.js"},{"src":"\u002Fjs\u002Fmodernizr.custom.js"},{"src":"\u002Fjs\u002Fbootstrap.bundle.min.js"},{"src":"\u002Fjs\u002Fjquery.dcjqaccordion.2.7.js"},{"src":"\u002Fjs\u002Fjquery.scrollTo.min.js"},{"src":"\u002Fjs\u002Fjquery.nicescroll.js"},{"src":"\u002Fjs\u002Fjquery.sparkline.js"},{"src":"assets\u002Fjquery-easy-pie-chart\u002Fjquery.easy-pie-chart.js"},{"src":"\u002Fjs\u002Fowl.carousel.js"},{"src":"\u002Fjs\u002Fjquery.customSelect.min.js"},{"src":"\u002Fjs\u002Frespond.min.js"},{"src":"\u002Fjs\u002Fslidebars.min.js"},{"src":"\u002Fjs\u002Fsparkline-chart.js"},{"src":"\u002Fjs\u002Feasy-pie-chart.js"},{"src":"\u002Fassets\u002Ffancybox\u002Fsource\u002Fjquery.fancybox.js"},{"src":"\u002Fjs\u002Fcount.js"},{"src":"js\u002Ftoucheffects.js"},{"src":"js\u002Frespond.min.js"},{"src":"\u002Fjs\u002Fcommon-scripts.js"}],"style":[]},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [loadingEl, h(NuxtBuildIndicator), transitionEl])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
