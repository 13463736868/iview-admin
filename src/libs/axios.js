import axios from 'axios'
import router from 'vue-router'
// import store from '@/store'
import qs from 'qs'
// import { Spin } from 'iview'
// const addErrorLog = errorInfo => {
//   const { statusText, status, request: { responseURL } } = errorInfo
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        ContentType: 'application/x-www-form-urlencoded;charset=utf-8'
      },
      timeout: 20000
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    console.log(url)
    // 请求拦截
    instance.interceptors.request.use(config => {
      if (config.method === 'post') {
        config.data = qs.stringify(config.data)
      }
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      if (res.data.flag === true) {
        this.destroy(url)
        const { data, status } = res
        return { data, status }
      } else {
        switch (res.data.code) {
          case '000121':
            // 没有登录
            // removeToken()
            // 如何跳转到登录页面
            // if (router.currentRoute.path !== 'login') {
            router.replace({
              path: '/login'
            })
            // }
            break
        }
        return Promise.reject(res.data.message)
      }
    }, (error) => {
      this.destroy(url)
      switch (error.status) {
        case 401:
        case 403:
          // removeToken()
          // 清除token store localStorage 等等
          router.replace({
            path: '/login'
          })
          break
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
