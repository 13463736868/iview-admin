<template>
  <div class="_center pr">
    <spin-comp :spinShow="spinShow"></spin-comp>
    <Row>
      <Col span="2">
        <label class="lh32 f16 fc6 fr mr15">搜索</label>
      </Col>
      <Col span="5">
        <Input v-model="search.text" icon="ios-search" placeholder="" class="_search hand" @on-click="resSearch" @keyup.enter.native="resSearch"></Input>
      </Col>
      <Col span="2" offset="4">
        <label class="lh32 f16 fc6 fr mr15">选择单位</label>
      </Col>
      <Col span="3">
        <Select v-model="search.orgId" @on-change="resSearch">
          <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="2" offset="6">
        <Button type="primary" @click="resAddUser('add')">添加</Button>
      </Col>
    </Row>
    <div class="_caseList clearfix">
      <Row>
        <Col span="24" class="pl20 pr20">
          <Table stripe border align="center" :loading="caseList.loading" :columns="caseList.header" :data="caseList.bodyList"></Table>
        </Col>
      </Row>
    </div>
    <div class="_page clearfix">
      <Row>
        <Col span="12" offset="6" class="tc">
          <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage"></Page>
        </Col>
      </Row>
    </div>
    <alert-btn-info :alertShow="alertShow.addShow" @alertConfirm="addUserSave" @alertCancel="alertCanc('addUser')" :alertTitle="alertShow.typeName">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>用户名称：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="addData.userName"></Input>
        </Col>
      </Row>
      <Row class="_labelFor" v-if="alertShow.type === 'add'">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>登陆密码：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="addData.password"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>姓名：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="addData.name"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>电话号码：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="addData.tel"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>用户状态：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="addData.state">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>单位：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="addData.companyId" @on-change="resCompChange">
            <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>部门：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="addData.deptId">
            <Option v-for="item in deptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor" v-if="addData.roleId !== 1">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>角色：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="addData.roleId">
            <Option v-if="item.label !== '超级管理员'" v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.stateShow" @alertConfirm="sendAjax('state')" @alertCancel="alertCanc('state')" alertTitle="操作">
      <p v-if="alertShow.stateCode === 2">确定要停用吗？</p>
      <p v-else-if="alertShow.stateCode === 1">确定要启用吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.resetShow" @alertConfirm="sendAjax('reset')" @alertCancel="alertCanc('reset')" alertTitle="操作">
      <p>确定要重置密码吗？</p>
    </alert-btn-info>
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import alertBtnInfo from '@/components/common-w/alertBtnInfo'
import { maUserList, maUserAdd, maUserDelete, maRolequeryAll, queryCompany, queryDeptBy } from '@/api/datas.js'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'userMana',
  components: { spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: false,
      search: {
        text: '',
        orgId: ''
      },
      caseList: {
        loading: false,
        header: [
          {
            title: '用户名',
            key: 'userName',
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '角色名称',
            key: 'roleName',
            align: 'center'
          },
          {
            title: '所属单位',
            key: 'companyName',
            align: 'center'
          },
          {
            title: '所属部门',
            key: 'deptName',
            align: 'center'
          },
          {
            title: '用户状态',
            key: 'state',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.state === 1 ? '启用' : (params.row.state === 2 ? '停用' : '未知'))
            }
          },
          {
            title: '创建人',
            key: 'createUserName',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '操作',
            key: 'id',
            minWidth: 90,
            align: 'center',
            render: (h, params) => {
              return this.renderBtn(h, params)
            }
          }
        ],
        bodyList: []
      },
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      alertShow: {
        addShow: false,
        type: '',
        typeName: '',
        stateShow: false,
        stateCode: null,
        resetShow: false,
        userId: null,
        orgId: null
      },
      addData: {
        id: 0,
        userName: '',
        password: '',
        name: '',
        tel: '',
        state: 1,
        roleId: null,
        companyId: null,
        deptId: null
      },
      stateList: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 2,
          label: '停用'
        }
      ],
      roleList: [],
      companyList: [],
      deptList: []
    }
  },
  created () {
    this.resCaseList()
    this.sendAjax('getCompList')
  },
  methods: {
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    renderBtn (h, params) {
      let _obj = params.row
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              this.resStatusUser((_obj.state === 1 ? 2 : 1), params.index)
            }
          }
        }, _obj.state === 1 ? '停用' : (_obj.state === 2 ? '启用' : '未知')),
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              this.resEditUser(params.index)
            }
          }
        }, '修改'),
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              this.resResetUser(params.index)
            }
          }
        }, '重置密码')
      ])
    },
    resCaseList () {
      this.spinShow = true
      maUserList({
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize,
        name: this.search.text,
        orgId: this.search.orgId
      }).then(res => {
        let _data = res.data.data
        this.caseList.bodyList = _data.dataList === null ? [] : _data.dataList
        this.pageObj.total = _data.totalCount
        this.spinShow = false
      }).catch(e => {
        this.spinShow = false
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    resSearch () {
      this.pageObj.pageNum = 1
      this.resCaseList()
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resCaseList()
    },
    resStatusUser (state, index) {
      this.alertShow.stateCode = state
      this.alertShow.userId = this.caseList.bodyList[index].id
      this.alertShow.stateShow = true
    },
    resResetUser (index) {
      this.alertShow.userId = this.caseList.bodyList[index].id
      this.alertShow.resetShow = true
    },
    resCompChange (id) {
      this.alertShow.orgId = id
      this.addData.deptId = null
      this.deptList = []
      this.sendAjax('getDeptId')
    },
    resEditUser (index) {
      let _res = this.caseList.bodyList[index]
      this.addData.id = _res.id
      this.addData.userName = _res.userName
      this.addData.password = _res.password
      this.addData.name = _res.name
      this.addData.tel = _res.tel
      this.addData.state = _res.state
      this.addData.state = _res.state
      this.addData.roleId = _res.roleId
      this.addData.companyId = _res.companyId
      this.addData.deptId = _res.deptId
      this.resAddUser('edit')
    },
    resAddUser (type) {
      if (type === 'add') {
        this.alertShow.type = 'add'
        this.alertShow.typeName = '添加用户'
        Promise.all([maRolequeryAll()]).then(res => {
          let listO = res[0].data.data
          let selectO = []
          for (let k in listO) {
            let _o = {}
            _o.value = listO[k].id
            _o.label = listO[k].name
            selectO.push(_o)
          }
          this.roleList = selectO
          this.alertShow.addShow = true
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      } else if (type === 'edit') {
        this.alertShow.type = 'edit'
        this.alertShow.typeName = '修改用户'
        Promise.all([maRolequeryAll(), queryDeptBy({ orgId: this.addData.companyId })]).then(res => {
          let listO = res[0].data.data
          let listT = res[1].data.data
          let selectO = []
          let selectT = []
          for (let k in listO) {
            let _o = {}
            _o.value = listO[k].id
            _o.label = listO[k].name
            selectO.push(_o)
          }
          for (let k in listT) {
            let _t = {}
            _t.value = listT[k].id
            _t.label = listT[k].orgName
            selectT.push(_t)
          }
          this.roleList = selectO
          this.deptList = selectT
          this.alertShow.addShow = true
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      }
    },
    addUserSave () {
      if (this.addData.userName === '') {
        this.resMessage('warning', '用户名称不能为空')
      } else if (this.addData.password === '') {
        this.resMessage('warning', '用户密码不能为空')
      } else if (this.alertShow.type === 'add' && !setRegExp(this.addData.password, 'password')) {
        this.resMessage('warning', '密码长度6~20位,只能包含数字,字母,下划线')
      } else if (!setRegExp(this.addData.name, 'name')) {
        this.resMessage('warning', '请输入正确姓名只能包含汉字')
      } else if (this.addData.tel === '') {
        this.resMessage('warning', '电话号码不能为空')
      } else if (!(setRegExp(this.addData.tel, 'phone') || setRegExp(this.addData.tel, 'landline'))) {
        this.resMessage('warning', '电话号码格式不正确')
      } else if (this.addData.state !== 1 && this.addData.state !== 2) {
        this.resMessage('warning', '请选择用户状态')
      } else if (this.addData.companyId === null) {
        this.resMessage('warning', '请选择单位')
      } else if (this.addData.deptId === null) {
        this.resMessage('warning', '请选择部门')
      } else if (this.addData.roleId === null) {
        this.resMessage('warning', '请选择角色')
      } else {
        this.sendAjax('addUser')
      }
    },
    sendAjax (type) {
      switch (type) {
        case 'addUser':
          maUserAdd({
            id: this.addData.id,
            userName: this.addData.userName,
            password: this.addData.password,
            name: this.addData.name,
            tel: this.addData.tel,
            state: this.addData.state,
            roleId: this.addData.roleId,
            companyId: this.addData.companyId,
            deptId: this.addData.deptId
          }).then(res => {
            this.alertCanc('addUser')
            this.resMessage('success', '操作成功')
            this.resCaseList()
          }).catch(e => {
            this.alertCanc('addUser')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'deleUser':
          maUserDelete({
            id: this.alertShow.userId
          }).then(res => {
            this.alertCanc('deleUser')
            this.resMessage('success', '操作成功')
            this.resCaseList()
          }).catch(e => {
            this.alertCanc('deleUser')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'state':
          maUserAdd({
            id: this.alertShow.userId,
            state: this.alertShow.stateCode
          }).then(res => {
            this.alertCanc('state')
            this.resMessage('success', '操作成功')
            this.resCaseList()
          }).catch(e => {
            this.alertCanc('state')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'reset':
          maUserAdd({
            id: this.alertShow.userId,
            password: '123456'
          }).then(res => {
            this.alertCanc('reset')
            this.resMessage('success', '操作成功')
            this.resCaseList()
          }).catch(e => {
            this.alertCanc('reset')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'getCompList':
          queryCompany().then(res => {
            let listO = res.data.data
            let selectO = []
            for (let k in listO) {
              let _t = {}
              _t.value = listO[k].id
              _t.label = listO[k].orgName
              selectO.push(_t)
            }
            this.companyList = selectO
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'getDeptId':
          queryDeptBy({
            orgId: this.alertShow.orgId
          }).then(res => {
            let listO = res.data.data
            let selectO = []
            for (let k in listO) {
              let _o = {}
              _o.value = listO[k].id
              _o.label = listO[k].orgName
              selectO.push(_o)
            }
            this.deptList = selectO
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
      }
    },
    alertCanc (type) {
      switch (type) {
        case 'addUser':
          this.alertShow.addShow = false
          this.addData = {
            id: 0,
            userName: '',
            password: '',
            name: '',
            tel: '',
            state: 1,
            roleId: null,
            companyId: null,
            deptId: null
          }
          this.alertShow.type = ''
          this.alertShow.typeName = ''
          this.alertShow.orgId = null
          this.roleList = []
          this.deptList = []
          break
        case 'deleUser':
          this.alertShow.deleShow = false
          this.alertShow.userId = null
          break
        case 'state':
          this.alertShow.stateShow = false
          this.alertShow.userId = null
          this.alertShow.stateCode = null
          break
        case 'reset':
          this.alertShow.resetShow = false
          this.alertShow.userId = null
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
._center {
  background: transparent;
  @include mw(1180px);
  @include bc;
  padding-top: 40px;
  ._search {
    max-width: 450px;
    margin-bottom: 20px;
  }
  ._caseList {
    margin-bottom: 20px;
  }
}
._labelFor {
  margin-bottom: 10px;
  p {
    padding: 7px 0;
  }
  ._span {
    color: #ff7a7a;
  }
}
</style>
