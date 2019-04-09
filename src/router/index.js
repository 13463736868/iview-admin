import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (store.state.user.hasGetInfo) {
      let loc = null
      if (window.localStorage) {
        loc = window.localStorage
      }
      if ((loc.getItem('usersInfo') !== null)) {
        if (store.state.caseId === null) {
          if (loc.getItem('caseId')) {
            store.commit('SET_CASEID', loc.getItem('caseId'))
          }
        }
        if (store.state.caseState === null) {
          if (loc.getItem('caseState')) {
            store.commit('SET_CASESTATE', loc.getItem('caseState'))
          }
        }
        store.commit('SET_USERSINFO', JSON.parse(loc.getItem('usersInfo')))
        turnTo(to, store.state.user.access, next)
      } else {
        setToken('')
        next({
          name: 'login'
        })
      }
    } else {
      let loc = null
      if (window.localStorage) {
        loc = window.localStorage
      }
      if ((loc.getItem('usersInfo') !== null)) {
        let _obj = JSON.parse(loc.getItem('usersInfo'))
        store.commit('SET_USERSINFO', JSON.parse(loc.getItem('usersInfo')))
        store.commit('setAvatar', '')
        store.commit('setUserName', _obj.name)
        store.commit('setUserId', _obj.user_id)
        store.commit('setAccess', _obj.access)
        store.commit('setHasGetInfo', true)
        turnTo(to, _obj.access, next)
      } else {
        setToken('')
        next({
          name: 'login'
        })
      }
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
