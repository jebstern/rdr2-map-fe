import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import store from './store'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'hidden',
  },
})

Vue.config.productionTip = false

store.dispatch('init')

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
