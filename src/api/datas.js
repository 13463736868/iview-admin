import axios from '@/libs/api.request'

export const dictionaryList = data => {
  return axios.request({
    url: '/users/dictionary/' + data.type,
    method: 'post'
  })
}

export const maUserList = data => {
  return axios.request({
    url: '/maUser/list',
    data,
    method: 'post'
  })
}

export const maUserAdd = data => {
  return axios.request({
    url: '/maUser/add/' + (data.id === 0 ? '1' : '2'),
    data,
    method: 'post'
  })
}

export const maUserDelete = data => {
  return axios.request({
    url: '/maUser/delete',
    data,
    method: 'post'
  })
}

export const maRoleList = data => {
  return axios.request({
    url: '/maRole/list',
    data,
    method: 'post'
  })
}

export const maRolequeryAll = data => {
  return axios.request({
    url: '/maRole/queryAll',
    data,
    method: 'post'
  })
}

export const maRoleDelete = data => {
  return axios.request({
    url: '/maRole/delete',
    data,
    method: 'post'
  })
}

export const maRoleAdd = data => {
  return axios.request({
    url: '/maRole/add/' + (data.id === 0 ? '1' : '2'),
    data,
    method: 'post'
  })
}

export const maRoleRoleFunc = data => {
  return axios.request({
    url: '/maRole/queryRoleFunc',
    data,
    method: 'post'
  })
}

export const queryCompany = data => {
  return axios.request({
    url: '/maOrgainzation/queryCompanyList',
    data,
    method: 'post'
  })
}

export const queryDeptBy = data => {
  return axios.request({
    url: '/maOrgainzation/queryDeptByCompanyId',
    data,
    method: 'post'
  })
}

export const maOrgTreeList = () => {
  return axios.request({
    url: '/maOrgainzation/genOrgAndUserTree',
    method: 'post'
  })
}

export const maOrgTreeQuer = data => {
  return axios.request({
    url: '/maOrgainzation/queryDetail',
    data,
    method: 'post'
  })
}

export const maFuncTreeList = () => {
  return axios.request({
    url: '/maFunction/generateFuncTree',
    method: 'post'
  })
}

export const maOrgDele = data => {
  return axios.request({
    url: '/maOrgainzation/delete',
    data,
    method: 'post'
  })
}

export const maOrgAdd = data => {
  return axios.request({
    url: '/maOrgainzation/add/' + (data.id === 0 ? '1' : '2'),
    data,
    method: 'post'
  })
}

export const caseFindList = data => {
  return axios.request({
    url: '/cases/findMyCases',
    data,
    method: 'post'
  })
}

export const casesAllot = data => {
  return axios.request({
    url: '/cases/updateAllotCases',
    data,
    method: 'post'
  })
}

export const casesAgree = data => {
  return axios.request({
    url: '/cases/updateApproveCases',
    data,
    method: 'post'
  })
}

export const caseDetails = data => {
  return axios.request({
    url: '/cases/findCaseDetails',
    data,
    method: 'post'
  })
}

export const usersList = data => {
  return axios.request({
    url: '/contract/users/list',
    data,
    method: 'post'
  })
}

export const arbitList = data => {
  return axios.request({
    url: '/contract/arbitration/list',
    data,
    method: 'post'
  })
}

export const maCusList = data => {
  return axios.request({
    url: '/maCusTypeUser/list',
    data,
    method: 'post'
  })
}

export const maCusAdd = data => {
  return axios.request({
    url: '/maCusTypeUser/add/' + (data.id === 0 ? '1' : '2'),
    data,
    method: 'post'
  })
}

export const maCusDel = data => {
  return axios.request({
    url: '/maCusTypeUser/delete',
    data,
    method: 'post'
  })
}

export const userCompList = data => {
  return axios.request({
    url: '/users/company/list',
    data,
    method: 'post'
  })
}

export const userCompAdd = data => {
  return axios.request({
    url: '/users/company/item/' + (data.id === null ? '1' : '2'),
    data,
    method: 'post'
  })
}

export const userCompDeta = data => {
  return axios.request({
    url: '/users/company/detail',
    data,
    method: 'post'
  })
}

export const userCompState = data => {
  return axios.request({
    url: '/users/company/item/updateState',
    data,
    method: 'post'
  })
}

export const userRegiList = data => {
  return axios.request({
    url: '/users/register/list',
    data,
    method: 'post'
  })
}

export const userRegiAdd = data => {
  return axios.request({
    url: '/users/register/item/' + (data.id === null ? '1' : '2'),
    data,
    method: 'post'
  })
}

export const userRegiDeta = data => {
  return axios.request({
    url: '/users/register/detail',
    data,
    method: 'post'
  })
}

export const userRegiState = data => {
  return axios.request({
    url: '/users/register/item/updateState',
    data,
    method: 'post'
  })
}

export const updatePass = data => {
  return axios.request({
    url: '/users/updatePassword',
    data,
    method: 'post'
  })
}

export const submCase = data => {
  return axios.request({
    url: '/cases/updateSubmitCases',
    data,
    method: 'post'
  })
}
