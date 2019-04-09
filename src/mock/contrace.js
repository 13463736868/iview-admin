// const Mock = require('mockjs')
// const Random = Mock.Random
export const getTableList = req => {
  return {
    flag: true,
    data: {
      'pageIndex': 1,
      'startIndex': null,
      'pageSize': 10,
      'totalCount': 50, // 查询数据总条数
      'dataList': [{
        'id': 1, // 合同类型id
        'caseTypeCode': 'xxxxxxxxxxxxxxxx',
        'caseTypeName': '借贷合同类型',
        'createTime': '2019-03-12',
        'status': 2, // 1.启用 2.停用
        'userName': '北京有征科技有限公司',
        'arbName': '安阳仲裁委员会,盐城仲裁委员会'
      }, {
        'id': 2, // 合同类型id
        'caseTypeCode': 'xxxxxxxxxxxxxxxx',
        'caseTypeName': '借贷',
        'createTime': '2019-03-12',
        'status': 1, // 1.启用 2.停用
        'userName': '凡预科技有限公司',
        'arbName': '安阳仲裁委员会,盐城仲裁委员会'
      }, {
        'id': 3, // 合同类型id
        'caseTypeCode': 'xxxxxxxxxxxxxxxx',
        'caseTypeName': '贷合同',
        'createTime': '2019-03-12',
        'status': 1, // 1.启用 2.停用
        'userName': '凡预科技有限公司',
        'arbName': '安阳仲裁委员会,盐城仲裁委员会'
      }]
    },
    'code': '000000',
    'message': '成功！'
  }
}
// 获取合同类型管理--选择客户列表
export const getContractList = req => {
  return {
    flag: true,
    data: [{
      'id': 1,
      'name': '凡预科技有限公司',
      'userType': 2,
      'caseType': [{
        'id': 1,
        'userId': 1,
        'caseTypeCode': 'xxxxxxxxxxxxxxxx',
        'caseTypeName': '借贷合同类型',
        'createTime': '2019-03-12',
        'status': 1, // 1.启用 2.停用
        'remarks': null,
        'delFlag': 1 // 1.正常 2.删除
      },
      {
        'id': 2,
        'userId': 1,
        'caseTypeCode': 'xxxxxxxxxxxxxxxx',
        'caseTypeName': '借贷',
        'createTime': '2019-03-12',
        'status': 1, // 1.启用 2.停用
        'remarks': null,
        'delFlag': 1 // 1.正常 2.删除
      },
      {
        'id': 3,
        'userId': 1,
        'caseTypeCode': 'xxxxxxxxxxxxxxxx',
        'caseTypeName': '贷合同',
        'createTime': '2019-03-12',
        'status': 1, // 1.启用 2.停用
        'remarks': null,
        'delFlag': 1 // 1.正常 2.删除
      }
      ]
    },
    {
      'id': 2,
      'name': '北京有征科技有限公司',
      'userType': 2,
      'caseType': []
    }
    ],
    'code': '000000',
    'message': '成功！'
  }
}
// 选择仲裁委列表
export const getArbitrationList = req => {
  return {
    flag: true,
    data: {
      ArbitrationList: [{
        id: 1,
        name: '盐城仲裁委员会',
        state: 1
      }, {
        id: 2,
        name: '开封仲裁委员',
        state: 2
      },
      {
        id: 3,
        name: '郑州仲裁委员',
        state: 1
      },
      {
        id: 4,
        name: '运城仲裁委员',
        state: 2
      },
      {
        id: 5,
        name: '玉林仲裁委员',
        state: 1
      }
      ]
    },
    code: '000000',
    message: '成功'
  }
}
// 合同类型管理  选择客户列表
export const getUserList = req => {
  return {
    'flag': true,
    'data': [{
      'id': 1,
      'name': '北京凡预科技有限公司',
      'userType': 2,
      'caseType': [{
        'id': 1,
        'userId': 1,
        'caseTypeCode': 'xxxxxxxxxxxxxxxx',
        'caseTypeName': '借贷合同类型',
        'createTime': '2019-03-12',
        'status': 1, // 1.启用 2.停用
        'remarks': null,
        'delFlag': 1 // 1.正常 2.删除
      }]

    },
    {
      'id': 2,
      'name': '北京有征科技有限公司',
      'userType': 2,
      'caseType': []
    }, {
      'id': 3,
      'name': '北京凡预科技有限公司',
      'userType': 2,
      'caseType': [{
        'id': 1,
        'userId': 1,
        'caseTypeCode': 'xxxxxxxxxxxxxxxx',
        'caseTypeName': '合同类型',
        'createTime': '2019-03-12',
        'status': 1, // 1.启用 2.停用
        'remarks': null,
        'delFlag': 1 // 1.正常 2.删除
      }]

    }, {
      'id': 4,
      'name': '北京凡预科技有限公司',
      'userType': 2,
      'caseType': [{
        'id': 1,
        'userId': 1,
        'caseTypeCode': 'xxxxxxxxxxxxxxxx',
        'caseTypeName': '借贷合型',
        'createTime': '2019-03-12',
        'status': 1, // 1.启用 2.停用
        'remarks': null,
        'delFlag': 1 // 1.正常 2.删除
      }]

    }
    ],
    'code': '000000',
    'message': '成功！'
  }
}

// 仲裁委信息管理列表
export const getArbitration = req => {
  return {
    flag: true,
    data: {
      pageIndex: 1,
      startIndex: null,
      pageSize: 10,
      totalCount: 30, // 查询数据总条数
      dataList: [{
        id: 1, // 修改时必填
        name: '莱芜仲裁委员会',
        englishName: 'LaiWu Arbitration Commission',
        code: '440301103097413G09FC',
        telephone: '0634-5878177',
        address: '山东省莱芜市龙潭大街001号',
        email: 'laiwuzcw@163.com',
        linkman: '谢娜',
        accountNumber: '6214 8301 6034 5623',
        openingBank: '工商银行',
        baseUrl: '192.168.1.173:8081',
        state: 1,
        logoUrl: 'http://hbimg.b0.upaiyun.com/3e60fdcdb664d73db6ad3eb6d760ff46b02934321155b-eA3A2l_fw658'
      },
      {
        id: 2, // 修改时必填
        name: '许昌仲裁委员会',
        englishName: 'LaiWu Arbitration Commission',
        code: '440301103097413G09FC',
        telephone: '0634-5878177',
        address: '山东省莱芜市龙潭大街001号',
        email: 'laiwuzcw@163.com',
        linkman: '谢娜',
        accountNumber: '6214 8301 6034 5623',
        openingBank: '工商银行',
        baseUrl: '192.168.1.173:8081',
        state: 1,
        logoUrl: 'http://d.hiphotos.baidu.com/image/pic/item/6c224f4a20a4462372e426bf9222720e0df3d7c5.jpg'
      },
      {
        id: 3, // 修改时必填
        name: '莱芜员会',
        englishName: 'LaiWu Arbitration Commission',
        code: '440301103097413G09FC',
        telephone: '0634-5878177',
        address: '山东省莱芜市龙潭大街001号',
        email: 'laiwuzcw@163.com',
        linkman: '谢娜',
        accountNumber: '6214 8301 6034 5623',
        openingBank: '工商银行',
        baseUrl: '192.168.1.173:8081',
        state: 2,
        logoUrl: 'http://b-ssl.duitang.com/uploads/item/201603/20/20160320150740_5JLCB.jpeg'
      }, {
        id: 4, // 修改时必填
        name: '仲裁委员会',
        englishName: 'LaiWu Arbitration Commission',
        code: '440301103097413G09FC',
        telephone: '0634-5878177',
        address: '山东省莱芜市龙潭大街001号',
        email: 'laiwuzcw@163.com',
        linkman: '谢娜',
        accountNumber: '6214 8301 6034 5623',
        openingBank: '工商银行',
        baseUrl: '192.168.1.173:8081',
        state: 1,
        logoUrl: 'http://f.hiphotos.baidu.com/image/pic/item/a1ec08fa513d26971cb8de975ffbb2fb4216d895.jpg'
      }
      ]
    },
    code: '000000',
    message: '成功！'

  }
}

export const upload = res => {
  return {
    'flag': true,
    'data': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=818644313,1048211921&fm=26&gp=0.jpg',
    'code': '000000',
    'message': '上传成功！'
  }
}

// 客户信息审核企业提交
export const usersCompanySubmit = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '成功！'
  }
}

// 客户信息审核个人提交
export const usersRegisterSubmit = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '成功！'
  }
}

// 客户信息管理停用个人状态
export const userUpdateState = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '成功！'
  }
}
// 客户信息管理停用企业状态
export const companyUpdateState = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '成功！'
  }
}
// 删除合同类型
export const getdetail = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '成功！'
  }
}
// 添加合同
export const addContrace = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '添加成功！'
  }
}
// 修改合同
export const editContr = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '修改成功！'
  }
}
// 修改仲裁委状态
export const stopArbitration = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '成功！'
  }
}
// arbAdd添加仲裁委信息
export const arbAdd = res => {
  return {
    'flag': true,
    'data': '1',
    'code': '000000',
    'message': '添加成功'
  }
}

// arbAdd修改仲裁委信息
export const arbEdit = res => {
  return {
    'flag': true,
    'data': '1',
    'code': '000000',
    'message': '修改成功'
  }
}
// 客户信息审核状态类型approve
export const dictionaryApprove = res => {
  return {
    'flag': true,
    'data': [{
      name: 'tongg',
      id: 1
    }, {
      name: 'wg',
      id: 2
    }, {
      name: 'dsh',
      id: 3
    }, {
      name: 'qb',
      id: 4
    }],
    'code': '000000',
    'message': '成功'
  }
}

// usersVerifyCustomList客户信息审核--列表(个人)
export const usersVerifyCustom = res => {
  return {
    'flag': true,
    'data': {
      'pageIndex': 1,
      'startIndex': null,
      'pageSize': 10,
      'totalCount': 20, // 查询数据总条数
      'dataList': [{
        'registerId': 1, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 2, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 2,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 3, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 4, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 1,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 1, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 2, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 2,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 3, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 1, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 2, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 2,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 3, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 1, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 2, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 2,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'registerId': 3, // 个人信息id
        'userName': '凡预科技公司',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'sex': 1,
        'sexDesc': '男',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      } ]
    },
    'code': '000000',
    'message': '成功'
  }
}
// usersVerifyCompany客户信息审核--列表(企业)
export const usersVerifyCompany = res => {
  return {
    'flag': true,
    'data': {
      'pageIndex': 1,
      'startIndex': null,
      'pageSize': 10,
      'totalCount': 30, // 查询数据总条数
      'dataList': [{
        'companyId': 1, // 企业信息id
        'userName': '北京凡预科技有限公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '张纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 1,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 2, // 企业信息id
        'userName': '预科技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '张某', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 2,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 3, // 企业信息id
        'userName': '凡技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '某纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 4, // 企业信息id
        'userName': '凡技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '某纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 5, // 企业信息id
        'userName': '凡技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '某纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 6, // 企业信息id
        'userName': '凡技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '某纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 1, // 企业信息id
        'userName': '北京凡预科技有限公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '张纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 1,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 2, // 企业信息id
        'userName': '预科技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '张某', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 2,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 3, // 企业信息id
        'userName': '凡技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '某纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 4, // 企业信息id
        'userName': '凡技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '某纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 5, // 企业信息id
        'userName': '凡技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '某纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }, {
        'companyId': 6, // 企业信息id
        'userName': '凡技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'legal': '某纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'address': '北京市三元桥',
        'state': 3,
        'stateDesc': '审核中',
        'arbId': 1, // 仲裁委id
        'arbName': '仲裁委名称'
      }],
      'code': '000000',
      'message': '成功！'
    }
  }
}

// 个人证件类型
export const personIdcardType = res => {
  return {
    'flag': true,
    'data': [{
      id: 1,
      item: '身份证',
      itemGroup: 'personIdcardType',
      itemOrder: null,
      itemValue: 1,
      state: 1
    }, {
      id: 2,
      item: '户口簿',
      itemGroup: 'personIdcardType',
      itemOrder: null,
      itemValue: 3,
      state: 1
    }],
    'code': '000000',
    'message': '成功！'
  }
}

// 公司类型
export const tradeType = res => {
  return {
    'flag': true,
    'data': [{
      id: 1,
      item: '互联网',
      itemGroup: 'tradeType',
      itemOrder: null,
      itemValue: 1,
      state: 1
    }, {
      id: 2,
      item: '金融',
      itemGroup: 'tradeType',
      itemOrder: null,
      itemValue: 2,
      state: 1
    }, {
      id: 3,
      item: '贸易',
      itemGroup: 'tradeType',
      itemOrder: null,
      itemValue: 3,
      state: 1
    }, {
      id: 4,
      item: '医疗',
      itemGroup: 'tradeType',
      itemOrder: null,
      itemValue: 4,
      state: 1
    }],
    'code': '000000',
    'message': '成功！'
  }
}

// 公司人数
export const companyNumber = res => {
  return {
    'flag': true,
    'data': [{
      id: 1,
      item: '0-99',
      itemGroup: 'companyNumber',
      itemOrder: null,
      itemValue: 1,
      state: 1
    }, {
      id: 2,
      item: '100-299',
      itemGroup: 'companyNumber',
      itemOrder: null,
      itemValue: 2,
      state: 1
    }, {
      id: 3,
      item: '300-499',
      itemGroup: 'companyNumber',
      itemOrder: null,
      itemValue: 3,
      state: 1
    }, {
      id: 4,
      item: '500-999',
      itemGroup: 'companyNumber',
      itemOrder: null,
      itemValue: 4,
      state: 1
    }],
    'code': '000000',
    'message': '成功！'
  }
}

// 企业证件类型
export const priseIdcardType = res => {
  return {
    'flag': true,
    'data': [{
      id: 1,
      item: '营业执照',
      itemGroup: 'neterpriseIdcardType',
      itemOrder: null,
      itemValue: 1,
      state: 1
    }],
    'code': '000000',
    'message': '成功！'
  }
}
// updataContractState合同类型启用
export const updataContractState = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '成功！'
  }
}

// 获取客户信息管理里面的企业详情getCompanyForm
export const getCompanyForm = res => {
  return {
    'flag': true,
    'data': {
      'id': 1, // 企业信息id
      'name': '凡预科技公司',
      'loginName': 15102616735,
      'password': 123456,
      'codeType': '营业执照',
      'code': '459821316G51SD13SD',
      'address': '北京市三元桥',
      'trade': '1',
      'tradeDesc': '互联网',
      'scale': '1',
      'scaleDesc': ' 100-299 ',
      'contacts': '张某纬', // 联系人
      'legal': '张某纬', // 法人代表
      'idcardType': 1,
      'idcardTypeDesc': '身份证',
      'idcard ': '13042419900232564',
      'email': 'liujingshuai@fanyuzeli.com',
      'phone': '15102616735',
      'state': 0,
      'stateDesc': '审核中',
      'enabled': '有效',
      'fileList': [{ // 附件
        'id': 1003,
        'filename': '身份证正面.jpg',
        'filetype': null,
        'filepath': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1969688993,975250318&fm=11&gp=0.jpg'
      },
      {
        'id': 1004,
        'filename': '身份证反面.jpg',
        'filetype': null,
        'filepath': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1969688993,975250318&fm=11&gp=0.jpg'
      }, { // 附件
        'id': 1005,
        'filename': '身正面.jpg',
        'filetype': null,
        'filepath': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1969688993,975250318&fm=11&gp=0.jpg'
      },
      {
        'id': 1006,
        'filename': '反面.jpg',
        'filetype': null,
        'filepath': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1969688993,975250318&fm=11&gp=0.jpg'
      }
      ]
    },
    'code': '000000',
    'message': '成功！'
  }
}

// 获取客户信息管理里面的个人详情getCompanyForm
export const getPersonForm = res => {
  return {
    'flag': true,
    'data': {
      'id': 1, // 个人信息id
      'userid': 1001, // 用户id
      'name': '张三',
      'loginName': 15102616735,
      'password': 123456,
      'idcardType': 1,
      'idcardTypeDesc': '身份证',
      'idcard ': '13042419900232564',
      'birthday': '1990-02-23',
      'sex': 1,
      'address': '北京市通州区张家湾镇太玉园西区',
      'state': 0,
      'stateDesc': '审核中',
      'email': 'liujingshuai@fanyuzeli.com',
      'phone': '15102616735',
      'enabled': '有效',
      'fileList': [{ // 附件
        'id': 1003,
        'filename': '身份证正面.jpg',
        'filetype': null,
        'filepath': '192.168.1.134:8082/register-system/proposer/20180801/2be7d3e567674a7fb552e6d2be7958dd'
      },
      {
        'id': 1004,
        'filename': '身份证反面.jpg',
        'filetype': null,
        'filepath': '192.168.1.134:8082/register-system/proposer/20180801/f17d2329520c4a30a3c0a72c5110da66'
      }
      ]
    },
    'code': '000000',
    'message': '成功！'
  }
}

export const deleteArbitration = res => {
  return {
    'flag': true,
    'data': 1,
    'code': '000000',
    'message': '删除成功！'
  }
}
// getCustomerUserList

// 获取客户信息管理里面的企业列表
export const getCompanyList = res => {
  return {
    'flag': true,
    'data': {
      'pageIndex': 1,
      'startIndex': null,
      'pageSize': 10,
      'totalCount': 30, // 查询数据总条数
      'dataList': [{
        'id': 1, // 企业信息id
        'name': '凡预科技公司',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'address': '北京市三元桥',
        'trade': '1',
        'tradeDesc': '互联网',
        'scale': '1',
        'scaleDesc': '100-299',
        'contacts': '张某纬', // 联系人
        'legal': '张某纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'email': 'liujingshuai@fanyuzeli.com',
        'phone': '15102616735',
        'state': 1,
        'stateDesc': '审核中',
        'enabled': 1,
        'fileList': [] // 附件
      }, {
        'id': 2, // 企业信息id
        'name': '凡预科',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'address': '北京市三元桥',
        'trade': '1',
        'tradeDesc': '互联网',
        'scale': '1',
        'scaleDesc': ' 100-299 ',
        'contacts': '张纬', // 联系人
        'legal': '张纬', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'email': 'liujingshuai@fanyuzeli.com',
        'phone': '15102616735',
        'state': 2,
        'stateDesc': '审核中',
        'enabled': 2,
        'fileList': [] // 附件
      }, {
        'id': 3, // 企业信息id
        'name': '邮政',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'address': '北京市三元桥',
        'trade': '1',
        'tradeDesc': '互联网',
        'scale': '1',
        'scaleDesc': ' 100-299 ',
        'contacts': 'zhon', // 联系人
        'legal': '中过', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'email': 'liujingshuai@fanyuzeli.com',
        'phone': '15102616735',
        'state': 1,
        'stateDesc': '审核中',
        'enabled': 1,
        'fileList': [] // 附件
      }, {
        'id': 4, // 企业信息id
        'name': '邮政科技',
        'codeType': '营业执照',
        'code': '459821316G51SD13SD',
        'address': '北京市三元桥',
        'trade': '1',
        'tradeDesc': '互联网',
        'scale': '1',
        'scaleDesc': ' 100-299 ',
        'contacts': '连接', // 联系人
        'legal': '连接处', // 法人代表
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'email': 'liujingshuai@fanyuzeli.com',
        'phone': '15102616735',
        'state': 1,
        'stateDesc': '审核中',
        'enabled': 1,
        'fileList': [] // 附件
      }]
    },
    'code': '000000',
    'message': '成功！'
  }
}

// 获取客户信息管理里面的个人列表
export const getCustomerList = res => {
  return {
    'flag': true,
    'data': {
      'pageIndex': 1,
      'startIndex': null,
      'pageSize': 10,
      'totalCount': 20, // 查询数据总条数
      'dataList': [{
        'id': 1, // 个人信息id
        'userid': 1001, // 用户id
        'name': '张三',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'birthday': '1990-02-23',
        'sex': 1,
        'address': '北京市通州区张家湾镇太玉园西区',
        'state': 0,
        'stateDesc': '审核中',
        'email': 'liujingshuai@fanyuzeli.com',
        'phone': '15102616735',
        'enabled': 1,
        'fileList': [] // 附件
      }, {
        'id': 2, // 个人信息id
        'userid': 1001, // 用户id
        'name': '李四',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'birthday': '1990-02-23',
        'sex': 1,
        'address': '北京市通州区张家湾镇太玉园西区',
        'state': 1,
        'stateDesc': '审核中',
        'email': 'liujingshuai@fanyuzeli.com',
        'phone': '15102616735',
        'enabled': '2',
        'fileList': [] // 附件
      },
      {
        'id': 3, // 个人信息id
        'userid': 1001, // 用户id
        'name': '王五',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'birthday': '1990-02-23',
        'sex': 1,
        'address': '北京市通州区张家湾镇太玉园西区',
        'state': 2,
        'stateDesc': '审核中',
        'email': 'liujingshuai@fanyuzeli.com',
        'phone': '15102616735',
        'enabled': 2,
        'fileList': [] // 附件
      },
      {
        'id': 4, // 个人信息id
        'userid': 1001, // 用户id
        'name': '张柳',
        'idcardType': 1,
        'idcardTypeDesc': '身份证',
        'idcard': '13042419900232564',
        'birthday': '1990-02-23',
        'sex': 1,
        'address': '北京市通州区张家湾镇太玉园西区',
        'state': 1,
        'stateDesc': '审核中',
        'email': 'liujingshuai@fanyuzeli.com',
        'phone': '15102616735',
        'enabled': 1,
        'fileList': [] // 附件
      }
      ]
    },
    'code': '000000',
    'message': '成功！'
  }
}

export const getLoadData = res => {
  return {
    'flag': true,
    'data': {
      'url': 'http://img4.imgtn.bdimg.com/it/u=977868084,1668476980&fm=26&gp=0.jpg',
      'flag': true,
      'data': '1',
      'code': '000000',
      'message': '成功'
    }
  }
}
