import Vue from 'vue'
import Vuex from 'vuex'
import collectibles from './modules/collectibles'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'rdr2map-app',
  storage: localStorage
})

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions: {
    init ({dispatch}) {
      dispatch('loadLocations')
      dispatch('loadUserLocations')
      dispatch('loadGroups')
      dispatch('loadCategories')
    }
  },
  modules: {
    collectibles,
  },
  strict: debug,
  plugins: [vuexPersist.plugin]
})
