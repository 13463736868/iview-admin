export const getDictiComp = req => {
  return {
    flag: true,
    data: [
      {
        id: 1026,
        item: '0-99',
        itemValue: 1,
        state: 1
      },
      {
        id: 1026,
        item: '100-299',
        itemValue: 2,
        state: 1
      },
      {
        id: 1026,
        item: '300-499',
        itemValue: 3,
        state: 1
      },
      {
        id: 1026,
        item: '500-999',
        itemValue: 4,
        state: 1
      },
      {
        id: 1026,
        item: '1000以上',
        itemValue: 5,
        state: 1
      }
    ],
    code: '000000',
    message: '成功'
  }
}

export const getDictiTrad = req => {
  return {
    flag: true,
    data: [
      {
        id: 1030,
        item: '互联网',
        itemValue: 1,
        state: 1
      },
      {
        id: 1030,
        item: '金融',
        itemValue: 2,
        state: 1
      },
      {
        id: 1030,
        item: '贸易',
        itemValue: 3,
        state: 1
      },
      {
        id: 1030,
        item: '医疗',
        itemValue: 4,
        state: 1
      }
    ],
    code: '000000',
    message: '成功'
  }
}

export const getDictiEnte = req => {
  return {
    flag: true,
    data: [
      {
        id: 1026,
        item: '营业执照',
        itemValue: 1,
        state: 1
      }
    ],
    code: '000000',
    message: '成功'
  }
}

export const getDictiPers = req => {
  return {
    flag: true,
    data: [
      {
        id: 1044,
        item: '身份证',
        itemValue: 1,
        state: 1
      },
      {
        id: 1046,
        item: '户口簿',
        itemValue: 3,
        state: 1
      }
    ],
    code: '000000',
    message: '成功'
  }
}

export const getMaUserList = req => {
  return {
    flag: true,
    data: {
      pageIndex: 1,
      startIndex: null,
      pageSize: 10,
      totalCount: 2,
      dataList: [
        {
          id: 2,
          userName: 'test',
          password: '5a2e54ee57e5b7273b9a8fed78c1ebd8',
          name: '管理员',
          tel: '15811022365',
          createUser: 1,
          ismaster: 1,
          state: 2,
          roleId: 2,
          companyId: 2,
          deptId: 5,
          createTime: '2019-03-13 18:09:06',
          companyName: '北京凡预科技有限公司',
          deptName: '技术部',
          createUserName: '管理员',
          roleName: '管理员',
          roleType: null
        },
        {
          id: 1,
          userName: 'admin',
          password: 'b9d11b3be25f5a1a7dc8ca04cd310b28',
          name: '管理员',
          tel: '15811022365',
          createUser: 0,
          ismaster: 1,
          state: 1,
          roleId: 1,
          companyId: 2,
          deptId: 5,
          createTime: '2019-03-13 17:57:22',
          companyName: '北京凡预科技有限公司',
          deptName: '技术部',
          createUserName: null,
          roleName: '超级管理员',
          roleType: null
        }
      ]
    },
    code: '000000',
    message: null
  }
}

export const getMaUserAdd = req => {
  return {
    flag: true,
    data: 1,
    code: '000000',
    message: '成功'
  }
}

export const getMaUserDelete = req => {
  return {
    flag: true,
    data: 1,
    code: '000000',
    message: '成功'
  }
}

export const getMaRoleList = req => {
  return {
    flag: true,
    data: {
      pageIndex: 1,
      startIndex: null,
      pageSize: 10,
      totalCount: 2,
      dataList: [
        {
          id: 3,
          name: '员工',
          code: 'EMPLOEE',
          content: '员工',
          type: '3',
          state: 1,
          createUser: 0,
          createTime: '2019-03-13 17:16:40'
        },
        {
          id: 2,
          name: '管理员',
          code: 'MANAGER',
          content: '管理员',
          type: '2',
          state: 1,
          createUser: 0,
          createTime: '2019-03-13 17:15:59'
        },
        {
          id: 1,
          name: '超级管理员',
          code: 'SUPERMANAGER',
          content: '超级管理员',
          type: '1',
          state: 1,
          createUser: 0,
          createTime: '2019-03-13 17:15:34'
        }
      ]
    },
    code: '000000',
    message: null
  }
}

export const getMaRolequeryAll = req => {
  return {
    flag: true,
    data: [
      {
        id: 3,
        name: '员工',
        code: 'EMPLOEE',
        content: '员工',
        type: '3',
        state: 1,
        createUser: 0,
        createTime: '2019-03-13 17:16:40'
      },
      {
        id: 2,
        name: '管理员',
        code: 'MANAGER',
        content: '管理员',
        type: '2',
        state: 1,
        createUser: 0,
        createTime: '2019-03-13 17:15:59'
      },
      {
        id: 1,
        name: '超级管理员',
        code: 'SUPERMANAGER',
        content: '超级管理员',
        type: '1',
        state: 1,
        createUser: 0,
        createTime: '2019-03-13 17:15:34'
      }
    ],
    code: '000000',
    message: '成功'
  }
}

export const getMaRoleDelete = req => {
  return {
    flag: true,
    data: 1,
    code: '000000',
    message: '成功'
  }
}

export const getMaRoleRoleFunc = req => {
  return {
    flag: true,
    data: {
      id: '10000',
      title: '根节点',
      expand: true,
      children: [
        {
          id: '11000',
          title: '案件管理',
          expand: true,
          children: [
            {
              id: '11100',
              title: '待审核案件',
              expand: true,
              children: [
                {
                  id: '11110',
                  title: '查看',
                  checked: true
                },
                {
                  id: '11120',
                  title: '审核',
                  checked: false
                },
                {
                  id: '11130',
                  title: '移送',
                  checked: false
                }
              ]
            },
            {
              id: '11200',
              title: '已审核案件',
              expand: true,
              children: [
                {
                  id: '11210',
                  title: '查看',
                  checked: true
                },
                {
                  id: '11220',
                  title: '审核',
                  checked: false
                },
                {
                  id: '11230',
                  title: '移送',
                  checked: false
                }
              ]
            },
            {
              id: '11300',
              title: '已移送案件',
              expand: true,
              children: [
                {
                  id: '11310',
                  title: '查看',
                  checked: true
                },
                {
                  id: '11320',
                  title: '审核',
                  checked: false
                },
                {
                  id: '11330',
                  title: '移送',
                  checked: false
                }
              ]
            },
            {
              id: '11400',
              title: '全部案件',
              expand: true,
              children: [
                {
                  id: '11410',
                  title: '查看',
                  checked: true
                },
                {
                  id: '11420',
                  title: '审核',
                  checked: false
                },
                {
                  id: '11430',
                  title: '移送',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          id: '12000',
          title: '系统管理',
          expand: true,
          children: [
            {
              id: '12100',
              title: '组织机构管理',
              expand: true,
              children: [
                {
                  id: '12110',
                  title: '查看',
                  checked: true
                }
              ]
            },
            {
              id: '12200',
              title: '权限管理',
              expand: true,
              children: [
                {
                  id: '12220',
                  title: '查看',
                  checked: true
                }
              ]
            },
            {
              id: '12300',
              title: '角色管理',
              expand: true,
              children: [
                {
                  id: '12310',
                  title: '查看',
                  checked: true
                },
                {
                  id: '12320',
                  title: '修改',
                  checked: true
                },
                {
                  id: '12330',
                  title: '停用/启用',
                  checked: false
                },
                {
                  id: '12340',
                  title: '删除',
                  checked: false
                },
                {
                  id: '12350',
                  title: '权限设置',
                  checked: false
                }
              ]
            },
            {
              id: '12400',
              title: '用户管理',
              expand: true,
              children: [
                {
                  id: '12410',
                  title: '查看',
                  checked: true
                },
                {
                  id: '12420',
                  title: '修改',
                  checked: true
                },
                {
                  id: '12430',
                  title: '停用/启用',
                  checked: false
                },
                {
                  id: '12440',
                  title: '重置密码',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          id: '13000',
          title: '合同类型管理',
          expand: true,
          children: [
            {
              id: '13100',
              title: '查看',
              checked: true
            },
            {
              id: '13200',
              title: '修改',
              checked: true
            },
            {
              id: '13300',
              title: '停用/启用',
              checked: false
            }
          ]
        },
        {
          id: '14000',
          title: '客户信息管理',
          expand: true,
          children: [
            {
              id: '14100',
              title: '查看',
              checked: true
            },
            {
              id: '14200',
              title: '修改',
              checked: true
            },
            {
              id: '14300',
              title: '停用/启用',
              checked: false
            }
          ]
        },
        {
          id: '15000',
          title: '仲裁委信息管理',
          expand: true,
          children: [
            {
              id: '14100',
              title: '查看',
              checked: true
            },
            {
              id: '14200',
              title: '修改',
              checked: true
            },
            {
              id: '14300',
              title: '停用/启用',
              checked: false
            }
          ]
        },
        {
          id: '16000',
          title: '客户信息审核管理',
          expand: true,
          children: [
            {
              id: '14100',
              title: '查看',
              checked: true
            },
            {
              id: '14200',
              title: '修改',
              checked: true
            },
            {
              id: '14300',
              title: '停用/启用',
              checked: false
            }
          ]
        }
      ]
    },
    code: '000000',
    message: '成功'
  }
}

export const getQueryCompany = req => {
  return {
    flag: true,
    data: [
      {
        id: 3,
        orgName: '测试律所',
        shortName: '律所',
        pid: 1,
        state: 1,
        level: 2,
        code: 'test',
        address: '北京',
        trade: '行业',
        scale: '规模',
        contacts: '张某',
        legal: '张天纬',
        idcardType: '1',
        idcard: '130210198006263215',
        email: 'zhangtianwei@fanyuzeli.com',
        phone: '01066521120',
        type: 1,
        levelCode: null,
        createTime: '2019-03-13 16:35:58',
        sort: '01'
      },
      {
        id: 2,
        orgName: '北京凡预科技有限公司',
        shortName: '凡预科技',
        pid: 1,
        state: 1,
        level: 2,
        code: 'test',
        address: '北京',
        trade: '行业',
        scale: '规模',
        contacts: '张某',
        legal: '张天纬',
        idcardType: '1',
        idcard: '130210198006263215',
        email: 'zhangtianwei@fanyuzeli.com',
        phone: '01066521120',
        type: 1,
        levelCode: null,
        createTime: '2019-03-13 16:35:24',
        sort: '01'
      }
    ],
    code: '000000',
    message: '成功'
  }
}

export const getQueryDeptBy = req => {
  return {
    flag: true,
    data: [
      {
        id: 4,
        orgName: '法务部',
        shortName: null,
        pid: 2,
        state: 1,
        level: 3,
        code: 'test',
        address: null,
        trade: null,
        scale: null,
        contacts: null,
        legal: null,
        idcardType: null,
        idcard: null,
        email: null,
        phone: null,
        type: 2,
        levelCode: null,
        createTime: '2019-03-13 16:37:22',
        sort: null
      },
      {
        id: 5,
        orgName: '技术部',
        shortName: null,
        pid: 2,
        state: 1,
        level: 3,
        code: 'test',
        address: null,
        trade: null,
        scale: null,
        contacts: null,
        legal: null,
        idcardType: null,
        idcard: null,
        email: null,
        phone: null,
        type: 2,
        levelCode: null,
        createTime: '2019-03-13 16:37:46',
        sort: null
      },
      {
        id: 6,
        orgName: '行政部',
        shortName: null,
        pid: 2,
        state: 1,
        level: 3,
        code: 'test',
        address: null,
        trade: null,
        scale: null,
        contacts: null,
        legal: null,
        idcardType: null,
        idcard: null,
        email: null,
        phone: null,
        type: 2,
        levelCode: null,
        createTime: '2019-03-13 16:37:57',
        sort: null
      }
    ],
    code: '000000',
    message: '成功'
  }
}

export const getMaOrgTreeList = req => {
  return {
    flag: true,
    data: {
      id: '10000',
      pid: '1',
      title: '凡预智能法务运营管理平台',
      expand: true,
      type: 0,
      children: [
        {
          id: '11000',
          pid: '10000',
          title: '北京凡预科技有限公司',
          expand: true,
          type: 1,
          children: [
            {
              id: '11100',
              pid: '11000',
              title: '技术部',
              expand: true,
              type: 2,
              children: [
                {
                  id: '11110',
                  pid: '11100',
                  title: '管理员',
                  checked: true,
                  type: 3
                },
                {
                  id: '11120',
                  pid: '11100',
                  title: '员工',
                  checked: false,
                  type: 4
                },
                {
                  id: '11130',
                  pid: '11100',
                  title: '员工',
                  checked: false,
                  type: 4
                }
              ]
            },
            {
              id: '11200',
              pid: '11000',
              title: '法务部',
              type: 2,
              expand: true
            }
          ]
        },
        {
          id: '12000',
          pid: '10000',
          title: '北京律师事务所',
          type: 1,
          expand: true,
          children: [
            {
              id: '12100',
              pid: '12000',
              title: '法务部',
              type: 2,
              expand: true,
              children: [
                {
                  id: '12110',
                  pid: '12100',
                  title: '管理员',
                  checked: true,
                  type: 3
                }
              ]
            },
            {
              id: '12200',
              pid: '12000',
              title: '技术部',
              type: 2,
              expand: true,
              children: [
                {
                  id: '12210',
                  pid: '12200',
                  title: '管理员',
                  checked: true,
                  type: 3
                }
              ]
            }
          ]
        }
      ]
    },
    code: '000000',
    message: '成功'
  }
}

export const getMaOrgTreeQuer = req => {
  return {
    flag: true,
    data: {
      id: 4,
      orgName: '法务部',
      shortName: '简称',
      pid: 2,
      state: 1,
      level: 3,
      code: 'test',
      address: '地址',
      trade: null,
      scale: null,
      contacts: null,
      legal: null,
      idcardType: null,
      idcard: null,
      email: '13464647474@163.com',
      phone: '13456565656',
      type: 2,
      levelCode: null,
      createTime: '2019-03-13 16:37:22',
      sort: null
    },
    code: '000000',
    message: '成功'
  }
}

export const getMaFuncTreeList = req => {
  return {
    flag: true,
    data: {
      id: '10000',
      title: '根节点',
      expand: true,
      children: [
        {
          id: '11000',
          title: '案件管理',
          expand: true,
          children: [
            {
              id: '11100',
              title: '待审核案件',
              expand: true,
              children: [
                {
                  id: '11110',
                  title: '查看',
                  checked: true
                },
                {
                  id: '11120',
                  title: '审核',
                  checked: false
                },
                {
                  id: '11130',
                  title: '移送',
                  checked: false
                }
              ]
            },
            {
              id: '11200',
              title: '已审核案件',
              expand: true,
              children: [
                {
                  id: '11210',
                  title: '查看',
                  checked: true
                },
                {
                  id: '11220',
                  title: '审核',
                  checked: false
                },
                {
                  id: '11230',
                  title: '移送',
                  checked: false
                }
              ]
            },
            {
              id: '11300',
              title: '已移送案件',
              expand: true,
              children: [
                {
                  id: '11310',
                  title: '查看',
                  checked: true
                },
                {
                  id: '11320',
                  title: '审核',
                  checked: false
                },
                {
                  id: '11330',
                  title: '移送',
                  checked: false
                }
              ]
            },
            {
              id: '11400',
              title: '全部案件',
              expand: true,
              children: [
                {
                  id: '11410',
                  title: '查看',
                  checked: true
                },
                {
                  id: '11420',
                  title: '审核',
                  checked: false
                },
                {
                  id: '11430',
                  title: '移送',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          id: '12000',
          title: '系统管理',
          expand: true,
          children: [
            {
              id: '12100',
              title: '组织机构管理',
              expand: true,
              children: [
                {
                  id: '12110',
                  title: '查看',
                  checked: true
                }
              ]
            },
            {
              id: '12200',
              title: '权限管理',
              expand: true,
              children: [
                {
                  id: '12220',
                  title: '查看',
                  checked: true
                }
              ]
            },
            {
              id: '12300',
              title: '角色管理',
              expand: true,
              children: [
                {
                  id: '12310',
                  title: '查看',
                  checked: true
                },
                {
                  id: '12320',
                  title: '修改',
                  checked: true
                },
                {
                  id: '12330',
                  title: '停用/启用',
                  checked: false
                },
                {
                  id: '12340',
                  title: '删除',
                  checked: false
                },
                {
                  id: '12350',
                  title: '权限设置',
                  checked: false
                }
              ]
            },
            {
              id: '12400',
              title: '用户管理',
              expand: true,
              children: [
                {
                  id: '12410',
                  title: '查看',
                  checked: true
                },
                {
                  id: '12420',
                  title: '修改',
                  checked: true
                },
                {
                  id: '12430',
                  title: '停用/启用',
                  checked: false
                },
                {
                  id: '12440',
                  title: '重置密码',
                  checked: false
                }
              ]
            }
          ]
        },
        {
          id: '13000',
          title: '合同类型管理',
          expand: true,
          children: [
            {
              id: '13100',
              title: '查看',
              checked: true
            },
            {
              id: '13200',
              title: '修改',
              checked: true
            },
            {
              id: '13300',
              title: '停用/启用',
              checked: false
            }
          ]
        },
        {
          id: '14000',
          title: '客户信息管理',
          expand: true,
          children: [
            {
              id: '14100',
              title: '查看',
              checked: true
            },
            {
              id: '14200',
              title: '修改',
              checked: true
            },
            {
              id: '14300',
              title: '停用/启用',
              checked: false
            }
          ]
        },
        {
          id: '15000',
          title: '仲裁委信息管理',
          expand: true,
          children: [
            {
              id: '14100',
              title: '查看',
              checked: true
            },
            {
              id: '14200',
              title: '修改',
              checked: true
            },
            {
              id: '14300',
              title: '停用/启用',
              checked: false
            }
          ]
        },
        {
          id: '16000',
          title: '客户信息审核管理',
          expand: true,
          children: [
            {
              id: '14100',
              title: '查看',
              checked: true
            },
            {
              id: '14200',
              title: '修改',
              checked: true
            },
            {
              id: '14300',
              title: '停用/启用',
              checked: false
            }
          ]
        }
      ]
    },
    code: '000000',
    message: '成功'
  }
}

export const getMaOrgDele = req => {
  return {
    flag: true,
    data: 1,
    code: '000000',
    message: '成功'
  }
}

export const getCaseFind = req => {
  return {
    flag: true,
    data: {
      pageIndex: 1,
      startIndex: null,
      pageSize: 10,
      totalCount: 2,
      dataList: [
        {
          caseCode: '20019-01号',
          submitter: '凡预科技有限公司',
          proxyName: null,
          userName: null,
          managerName: '管理员',
          casesStatus: '全部',
          contractTypeId: 3,
          arbitrationId: 3,
          submitTime: '2019-03-19 15:55:27',
          money: 0,
          respondentName: '',
          transferArbitration: '邯郸仲裁委员会',
          id: '7796254471814672384',
          state: 0,
          showButtonState: '1',
          contractTypeName: '借贷合同',
          applicationName: '凡预科技'
        },
        {
          caseCode: '20019-02号',
          submitter: '凡预科技有限公司',
          proxyName: null,
          userName: null,
          managerName: null,
          casesStatus: '全部',
          contractTypeId: null,
          arbitrationId: null,
          submitTime: '2019-03-19 15:55:27',
          money: 0,
          respondentName: '测试企业',
          transferArbitration: null,
          id: '77962544823060992',
          state: 0,
          showButtonState: '2',
          contractTypeName: null,
          applicationName: '凡预科技'
        },
        {
          caseCode: '20019-01号',
          submitter: '凡预科技有限公司',
          proxyName: null,
          userName: null,
          managerName: null,
          casesStatus: '全部',
          contractTypeId: null,
          arbitrationId: null,
          submitTime: '2019-03-19 15:55:27',
          money: 0,
          respondentName: '测试企业',
          transferArbitration: null,
          id: '7796471823060992',
          state: 0,
          showButtonState: '3',
          contractTypeName: null,
          applicationName: '凡预科技'
        },
        {
          caseCode: '20019-01号',
          submitter: '凡预科技有限公司',
          proxyName: null,
          userName: null,
          managerName: null,
          casesStatus: '全部',
          contractTypeId: null,
          arbitrationId: null,
          submitTime: '2019-03-19 15:55:27',
          money: 0,
          respondentName: '测试企业',
          transferArbitration: null,
          id: '7796254471823992',
          state: 0,
          showButtonState: '3',
          contractTypeName: null,
          applicationName: '凡预科技'
        },
        {
          caseCode: '20019-01号',
          submitter: '凡预科技有限公司',
          proxyName: null,
          userName: null,
          managerName: null,
          casesStatus: '全部',
          contractTypeId: null,
          arbitrationId: null,
          submitTime: '2019-03-19 15:55:27',
          money: 0,
          respondentName: '测试企业',
          transferArbitration: null,
          id: '77962544718230692',
          state: 0,
          showButtonState: '2',
          contractTypeName: null,
          applicationName: '凡预科技'
        }
      ]
    },
    code: '000000',
    message: '成功'
  }
}

export const getCaseDetails = req => {
  return {
    flag: true,
    data: 1,
    code: '000000',
    message: '成功'
  }
}
