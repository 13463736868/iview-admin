export default {
  //  小写
  setCaseId ({ commit, state }, id) {
    commit('SET_CASEID', id)
  },
  setCaseState ({ commit, state }, id) {
    commit('SET_CASESTATE', id)
  },
  setUsersInfo ({ commit, state }, obj) {
    commit('SET_USERSINFO')
  }
}
