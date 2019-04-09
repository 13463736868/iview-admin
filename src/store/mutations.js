import * as types from './mutations-types.js'

export default {
  // 大写
  [types.SET_CASEID] (state, id) {
    state.caseId = id
  },
  [types.SET_CASESTATE] (state, obj) {
    state.caseState = obj
  },
  [types.SET_USERSINFO] (state, obj) {
    state.usersInfo = obj
  }
}
