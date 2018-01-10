// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VuesticPlugin from 'src/components/vuestic-components/vuestic-components-plugin'
// import VueNativeSock from 'vue-native-websocket'
import './i18n'
// import 'socket.io'

window._ = require('lodash')

Vue.use(VuesticPlugin)
Vue.use(BootstrapVue)

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
// Vue.use(VueNativeSock, 'ws://172.31.22.33:9105/wsApp/o19WonOrHQ', { store: store, format: 'json' })

sync(store, router)

let mediaHandler = () => {
  if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
    store.dispatch('toggleSidebar', true)
  } else {
    store.dispatch('toggleSidebar', false)
  }
}

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
