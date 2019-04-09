import axios from '@/libs/api.request'

export const login = data => {
  return axios.request({
    url: '/login',
    data,
    method: 'post'
  })
}

export const logout = () => {
  return axios.request({
    url: '/SignOut',
    method: 'post'
  })
}
