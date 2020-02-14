import types from '../mutation-types'
import api from '../../api/'
import _ from "lodash";

const state = {
  location: {},
  locations: [],
  userLocations: [],
  categories: [],
  groups: [],
  showFound: true,
  hideCategories: []
}

const USERNAME = 'Jebe'

const getters = {
  getLocations: state => state.locations,
  getUserLocations: state => state.userLocations,
  getGroups: state => state.groups,
  getCategories: state => state.categories,
  getLocation: state => state.location,
  showFound: state => state.showFound,
  getHiddenCategories: state => state.hideCategories,
}

const actions = {
  async loadLocations ({commit}) {
    const locations = await api.getLocations()
    commit(types.SAVE_LOCATIONS, locations)
  },
  async loadUserLocations ({commit}) {
    const locations = await api.getUserLocations(USERNAME)
    commit(types.SAVE_USER_LOCATIONS, locations)
  },
  async loadGroups ({commit}) {
    const groups = await api.getGroups()
    commit(types.SAVE_GROUPS, groups)
  },
  async loadCategories ({commit}) {
    const categories = await api.getCategories()
    commit(types.SAVE_CATEGORIES, categories)
  },
  async toggleLocation ({commit, dispatch}, locationId) {
    await api.toggleLocation(USERNAME, locationId).then(res => res.data.isFound);
    
    
    //commit(types.UPDATE_LOCATION, {id: locationId, isFound})
    
    dispatch('loadUserLocations');
    commit(types.SET_LOCATION, locationId)
  },
  async setLocation ({commit}, location) {
    commit(types.SET_LOCATION, location.id)
  },
  async toggleShowFound ({commit}) {
    commit(types.TOGGLE_SHOW_FOUND)
  },
  async toggleShowHideCategory ({commit}, categoryId) {
    commit(types.TOGGLE_SHOW_HIDE_CATEGORY, categoryId)
  },
}

const mutations = {
  [types.SAVE_LOCATIONS] (state, locations) {
    state.locations = locations
  },
  [types.SAVE_USER_LOCATIONS] (state, userLocations) {
    state.userLocations = userLocations
  },
  [types.SAVE_GROUPS] (state, groups) {
    state.groups = groups
  },
  [types.SAVE_CATEGORIES] (state, categories) {
    state.categories = categories
  },
  [types.UPDATE_LOCATION] (state, locationData) {
    const objIndex = state.userLocations.findIndex((obj => obj.id == locationData.id));
    state.userLocations[objIndex].found = locationData.isFound
  },
  [types.SET_LOCATION] (state, locationId) {
    state.location = _.find(state.locations, (n) => n.id === locationId) 
  },
  [types.TOGGLE_SHOW_FOUND] (state) {
    state.showFound = !state.showFound
  },
  [types.TOGGLE_SHOW_HIDE_CATEGORY] (state, categoryId) {
    const index = state.hideCategories.indexOf(categoryId)
    if (index === -1 ) {
      state.hideCategories.push(categoryId);
    } else {
      state.hideCategories.splice(index, 1);
    }    
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
