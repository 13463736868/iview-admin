import axios from '@/libs/api.request'
// 获取合同类型管理--选择客户列表
export const getContractList = data => {
  return axios.request({
    url: '/contract/users/list',
    data,
    method: 'post'
  })
}
/// contract/type/list

export const getTableList = data => {
  return axios.request({
    url: '/contract/type/list',
    data,
    method: 'post'
  })
}

export const getArbList = data => {
  return axios.request({
    url: '/contract/arbitration/list',
    data,
    method: 'post'
  })
}
export const getUserList = data => {
  return axios.request({
    url: '/users/verify/company/list',
    data,
    method: 'post'
  })
}
// 仲裁委信息列表
export const getArbitration = data => {
  return axios.request({
    url: '/arbitration/list',
    data,
    method: 'post'
  })
}
// 删除合同类型
export const deleteContr = data => {
  return axios.request({
    url: '/contract/type/delete',
    data,
    method: 'post'
  })
}
export const editContr = (data) => {
  return axios.request({
    // type 1新增  2修改
    url: '/contract/type/addOrUpdate/2',
    data,
    method: 'post'
  })
}
export const addContraceOne = data => {
  return axios.request({
    url: '/contract/type/addOrUpdate/1',
    data,
    method: 'post'
  })
}

// 修改仲裁委状态
export const stopArbitration = data => {
  return axios.request({
    url: '/arbitration/updateState',
    data,
    method: 'post'
  })
}

export const deleteArbitration = data => {
  return axios.request({
    url: '/arbitration/delete',
    data,
    method: 'post'
  })
}
// 获取客户信息管理里面的企业列表
export const getCompanyList = data => {
  return axios.request({
    url: '/users/company/list',
    data,
    method: 'post'
  })
}
// 获取客户信息管理里面的单个企业详情getCompanyForm
export const getCompanyForm = data => {
  return axios.request({
    url: '/users/company/detail',
    data,
    method: 'post'
  })
}

// 获取客户信息管理里面的个人的详情getPersonForm
export const getPersonForm = data => {
  return axios.request({
    url: '/users/register/detail',
    data,
    method: 'post'
  })
}

// 获取客户信息管理里面的个人列表
export const getCustomerList = data => {
  return axios.request({
    url: '/users/register/list',
    data,
    method: 'post'
  })
}
// arbAdd添加仲裁委信息
export const arbAdd = data => {
  return axios.request({
    url: '/arbitration/addOrUpdate/1',
    data,
    method: 'post'
  })
}
// 客户信息管理修个人状态

export const userUpdateState = data => {
  return axios.request({
    url: '/users/register/item/updateState',
    data,
    method: 'post'
  })
}
// 客户信息管理修改企业状态
export const companyUpdateState = data => {
  return axios.request({
    url: '/users/company/item/updateState',
    data,
    method: 'post'
  })
}
// arbAdd修改仲裁委信息
export const arbEdit = data => {
  return axios.request({
    url: '/arbitration/addOrUpdate/2',
    data,
    method: 'post'
  })
}
// tradeType 公司类型
export const tradeType = data => {
  return axios.request({
    url: '/users/dictionary/tradeType',
    data,
    method: 'post'
  })
}

// companyNumber 公司人数
export const companyNumber = data => {
  return axios.request({
    url: '/users/dictionary/companyNumber',
    data,
    method: 'post'
  })
}

// 获取企业证件类型
export const priseIdcardType = data => {
  return axios.request({
    url: '/users/dictionary/enterpriseIdcardType',
    data,
    method: 'post'
  })
}

// 获取个人证件类型
export const personIdcardType = data => {
  return axios.request({
    url: '/users/dictionary/personIdcardType',
    data,
    method: 'post'
  })
}
// usersVerifyCompany

// 客户信息审核--列表(企业)
export const usersVerifyCompany = data => {
  return axios.request({
    url: '/users/verify/company/list',
    data,
    method: 'post'
  })
}

// usersVerifyCustomList
// 客户信息审核--列表(个人)
export const usersVerifyCustom = data => {
  return axios.request({
    url: '/users/verify/register/list',
    data,
    method: 'post'
  })
}

// 客户信息审核企业提交 users/verify/company/submit
export const usersCompanySubmit = data => {
  return axios.request({
    url: '/users/verify/company/submit',
    data,
    method: 'post'
  })
}
// 客户信息审核个人提交  /users/verify/register/submit
export const usersRegisterSubmit = data => {
  return axios.request({
    url: '/users/verify/register/submit',
    data,
    method: 'post'
  })
}

// 客户信息审核状态类型approve
export const dictionaryApprove = data => {
  return axios.request({
    url: '/users/dictionary/approve',
    data,
    method: 'post'
  })
}
// updataState

export const updataContractState = data => {
  return axios.request({
    url: '/contract/type/updateState',
    data,
    method: 'post'
  })
}
