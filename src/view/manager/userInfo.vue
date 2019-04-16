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
      <Col span="2" offset="14">
        <Button type="primary" @click="resAddRole('add')">添加</Button>
      </Col>
    </Row>
    <Tabs type="card" v-model="search.type" class="pl20 pr20">
      <TabPane label="企业" name="company">
        <div class="_caseList clearfix">
          <Row>
            <Col span="24">
              <Table stripe border align="center" :loading="companyList.loading" :columns="companyList.header" :data="companyList.bodyList"></Table>
            </Col>
          </Row>
        </div>
        <div class="_page clearfix">
          <Row>
            <Col span="12" offset="6" class="tc">
              <Page :total="companyList.pageObj.total" :current="companyList.pageObj.pageNum" :page-size="companyList.pageObj.pageSize" show-elevator show-total @on-change="reschangePageC"></Page>
            </Col>
          </Row>
        </div>
      </TabPane>
      <TabPane label="个人" name="register">
        <div class="_caseList clearfix">
          <Row>
            <Col span="24">
              <Table stripe border align="center" :loading="registerList.loading" :columns="registerList.header" :data="registerList.bodyList"></Table>
            </Col>
          </Row>
        </div>
        <div class="_page clearfix">
          <Row>
            <Col span="12" offset="6" class="tc">
              <Page :total="registerList.pageObj.total" :current="registerList.pageObj.pageNum" :page-size="registerList.pageObj.pageSize" show-elevator show-total @on-change="reschangePageR"></Page>
            </Col>
          </Row>
        </div>
      </TabPane>
    </Tabs>
    <alert-btn-info :setWidth="860" :alertShow="alertShow.addShow" @alertConfirm="addRoleSave" @alertCancel="alertCanc('addRole')" :alertTitle="alertShow.typeName">
      <div v-if="search.type === 'company'">
        <Row class="_labelFor" v-if="alertShow.type === 'add'">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>登录名：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.loginName"></Input>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>密码：</b></p>
          </Col>
          <Col span="7">
            <Input v-model="addData.password" type="password"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>公司名称：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.name"></Input>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>公司代码：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.code" placeholder="请填写统一社会信用代码"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>公司行业：</b></p>
          </Col>
          <Col span="7">
            <Select v-model="addData.trade">
              <Option v-for="item in addData.tradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>公司人数：</b></p>
          </Col>
          <Col span="7">
            <Select v-model="addData.scale">
              <Option v-for="item in addData.scaleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>法人姓名：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.legal"></Input>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>证件类型：</b></p>
          </Col>
          <Col span="7">
            <Select v-model="addData.idcardType">
              <Option v-for="item in addData.idcardTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>证件号码：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.idcard"></Input>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>联系人：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.contacts"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>公司地址：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.address"></Input>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>联系邮箱：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.email"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>身份证正面：</b></p>
          </Col>
          <Col span="7">
            <upload-annex :fileType="['jpg','jpeg','png']" :uploadUrl="addData.uploadUrl" :infoData="addData.fileA" @saveClick="resFileA" @delClick="resDelFileA"></upload-annex>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>身份证反面：</b></p>
          </Col>
          <Col span="7">
            <upload-annex :fileType="['jpg','jpeg','png']" :uploadUrl="addData.uploadUrl" :infoData="addData.fileB" @saveClick="resFileB" @delClick="resDelFileB"></upload-annex>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>营业执照：</b></p>
          </Col>
          <Col span="7">
            <upload-annex :fileType="['jpg','jpeg','png']" :uploadUrl="addData.uploadUrl" :infoData="addData.fileC" @saveClick="resFileC" @delClick="resDelFileC"></upload-annex>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>授权委托书：</b></p>
          </Col>
          <Col span="7">
            <upload-annex :fileType="['pdf']" :isPdf="true" :uploadUrl="addData.uploadUrl" :infoData="addData.bookA" @saveClick="resBookA" @delClick="resDelBookA"></upload-annex>
          </Col>
        </Row>
      </div>
      <div v-else-if="search.type === 'register'">
        <Row class="_labelFor" v-if="alertShow.type === 'add'">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>登录名：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.loginName"></Input>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>密码：</b></p>
          </Col>
          <Col span="7">
            <Input v-model="addData.password" type="password"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>姓名：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.name"></Input>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>性别：</b></p>
          </Col>
          <Col span="7">
            <Select v-model="addData.sex">
              <Option v-for="item in addData.sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>证件类型：</b></p>
          </Col>
          <Col span="7">
            <Select v-model="addData.idcardType">
              <Option v-for="item in addData.idcardTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>证件号码：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.idcard"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>联系地址：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.address"></Input>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>联系邮箱：</b></p>
          </Col>
          <Col span="7">
            <Input v-model.trim="addData.email"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>身份证正面：</b></p>
          </Col>
          <Col span="7">
            <upload-annex :fileType="['jpg','jpeg','png']" :uploadUrl="addData.uploadUrl" :infoData="addData.fileA" @saveClick="resFileA" @delClick="resDelFileA"></upload-annex>
          </Col>
          <Col span="3" offset="2">
            <p><span class="_span">*</span><b>身份证反面：</b></p>
          </Col>
          <Col span="7">
            <upload-annex :fileType="['jpg','jpeg','png']" :uploadUrl="addData.uploadUrl" :infoData="addData.fileB" @saveClick="resFileB" @delClick="resDelFileB"></upload-annex>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="3" offset="1">
            <p><span class="_span">*</span><b>手持身份证：</b></p>
          </Col>
          <Col span="7">
            <upload-annex :fileType="['jpg','jpeg','png']" :uploadUrl="addData.uploadUrl" :infoData="addData.fileC" @saveClick="resFileC" @delClick="resDelFileC"></upload-annex>
          </Col>
        </Row>
      </div>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.stateShow" @alertConfirm="sendAjax(search.type + '_state')" @alertCancel="alertCanc('state')" alertTitle="操作">
      <p v-if="alertShow.stateCode === 2">确定要停用吗？</p>
      <p v-else-if="alertShow.stateCode === 1">确定要启用吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.passShow" @alertConfirm="resAction('update_password')" @alertCancel="alertCanc('update_password')" alertTitle="重设密码">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>输入密码：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="alertShow.password" type="password"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>再次输入密码：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="alertShow.passwords" type="password"></Input>
        </Col>
      </Row>
    </alert-btn-info>
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import alertBtnInfo from '@/components/common-w/alertBtnInfo'
import uploadAnnex from '@/components/common-w/uploadAnnex'
import { userCompList, userRegiList, userCompAdd, userRegiAdd, userCompState, userRegiState, userCompDeta, userRegiDeta, updatePass, dictionaryList } from '@/api/datas.js'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'user_info',
  components: { spinComp, alertBtnInfo, uploadAnnex },
  data () {
    return {
      spinShow: false,
      search: {
        text: '',
        type: 'company'
      },
      companyList: {
        loading: false,
        header: [
          {
            title: '客户名称',
            key: 'name',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '证件类型',
            key: 'codeType',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '证件号码',
            key: 'code',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '法定代表人',
            key: 'legal',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '法人证件',
            key: 'idcardTypeDesc',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '法人证件号',
            key: 'idcard',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '邮箱',
            key: 'email',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '公司地址',
            key: 'address',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '状态',
            key: 'state',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.enabled === 1 ? '启用' : (params.row.enabled === 2 ? '停用' : '未知'))
            }
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
        bodyList: [],
        pageObj: {
          total: 0,
          pageNum: 1,
          pageSize: 10
        }
      },
      registerList: {
        loading: false,
        header: [
          {
            title: '客户名称',
            key: 'name',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '证件类型',
            key: 'idcardTypeDesc',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '证件号码',
            key: 'idcard',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '性别',
            key: 'sexDesc',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '邮箱',
            key: 'email',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '联系地址',
            key: 'address',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '状态',
            key: 'state',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.enabled === 1 ? '启用' : (params.row.enabled === 2 ? '停用' : '未知'))
            }
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
        bodyList: [],
        pageObj: {
          total: 0,
          pageNum: 1,
          pageSize: 10
        }
      },
      alertShow: {
        addShow: false,
        type: '',
        typeName: '',
        stateShow: false,
        stateCode: null,
        userId: null,
        passShow: false,
        loginName: '',
        password: '',
        passwords: ''
      },
      addData: {
        id: null,
        name: '',
        loginName: '',
        password: '',
        code: '',
        address: '',
        trade: null,
        tradeList: [],
        scale: null,
        scaleList: [],
        contacts: '',
        legal: '',
        idcardType: null,
        idcardTypeList: [],
        idcard: '',
        email: '',
        authorizeBookId: '',
        fileIds: ['', '', ''],
        fileA: null,
        fileB: null,
        fileC: null,
        bookA: null,
        uploadUrl: '/file/uploadToObject',
        userid: 0,
        sex: null,
        sexList: [
          {
            value: 1,
            label: '男'
          },
          {
            value: 2,
            label: '女'
          }
        ],
        birthdayString: ''
      }
    }
  },
  created () {
    this.resCompanyList()
    this.resRegisterList()
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
              this.resStatusUser((_obj.enabled === 1 ? 2 : 1), params.index)
            }
          }
        }, _obj.enabled === 1 ? '停用' : (_obj.enabled === 2 ? '启用' : '未知')),
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
              this.resEditPass(params.index)
            }
          }
        }, '重置密码')
      ])
    },
    resCompanyList () {
      this.spinShow = true
      userCompList({
        name: this.search.text,
        enabled: '',
        pageNum: this.companyList.pageObj.pageNum,
        pageSize: this.companyList.pageObj.pageSize
      }).then(res => {
        let _data = res.data.data
        this.companyList.bodyList = _data.dataList === null ? [] : _data.dataList
        this.companyList.pageObj.total = _data.totalCount
        this.spinShow = false
      }).catch(e => {
        this.spinShow = false
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    resRegisterList () {
      this.spinShow = true
      userRegiList({
        name: this.search.text,
        enabled: '',
        pageNum: this.registerList.pageObj.pageNum,
        pageSize: this.registerList.pageObj.pageSize
      }).then(res => {
        let _data = res.data.data
        this.registerList.bodyList = _data.dataList === null ? [] : _data.dataList
        this.registerList.pageObj.total = _data.totalCount
        this.spinShow = false
      }).catch(e => {
        this.spinShow = false
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    resSearch (type) {
      if (type === 'comp') {
        this.companyList.pageObj.pageNum = 1
        this.resCompanyList()
      } else if (type === 'rige') {
        this.registerList.pageObj.pageNum = 1
        this.resRegisterList()
      } else {
        this.companyList.pageObj.pageNum = 1
        this.registerList.pageObj.pageNum = 1
        this.resCompanyList()
        this.resRegisterList()
      }
    },
    reschangePageC (page) {
      this.companyList.pageObj.pageNum = page
      this.resCompanyList()
    },
    reschangePageR (page) {
      this.registerList.pageObj.pageNum = page
      this.resRegisterList()
    },
    resStatusUser (state, index) {
      this.alertShow.stateCode = state
      if (this.search.type === 'company') {
        this.alertShow.userId = this.companyList.bodyList[index].userId
      } else if (this.search.type === 'register') {
        this.alertShow.userId = this.registerList.bodyList[index].userid
      } else {
        return false
      }
      this.alertShow.stateShow = true
    },
    resEditRole (index) {
      if (this.search.type === 'company') {
        this.addData.id = this.companyList.bodyList[index].id
        this.resAction('userCompDeta')
      } else if (this.search.type === 'register') {
        this.addData.id = this.registerList.bodyList[index].id
        this.resAction('userRegiDeta')
      } else {
        return false
      }
    },
    resAddRole (type) {
      if (type === 'add') {
        this.alertShow.type = 'add'
        this.alertShow.typeName = '添加'
      } else if (type === 'edit') {
        this.alertShow.type = 'edit'
        this.alertShow.typeName = '修改'
      }
      this.resAction('dictionary')
    },
    addRoleSave () {
      if (this.search.type === 'company') {
        if (this.alertShow.type === 'add' && this.addData.loginName === '') {
          this.resMessage('warning', '请填写登录名')
        } else if (this.alertShow.type === 'add' && !setRegExp(this.addData.loginName, 'phone')) {
          this.resMessage('warning', '请填写正确登录名,目前必须为手机号格式')
        } else if (this.alertShow.type === 'add' && this.addData.password === '') {
          this.resMessage('warning', '请填写登录密码')
        } else if (this.alertShow.type === 'add' && !setRegExp(this.addData.password, 'password')) {
          this.resMessage('warning', '请填写正确登录密码长度6~20位,只能包含数字,字母,下划线')
        } else if (this.addData.name === '') {
          this.resMessage('warning', '请填写公司名称')
        } else if (!setRegExp(this.addData.name, 'reject')) {
          this.resMessage('warning', '请填写正确公司名称格式')
        } else if (this.addData.code === '') {
          this.resMessage('warning', '请填写统一社会信用代码')
        } else if (!setRegExp(this.addData.code, 'entityNo1')) {
          this.resMessage('warning', '请填写正确统一社会信用代码格式')
        } else if (this.addData.trade === null) {
          this.resMessage('warning', '请选择公司行业')
        } else if (this.addData.scale === null) {
          this.resMessage('warning', '请选择公司人数')
        } else if (this.addData.legal === '') {
          this.resMessage('warning', '请填写法人姓名')
        } else if (!setRegExp(this.addData.legal, 'name')) {
          this.resMessage('warning', '请填写正确法人名字格式')
        } else if (this.addData.idcardType === null) {
          this.resMessage('warning', '请选择证件类型')
        } else if (this.addData.idcard === '') {
          this.resMessage('warning', '请填写证件号码')
        } else if (!setRegExp(this.addData.idcard, 'idcard')) {
          this.resMessage('warning', '请填写正确证件号码格式')
        } else if (this.addData.contacts === '') {
          this.resMessage('warning', '请填写联系人')
        } else if (!setRegExp(this.addData.contacts, 'name')) {
          this.resMessage('warning', '请填写正确联系人名字格式')
        } else if (this.addData.address === '') {
          this.resMessage('warning', '请填写公司地址')
        } else if (!setRegExp(this.addData.address, 'address')) {
          this.resMessage('warning', '请填写正确地址格式')
        } else if (this.addData.email === '') {
          this.resMessage('warning', '请填写联系邮箱')
        } else if (!setRegExp(this.addData.email, 'email')) {
          this.resMessage('warning', '请填写正确联系邮箱格式')
        } else if (this.addData.fileIds[0] === '') {
          this.resMessage('warning', '请上传身份证正面')
        } else if (this.addData.fileIds[1] === '') {
          this.resMessage('warning', '请上传身份证反面')
        } else if (this.addData.fileIds[2] === '') {
          this.resMessage('warning', '请上传营业执照')
        } else if (this.addData.authorizeBookId === '') {
          this.resMessage('warning', '授权委托书')
        } else {
          this.sendAjax(this.search.type + '_addRole')
        }
      } else if (this.search.type === 'register') {
        if (this.alertShow.type === 'add' && this.addData.loginName === '') {
          this.resMessage('warning', '请填写登录名')
        } else if (this.alertShow.type === 'add' && !setRegExp(this.addData.loginName, 'phone')) {
          this.resMessage('warning', '请填写正确登录名,目前必须为手机号格式')
        } else if (this.alertShow.type === 'add' && this.addData.password === '') {
          this.resMessage('warning', '请填写登录密码')
        } else if (this.alertShow.type === 'add' && !setRegExp(this.addData.password, 'password')) {
          this.resMessage('warning', '请填写正确登录密码长度6~20位,只能包含数字,字母,下划线')
        } else if (this.addData.name === '') {
          this.resMessage('warning', '请填写姓名')
        } else if (!setRegExp(this.addData.name, 'name')) {
          this.resMessage('warning', '请填写正确姓名格式')
        } else if (this.addData.sex === null) {
          this.resMessage('warning', '请选择性别')
        } else if (this.addData.idcardType === null) {
          this.resMessage('warning', '请选择证件类型')
        } else if (this.addData.idcard === '') {
          this.resMessage('warning', '请填写证件号码')
        } else if (!setRegExp(this.addData.idcard, 'idcard')) {
          this.resMessage('warning', '请填写正确证件号码格式')
        } else if (this.addData.address === '') {
          this.resMessage('warning', '请填写公司地址')
        } else if (!setRegExp(this.addData.address, 'address')) {
          this.resMessage('warning', '请填写正确地址格式')
        } else if (this.addData.email === '') {
          this.resMessage('warning', '请填写联系邮箱')
        } else if (!setRegExp(this.addData.email, 'email')) {
          this.resMessage('warning', '请填写正确联系邮箱格式')
        } else if (this.addData.fileIds[0] === '') {
          this.resMessage('warning', '请上传身份证正面')
        } else if (this.addData.fileIds[1] === '') {
          this.resMessage('warning', '请上传身份证反面')
        } else if (this.addData.fileIds[2] === '') {
          this.resMessage('warning', '请上传手持身份证')
        } else {
          this.sendAjax(this.search.type + '_addRole')
        }
      }
    },
    resDelFileA () {
      this.addData.fileIds[0] = this.addData.fileA === null ? '' : this.addData.fileA.id
    },
    resDelFileB () {
      this.addData.fileIds[1] = this.addData.fileB === null ? '' : this.addData.fileB.id
    },
    resDelFileC () {
      this.addData.fileIds[2] = this.addData.fileC === null ? '' : this.addData.fileC.id
    },
    resDelBookA () {
      this.addData.authorizeBookId = this.addData.bookA === null ? '' : this.addData.bookA.id
    },
    resFileA (fileObj) {
      this.addData.fileIds[0] = fileObj.id
    },
    resFileB (fileObj) {
      this.addData.fileIds[1] = fileObj.id
    },
    resFileC (fileObj) {
      this.addData.fileIds[2] = fileObj.id
    },
    resBookA (fileObj) {
      this.addData.authorizeBookId = fileObj.id
    },
    resEditPass (index) {
      if (this.search.type === 'company') {
        this.alertShow.loginName = this.companyList.bodyList[index].loginName
        this.alertShow.userId = this.companyList.bodyList[index].userId
        this.alertShow.passShow = true
      } else if (this.search.type === 'register') {
        this.alertShow.loginName = this.registerList.bodyList[index].loginName
        this.alertShow.userId = this.registerList.bodyList[index].userid
        this.alertShow.passShow = true
      } else {
        return false
      }
    },
    resAction (type) {
      switch (type) {
        case 'dictionary':
          Promise.all([dictionaryList({ type: 'companyNumber' }), dictionaryList({ type: 'tradeType' }), dictionaryList({ type: 'personIdcardType' })]).then(res => {
            let listO = res[0].data.data
            let listT = res[1].data.data
            let listH = res[2].data.data
            let selectO = []
            let selectT = []
            let selectH = []
            for (let k in listO) {
              let _o = {}
              _o.value = listO[k].itemValue
              _o.label = listO[k].item
              selectO.push(_o)
            }
            for (let k in listT) {
              let _t = {}
              _t.value = listT[k].itemValue
              _t.label = listT[k].item
              selectT.push(_t)
            }
            for (let k in listH) {
              let _z = {}
              _z.value = listH[k].itemValue
              _z.label = listH[k].item
              selectH.push(_z)
            }
            this.addData.scaleList = selectO
            this.addData.tradeList = selectT
            this.addData.idcardTypeList = selectH
            this.alertShow.addShow = true
          }).catch(e => {
            // this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'userCompDeta':
          userCompDeta({
            id: this.addData.id
          }).then(res => {
            let _obj = res.data.data
            this.addData.name = _obj.name
            this.addData.loginName = _obj.loginName
            this.addData.code = _obj.code
            this.addData.address = _obj.address
            this.addData.trade = _obj.trade - 0
            this.addData.scale = _obj.scale - 0
            this.addData.contacts = _obj.contacts
            this.addData.legal = _obj.legal
            this.addData.idcardType = _obj.idcardType
            this.addData.idcard = _obj.idcard
            this.addData.email = _obj.email
            this.addData.userId = _obj.userId
            this.addData.bookA = _obj.authorizeBook === undefined ? null : _obj.authorizeBook === null ? null : _obj.authorizeBook
            if (_obj.fileList.length > 0) {
              _obj.fileList.forEach((item, k) => {
                let _k = k === 0 ? 'fileA' : k === 1 ? 'fileB' : k === 2 ? 'fileC' : ''
                if (k > 2) {
                  return false
                }
                this.addData[_k] = item
                this.addData.fileIds[k] = item.id
              })
            }
            this.resAddRole('edit')
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'userRegiDeta':
          userRegiDeta({
            id: this.addData.id
          }).then(res => {
            let _obj = res.data.data
            this.addData.userid = _obj.userid
            this.addData.name = _obj.name
            this.addData.loginName = _obj.loginName
            this.addData.idcardType = _obj.idcardType
            this.addData.idcard = _obj.idcard
            this.addData.address = _obj.address
            this.addData.sex = _obj.sex
            this.addData.email = _obj.email
            if (_obj.fileList.length > 0) {
              _obj.fileList.forEach((item, k) => {
                let _k = k === 0 ? 'fileA' : k === 1 ? 'fileB' : k === 2 ? 'fileC' : ''
                if (k > 2) {
                  return false
                }
                this.addData[_k] = item
                this.addData.fileIds[k] = item.id
              })
            }
            this.resAddRole('edit')
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'update_password':
          if (this.alertShow.password === '') {
            this.resMessage('warning', '请填写登录密码')
          } else if (!setRegExp(this.alertShow.password, 'password')) {
            this.resMessage('warning', '请填写正确登录密码长度6~20位,只能包含数字,字母,下划线')
          } else if (this.alertShow.password !== this.alertShow.passwords) {
            this.resMessage('warning', '俩次填写的密码不一致')
          } else {
            this.sendAjax('update_password')
          }
          break
      }
    },
    sendAjax (type) {
      switch (type) {
        case 'update_password':
          updatePass({
            userId: this.alertShow.userId,
            loginName: this.alertShow.loginName,
            password: this.alertShow.password
          }).then(res => {
            this.alertCanc('update_password')
            this.resMessage('success', '操作成功')
          }).catch(e => {
            this.alertCanc('update_password')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'company_addRole':
          userCompAdd({
            id: this.addData.id,
            name: this.addData.name,
            loginName: this.addData.loginName,
            password: this.addData.password,
            code: this.addData.code,
            address: this.addData.address,
            trade: this.addData.trade,
            scale: this.addData.scale,
            contacts: this.addData.contacts,
            legal: this.addData.legal,
            idcardType: this.addData.idcardType,
            idcard: this.addData.idcard,
            email: this.addData.email,
            userId: this.addData.userId,
            authorizeBookId: this.addData.authorizeBookId,
            fileIds: this.addData.fileIds.join(',')
          }).then(res => {
            this.alertCanc('addRole')
            this.resMessage('success', '操作成功')
            this.resSearch('comp')
          }).catch(e => {
            this.alertCanc('addRole')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'register_addRole':
          userRegiAdd({
            id: this.addData.id,
            userid: this.addData.userid,
            name: this.addData.name,
            loginName: this.addData.loginName,
            password: this.addData.password,
            idcardType: this.addData.idcardType,
            idcard: this.addData.idcard,
            birthdayString: this.addData.idcard.substr(6, 4) + '-' + this.addData.idcard.substr(10, 2) + '-' + this.addData.idcard.substr(12, 2),
            address: this.addData.address,
            sex: this.addData.sex,
            email: this.addData.email,
            fileIds: this.addData.fileIds.join(',')
          }).then(res => {
            this.alertCanc('addRole')
            this.resMessage('success', '操作成功')
            this.resSearch('rige')
          }).catch(e => {
            this.alertCanc('addRole')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'company_state':
          userCompState({
            userid: this.alertShow.userId,
            enabled: this.alertShow.stateCode
          }).then(res => {
            this.alertCanc('state')
            this.resMessage('success', '操作成功')
            this.resSearch('comp')
          }).catch(e => {
            this.alertCanc('state')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'register_state':
          userRegiState({
            userid: this.alertShow.userId,
            enabled: this.alertShow.stateCode
          }).then(res => {
            this.alertCanc('state')
            this.resMessage('success', '操作成功')
            this.resSearch('rige')
          }).catch(e => {
            this.alertCanc('state')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
      }
    },
    alertCanc (type) {
      switch (type) {
        case 'update_password':
          this.alertShow.passShow = false
          this.alertShow.loginName = ''
          this.alertShow.password = ''
          this.alertShow.passwords = ''
          this.alertShow.userId = null
          break
        case 'addRole':
          this.alertShow.addShow = false
          this.addData = {
            id: null,
            name: '',
            loginName: '',
            password: '',
            code: '',
            address: '',
            trade: null,
            tradeList: [],
            scale: null,
            scaleList: [],
            contacts: '',
            legal: '',
            idcardType: null,
            idcardTypeList: [],
            idcard: '',
            email: '',
            authorizeBookId: '',
            fileIds: ['', '', ''],
            fileA: null,
            fileB: null,
            fileC: null,
            bookA: null,
            uploadUrl: '/file/uploadToObject',
            sex: null,
            sexList: [
              {
                value: 1,
                label: '男'
              },
              {
                value: 2,
                label: '女'
              }
            ],
            birthdayString: ''
          }
          break
        case 'state':
          this.alertShow.stateShow = false
          this.alertShow.userId = null
          this.alertShow.stateCode = null
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
