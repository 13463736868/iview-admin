<template>
  <div class="_center pr">
    <spin-comp :spinShow="spinShow"></spin-comp>
    <Row class="pb20">
      <Col span="2" offset="21">
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
          <p><span class="_span">*</span><b>客户名称：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="addData.submitter" @on-change="resAction('change_user')">
            <Option v-for="item in addData.submiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor" v-if="addData.submitter !== null">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>客户案件类型：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="addData.caseTypeId">
            <Option v-for="item in addData.caseTypeList[addData.submitter]" :value="item.id" :key="item.id">{{ item.caseTypeName }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>分配单位：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="addData.companyId">
            <Option v-for="item in addData.companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import alertBtnInfo from '@/components/common-w/alertBtnInfo'
import { maCusList, maCusAdd, maCusDel, usersList, queryCompany } from '@/api/datas.js'

export default {
  name: 'casetype_set',
  components: { spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: false,
      caseList: {
        loading: false,
        header: [
          {
            title: '客户名称',
            key: 'customerName',
            align: 'center'
          },
          {
            title: '客户案件类型',
            key: 'casetypeName',
            align: 'center'
          },
          {
            title: '分配到',
            key: 'orgName',
            align: 'center'
          },
          {
            title: '操作人',
            key: 'masterName',
            align: 'center'
          },
          {
            title: '状态',
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
        submitter: null,
        submiList: [],
        caseTypeId: null,
        caseTypeList: [],
        companyId: null,
        companyList: []
      }
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
        }, '删除')
      ])
    },
    resCaseList () {
      this.spinShow = true
      maCusList({
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize
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
    resEditRole (index) {
      let _res = this.caseList.bodyList[index]
      this.addData.id = _res.id
      this.addData.submitter = _res.customerId
      this.addData.caseTypeId = _res.casetypeId
      this.addData.companyId = _res.orgId
      this.resAddRole('edit')
    },
    resAddRole (type) {
      if (type === 'add') {
        this.alertShow.type = 'add'
        this.alertShow.typeName = '添加'
      } else if (type === 'edit') {
        this.alertShow.type = 'edit'
        this.alertShow.typeName = '修改'
      }
      this.resAction('usersList')
    },
    addRoleSave () {
      if (this.addData.submitter === null) {
        this.resMessage('warning', '请选择客户名称')
      } else if (this.addData.caseTypeId === null) {
        this.resMessage('warning', '请选择客户合同类型')
      } else if (this.addData.companyId === null) {
        this.resMessage('warning', '请选择分配单位')
      } else {
        this.sendAjax('addRole')
      }
    },
    resAction (type) {
      switch (type) {
        case 'change_user':
          this.addData.caseTypeId = null
          break
        case 'usersList':
          queryCompany().then(res => {
            let listO = res.data.data
            let selectO = []
            for (let k in listO) {
              let _t = {}
              _t.value = listO[k].id
              _t.label = listO[k].orgName
              selectO.push(_t)
            }
            this.addData.companyList = selectO
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          usersList().then(res => {
            let _dataList = res.data.data
            this.addData.submiList = _dataList.map((a, b) => {
              let _o = {}
              _o.value = a.id
              _o.label = a.name
              this.addData.caseTypeList[a.id] = a.caseTypes
              return _o
            })
            this.alertShow.addShow = true
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
      }
    },
    sendAjax (type) {
      switch (type) {
        case 'addRole':
          maCusAdd({
            id: this.addData.id,
            customerId: this.addData.submitter,
            casetypeId: this.addData.caseTypeId,
            orgId: this.addData.companyId
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
          maCusAdd({
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
          maCusDel({
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
      }
    },
    alertCanc (type) {
      switch (type) {
        case 'addRole':
          this.alertShow.addShow = false
          this.addData.submitter = null
          this.addData.submiList = []
          this.addData.caseTypeId = null
          this.addData.caseTypeList = []
          this.addData.companyId = null
          this.addData.companyList = []
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
