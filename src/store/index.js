import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
  caseId: null,
  caseState: null,
  usersInfo: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    user,
    app
  }
})
