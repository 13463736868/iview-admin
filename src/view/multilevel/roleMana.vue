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
      <Col span="2" offset="15">
        <Button type="primary" @click="resAddRole('add')">添加</Button>
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
    <alert-btn-info :alertShow="alertShow.addShow" @alertConfirm="addRoleSave" @alertCancel="alertCanc('addRole')" :alertTitle="alertShow.typeName">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>角色名称：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="addData.name"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>角色编码：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="addData.code"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>角色描述：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="addData.content"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>角色类型：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="addData.type">
            <Option v-for="item in roleTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>角色状态：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="addData.state">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.stateShow" @alertConfirm="sendAjax('state')" @alertCancel="alertCanc('state')" alertTitle="操作">
      <p v-if="alertShow.stateCode === 2">确定要停用吗？</p>
      <p v-else-if="alertShow.stateCode === 1">确定要启用吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.deleShow" @alertConfirm="sendAjax('dele')" @alertCancel="alertCanc('dele')" alertTitle="操作">
      <p>确定要删除吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.funcShow" @alertConfirm="sendAjax('func')" @alertCancel="alertCanc('func')" alertTitle="权限设置">
      <Tree :data="alertShow.funcData" show-checkbox ref="funcTree"></Tree>
    </alert-btn-info>
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import alertBtnInfo from '@/components/common-w/alertBtnInfo'
import { maRoleList, maRoleAdd, maRoleDelete, maRoleRoleFunc } from '@/api/datas.js'
// import setRegExp from '@/config/regExp.js'

export default {
  name: 'roleMana',
  components: { spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: false,
      search: {
        text: ''
      },
      caseList: {
        loading: false,
        header: [
          {
            title: '角色名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '角色编码',
            key: 'code',
            align: 'center'
          },
          {
            title: '角色描述',
            key: 'content',
            align: 'center'
          },
          {
            title: '角色类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.type === '1' ? '超级管理员' : (params.row.type === '2' ? '管理员' : (params.row.type === '3' ? '员工' : '未知')))
            }
          },
          {
            title: '角色状态',
            key: 'state',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.state === 1 ? '启用' : (params.row.state === 2 ? '停用' : '未知'))
            }
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
        deleShow: false,
        funcShow: false,
        funcIds: [],
        funcData: [],
        roleId: null
      },
      addData: {
        id: 0,
        name: '',
        code: '',
        content: '',
        state: null,
        type: null
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
      roleTypeList: [
        {
          value: '1',
          label: '超级管理员'
        },
        {
          value: '2',
          label: '管理员'
        },
        {
          value: '3',
          label: '员工'
        }
      ]
    }
  },
  created () {
    this.resCaseList()
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
              this.resStatusRole((_obj.state === 1 ? 2 : 1), params.index)
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
              this.resEditRole(params.index)
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
              this.resDeletRole(params.index)
            }
          }
        }, '删除'),
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
              this.resSeeRoleFunc(params.index)
            }
          }
        }, '权限设置')
      ])
    },
    resCaseList () {
      this.spinShow = true
      maRoleList({
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize,
        name: this.search.text
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
    resStatusRole (state, index) {
      this.alertShow.stateCode = state
      this.alertShow.roleId = this.caseList.bodyList[index].id
      this.alertShow.stateShow = true
    },
    resDeletRole (index) {
      this.alertShow.roleId = this.caseList.bodyList[index].id
      this.alertShow.deleShow = true
    },
    resSeeRoleFunc (index) {
      this.alertShow.roleId = this.caseList.bodyList[index].id
      this.sendAjax('seeFunc')
    },
    resEditRole (index) {
      let _res = this.caseList.bodyList[index]
      this.addData.id = _res.id
      this.addData.name = _res.name
      this.addData.code = _res.code
      this.addData.content = _res.content
      this.addData.state = _res.state
      this.addData.type = _res.type
      this.resAddRole('edit')
    },
    resAddRole (type) {
      if (type === 'add') {
        this.alertShow.type = 'add'
        this.alertShow.typeName = '添加用户'
      } else if (type === 'edit') {
        this.alertShow.type = 'edit'
        this.alertShow.typeName = '修改用户'
      }
      this.alertShow.addShow = true
    },
    addRoleSave () {
      if (this.addData.name === '') {
        this.resMessage('warning', '角色名称不能为空')
      } else if (this.addData.type !== '1' && this.addData.type !== '2' && this.addData.type !== '3') {
        this.resMessage('warning', '请选择角色类型')
      } else if (this.addData.state !== 1 && this.addData.state !== 2) {
        this.resMessage('warning', '请选择角色状态')
      } else {
        this.sendAjax('addRole')
      }
    },
    sendAjax (type) {
      switch (type) {
        case 'addRole':
          maRoleAdd({
            id: this.addData.id,
            name: this.addData.name,
            code: this.addData.code,
            content: this.addData.content,
            state: this.addData.state,
            type: this.addData.type
          }).then(res => {
            this.alertCanc('addRole')
            this.resMessage('success', '操作成功')
            this.resCaseList()
          }).catch(e => {
            this.alertCanc('addRole')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'state':
          maRoleAdd({
            id: this.alertShow.roleId,
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
        case 'dele':
          maRoleDelete({
            id: this.alertShow.roleId
          }).then(res => {
            this.alertCanc('dele')
            this.resMessage('success', '操作成功')
            this.resCaseList()
          }).catch(e => {
            this.alertCanc('dele')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'seeFunc':
          maRoleRoleFunc({
            roleId: this.alertShow.roleId
          }).then(res => {
            let _data = res.data.data.treeNode
            if (_data !== null) {
              let _arr = []
              _arr.push(_data)
              this.alertShow.funcData = _arr
              this.alertShow.funcShow = true
            }
          }).catch(e => {
            this.alertCanc('func')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'func':
          let _idsArr = this.$refs.funcTree.getCheckedAndIndeterminateNodes()
          _idsArr.forEach((item, id) => {
            this.alertShow.funcIds.push(item.id)
          })
          this.sendAjax('funcIds')
          break
        case 'funcIds':
          maRoleAdd({
            id: this.alertShow.roleId,
            functionIds: this.alertShow.funcIds.join(',')
          }).then(res => {
            this.alertCanc('func')
            this.resMessage('success', '操作成功')
            this.resCaseList()
          }).catch(e => {
            this.alertCanc('func')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
      }
    },
    alertCanc (type) {
      switch (type) {
        case 'addRole':
          this.alertShow.addShow = false
          this.addData = {
            id: 0,
            name: '',
            code: '',
            content: '',
            state: null,
            type: null
          }
          this.alertShow.type = ''
          this.alertShow.typeName = ''
          break
        case 'state':
          this.alertShow.stateShow = false
          this.alertShow.roleId = null
          this.alertShow.stateCode = null
          break
        case 'dele':
          this.alertShow.deleShow = false
          this.alertShow.roleId = null
          break
        case 'func':
          this.alertShow.funcShow = false
          this.alertShow.roleId = null
          this.alertShow.funcIds = []
          this.alertShow.funcData = []
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
