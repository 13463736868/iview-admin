import Mock from 'mockjs'
import { login, logout } from './login'
import { getTableData, getDragList, uploadImage, getOrgData, getTreeSelectData } from './data'
import { getDictiComp, getDictiTrad, getDictiEnte, getDictiPers, getMaUserList, getMaUserAdd, getMaUserDelete, getMaRoleList, getMaRolequeryAll, getMaRoleDelete, getMaRoleRoleFunc, getQueryCompany, getQueryDeptBy, getMaOrgTreeList, getMaOrgTreeQuer, getMaFuncTreeList, getMaOrgDele, getCaseFind, getCaseDetails } from './datas'
import { getContractList, getTableList, getArbitrationList, getArbitration, getdetail, addContraceOne, editContr, stopArbitration, deleteArbitration, getCompanyList, getCustomerList, arbAdd, arbEdit, priseIdcardType, personIdcardType, tradeType, companyNumber, usersVerifyCompany, usersVerifyCustom, dictionaryApprove, updataContractState, getLoadData, companyUpdateState, userUpdateState, getCompanyForm, getPersonForm, upload, usersCompanySubmit, usersRegisterSubmit } from './contrace'
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
Mock.mock('/login', login)
Mock.mock('/SignOut', logout)
Mock.mock('/dictionary/companyNumber', getDictiComp)
Mock.mock('/dictionary/tradeType', getDictiTrad)
Mock.mock('/dictionary/enterpriseIdcardType', getDictiEnte)
Mock.mock(' /dictionary/personIdcardType', getDictiPers)
Mock.mock('/maUser/list', getMaUserList)
Mock.mock('/maUser/add/1', getMaUserAdd)
Mock.mock('/maUser/add/2', getMaUserAdd)
Mock.mock('/maUser/delete', getMaUserDelete)
Mock.mock('/maRole/list', getMaRoleList)
Mock.mock('/maRole/queryAll', getMaRolequeryAll)
Mock.mock('/maRole/delete', getMaRoleDelete)
Mock.mock('/maRole/add/1', getMaRoleDelete)
Mock.mock('/maRole/add/2', getMaRoleDelete)
Mock.mock('/maRole/queryRoleFunc', getMaRoleRoleFunc)
Mock.mock('/maOrgainzation/queryCompanyList', getQueryCompany)
Mock.mock('/maOrgainzation/queryDeptByCompanyId', getQueryDeptBy)
Mock.mock('/maOrgainzation/genOrgAndUserTree', getMaOrgTreeList)
Mock.mock('/maOrgainzation/queryDetail', getMaOrgTreeQuer)
Mock.mock('/maFunction/generateFuncTree', getMaFuncTreeList)
Mock.mock('/maOrgainzation/delete', getMaOrgDele)
Mock.mock('/maOrgainzation/add/1', getMaOrgDele)
Mock.mock('/maOrgainzation/add/2', getMaOrgDele)
Mock.mock('/cases/findMyCases', getCaseFind)
Mock.mock('/cases/updateAllotCases', getMaOrgDele)
Mock.mock('/cases/updateSubmitCases', getMaOrgDele)
Mock.mock('/cases/findCaseDetails', getCaseDetails)

Mock.mock('/contract/users/list', getContractList) // 获取合同类型管理--选择客户列表
Mock.mock('/contract/arbitration/list', getArbitrationList) // 获取关联仲裁委
// Mock.mock('/users/verify/company/list', getUserList)//获取合同类型选择客户列表
Mock.mock('/arbitration/list', getArbitration) // 获取仲裁委模块列表
Mock.mock('/contract/type/delete', getdetail)
Mock.mock('/contract/type/addOrUpdate/1', addContraceOne)
Mock.mock('/contract/type/addOrUpdate/2', editContr)
Mock.mock('/arbitration/updateState', stopArbitration) // 修改仲裁委状态
Mock.mock('/arbitration/delete', deleteArbitration) // 删除仲裁委
Mock.mock('/users/company/list', getCompanyList) // 客户信息管理--列表(企业)/users/register/list
Mock.mock('/users/register/list', getCustomerList) // 客户信息管理--列表(个人)t
Mock.mock('/arbitration/addOrUpdate/1', arbAdd) // arbAdd
Mock.mock('/arbitration/addOrUpdate/2', arbEdit)// arbEdit
Mock.mock('/dictionary/enterpriseIdcardType', priseIdcardType) // 企业证件类型
Mock.mock('/dictionary/personIdcardType', personIdcardType) // 个人证件类型//companyNumber
Mock.mock('/dictionary/tradeType', tradeType) // 公司类型
Mock.mock('/dictionary/companyNumber', companyNumber) // 公司人数
Mock.mock('/users/verify/company/list', usersVerifyCompany)// usersVerifyCompany
Mock.mock('/users/verify/register/list', usersVerifyCustom)// usersVerifyCustomList
Mock.mock('/dictionary/approve', dictionaryApprove)// 客户信息审核状态类型approve
Mock.mock('/contract/type/updateState', updataContractState)/// contract/type/updateState
Mock.mock('/contract/type/list', getTableList)/// contract/type/list
Mock.mock('/file/uploadToId', getLoadData)/// contract/type/list
Mock.mock('/users/company/item/updateState', companyUpdateState)/// 客户信息管理修改企业状态
Mock.mock('/users/register/item/updateState', userUpdateState)/// 客户信息管理修改企业状态///
Mock.mock('/users/company/details', getCompanyForm)/// /获取客户信息管理里面的企业的详情getPersonForm
Mock.mock('/users/register/details', getPersonForm)/// /获取客户信息管理里面的个人的详情getPersonForm
Mock.mock('/file/upload', upload) // upload
Mock.mock('/users/verify/company/submit', usersCompanySubmit) //  客户信息审核企业提交
Mock.mock('/users/verify/register/submit', usersRegisterSubmit) //  客户信息审核个人提交

Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success')
Mock.mock(/\/image\/upload/, uploadImage)
Mock.mock(/\/get_org_data/, getOrgData)
Mock.mock(/\/get_tree_select_data/, getTreeSelectData)

export default Mock
