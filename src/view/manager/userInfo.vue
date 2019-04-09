<template>
  <!-- <div>客户信息管理</div> -->
  <div class="userInfo pr">
    <spin-comp :spinShow="spinShow"></spin-comp>
    <Row>
      <Col span="2">
        <label class="lh32 f16 fc6 fr mr15">查询条件</label>
      </Col>
      <Col span="5">
        <Input v-model="search" icon="ios-search" placeholder class="_search hand" @on-click="resSearch" @keyup.enter.native="resSearch"></Input>
      </Col>
      <Col span="2" offset="14">
        <Button type="primary" @click="resAddUser()">添加客户</Button>
      </Col>
    </Row>
    <div class="_caseList clearfix">
      <Row>
        <Col span="24" class="pl20 pr20">
           <Tabs type="card" :animated="false" v-model="selectTag">
            <TabPane label="企业" name="company">
              <Col span="24" class="pr20">
                <Table border :columns="companyBodyList.headerList" :data="companyBodyList.companyList" stripe class="_caseList">
                  <template slot-scope="{ row, index }" slot="enabled">
                    <span v-text="row.enabled === 1 ? '启用' : '停用'"/></span>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <!-- <Button type="primary" class="mr5" size="small">删除</Button> -->
                    <Button type="primary" class="mr5" size="small" @click="editDetial(row)">编辑</Button>
                    <Button type="primary" class="mr5" size="small" @click="updateCompanyState(row)">{{row.enabled === 2 ? '启用' : '停用'}}</Button>
                  </template>
                </Table>
              </Col>
              <Col span="12" offset="6" class="tc">
                <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage"></Page>
              </Col>
            </TabPane>
            <TabPane label="个人" name="persona">
              <Col span="24" class="pr20">
                <Table border :columns="personaBodyList.personalList" :data="personaBodyList.customerList" stripe class="_caseList">
                  <template slot-scope="{ row, index }" slot="sex">
                    <span v-text="row.sex == 1 ? '男' : '女'"/></span>
                  </template>
                  <template slot-scope="{ row, index }" slot="enabled">
                    <span v-text="row.enabled === 1 ? '启用' : '停用'"/></span>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <!-- <Button type="primary" class="mr5" size="small">删除</Button> -->
                    <Button type="primary" class="mr5" size="small" @click="editDetial(row)">编辑</Button>
                    <Button type="primary" class="mr5" size="small" @click="updateUserState(row)">{{row.enabled === 2 ? '启用' : '停用'}}</Button>
                  </template>
                </Table>
              </Col>
              <Col span="12" offset="6" class="tc">
                <Page :total="pageObj1.total" :current="pageObj1.pageNum" :page-size="pageObj1.pageSize" show-elevator show-total @on-change="reschangePage1"></Page>
              </Col>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <Modal v-model="stopdialogFlag" @on-ok="stopOrRuning" draggable scrollable title="提醒">
        <div>确定停用?</div>
      </Modal>
      <Modal v-model="RunningdialogFlag" @on-ok="stopOrRuning" draggable scrollable title="提醒">
        <div>确定启用?</div>
      </Modal>
    </div>
    <userInfo-Dialog @childByValue="childByValuefad" :selectTag='selectTag' :thisRow="thisRow" :dialogType="dialogType" v-if="showDialog"></userInfo-Dialog>
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import userInfoDialog from '@/view/manager/children/userInfoDialog'
import { getCompanyList, getCustomerList, companyUpdateState, userUpdateState } from '@/api/contrace.js'
export default {
  components: { spinComp, userInfoDialog },
  name: 'userInfo',
  data () {
    return {
      spinShow: false,
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      pageObj1: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      RunningdialogFlag: false,
      stopdialogFlag: false,
      thisRow: {},
      showDialog: false,
      selectTag: 'company',
      // customerList: [],
      // companyList: [],
      search: '',
      personaBodyList: {
        personalList: [
          {
            title: '客户姓名',
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
          }, {
            title: '性别',
            slot: 'sex',
            maxWidth: 80,
            align: 'center'
          },
          {
            title: '联系电话',
            key: 'phone',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '联系地址',
            key: 'address',
            tooltip: 'true',
            minWidth: 20,
            align: 'center'
          },
          {
            title: '可用状态',
            slot: 'enabled',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            minWidth: 80,
            align: 'center'
          }
        ],
        customerList: []
      },
      companyBodyList: {
        headerList: [
          {
            title: '客户名称',
            key: 'name',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '证照类型',
            key: 'codeType',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '证件编号',
            key: 'code',
            tooltip: 'true',
            align: 'center'
          }, {
            title: '法定代表人',
            key: 'legal',
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
            minWidth: 20,
            align: 'center'
          },
          {
            title: '联系电话',
            key: 'phone',
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
            align: 'center',
            tooltip: 'true'
          },
          {
            title: '可用状态',
            slot: 'enabled',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            minWidth: 80,
            align: 'center'
          }
        ],
        companyList: []
      },
      // personalList: [
      //   {
      //     title: '客户姓名',
      //     key: 'name',
      //     tooltip: 'true',
      //     align: 'center'
      //   },
      //   {
      //     title: '证件类型',
      //     key: 'idcardTypeDesc',
      //     tooltip: 'true',
      //     align: 'center'
      //   },
      //   {
      //     title: '证件号码',
      //     key: 'idcard',
      //     tooltip: 'true',
      //     align: 'center'
      //   }, {
      //     title: '性别',
      //     slot: 'sex',
      //     maxWidth: 80,
      //     align: 'center'
      //   },
      //   {
      //     title: '联系电话',
      //     key: 'phone',
      //     tooltip: 'true',
      //     align: 'center'
      //   },
      //   {
      //     title: '联系地址',
      //     key: 'address',
      //     tooltip: 'true',
      //     minWidth: 20,
      //     align: 'center'
      //   },
      //   {
      //     title: '可用状态',
      //     slot: 'enabled',
      //     align: 'center'
      //   },
      //   {
      //     title: '操作',
      //     slot: 'action',
      //     minWidth: 80,
      //     align: 'center'
      //   }
      // ],
      // headerList: [
      //   {
      //     title: '客户名称',
      //     key: 'name',
      //     tooltip: 'true',
      //     align: 'center'
      //   },
      //   {
      //     title: '证照类型',
      //     key: 'codeType',
      //     tooltip: 'true',
      //     align: 'center'
      //   },
      //   {
      //     title: '证件编号',
      //     key: 'code',
      //     tooltip: 'true',
      //     align: 'center'
      //   }, {
      //     title: '法定代表人',
      //     key: 'legal',
      //     align: 'center'
      //   },
      //   {
      //     title: '法人证件',
      //     key: 'idcardTypeDesc',
      //     tooltip: 'true',
      //     align: 'center'
      //   },
      //   {
      //     title: '法人证件号',
      //     key: 'idcard',
      //     tooltip: 'true',
      //     minWidth: 20,
      //     align: 'center'
      //   },
      //   {
      //     title: '联系电话',
      //     key: 'phone',
      //     tooltip: 'true',
      //     align: 'center'
      //   },
      //   {
      //     title: '邮箱',
      //     key: 'email',
      //     tooltip: 'true',
      //     align: 'center'
      //   },
      //   {
      //     title: '公司地址',
      //     key: 'address',
      //     align: 'center',
      //     tooltip: 'true'
      //   },
      //   {
      //     title: '可用状态',
      //     slot: 'enabled',
      //     align: 'center'
      //   },
      //   {
      //     title: '操作',
      //     slot: 'action',
      //     minWidth: 80,
      //     align: 'center'
      //   }
      // ],
      updateCompanyEnabled: {},
      updateCustomEnabled: {}
    }
  },
  created () {
    this.getCompanyTableList()
    this.getCustomerTableList()
  },
  methods: {
    // 个人列表
    reschangePage1 (page) {
      this.pageObj1.pageNum = page
      this.getCustomerTableList()
    },
    // 企业列表
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.getCompanyTableList()
    },
    stopOrRuning () {
      if (this.selectTag === 'company') {
        companyUpdateState({
          id: this.updateCompanyEnabled.id,
          enabled: this.updateCompanyEnabled.enabled
        }).then(res => {
          this.resMessage('success', '操作成功')
          this.getCompanyTableList()
          this.getCustomerTableList()
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      } else {
        userUpdateState({
          id: this.updateCustomEnabled.id,
          enabled: this.updateCustomEnabled.enabled
        }).then(res => {
          this.resMessage('success', '操作成功')
          this.getCompanyTableList()
          this.getCustomerTableList()
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      }
    },
    // 信息提示
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    // 启用（停用）个人状态
    updateUserState (index) {
      if (index.enabled === 1) {
        this.stopdialogFlag = true
        this.updateCustomEnabled.id = index.id
        this.updateCustomEnabled.enabled = 2
      } else {
        this.RunningdialogFlag = true
        this.updateCustomEnabled.id = index.id
        this.updateCustomEnabled.enabled = 1
      }
      //
    },
    // 启用（停用）企业状态
    updateCompanyState (index) {
      if (index.enabled === 1) {
        this.stopdialogFlag = true
        this.updateCompanyEnabled.id = index.id
        this.updateCompanyEnabled.enabled = 2
      } else {
        this.RunningdialogFlag = true
        this.updateCompanyEnabled.id = index.id
        this.updateCompanyEnabled.enabled = 1
      }
    },
    // 编辑
    editDetial (row) {
      this.thisRow = row
      this.showDialog = true
      this.dialogType = '客户编辑'
    },
    childByValuefad (data) {
      this.showDialog = data
    },
    // 获取个人列表
    getCustomerTableList () {
      this.spinShow = true
      getCustomerList({
        name: this.search, // 企业名称/法人姓名
        enabled: '', // 1.启用 2.停用
        pageNum: this.pageObj1.pageNum,
        pageSize: this.pageObj1.pageSize
      }).then(res => {
        this.spinShow = false
        this.personaBodyList.customerList = res.data.data.dataList
        this.pageObj1 = {
          total: res.data.data.totalCount
        }
        this.search = ''
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    // 获取企业列表
    getCompanyTableList () {
      this.spinShow = true
      getCompanyList({
        name: this.search, // 企业名称/法人姓名
        enabled: '', // 1.启用 2.停用
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize
      }).then(res => {
        this.spinShow = false
        this.companyBodyList.companyList = res.data.data.dataList
        this.pageObj = {
          total: res.data.data.totalCount
        }
        this.search = ''
      }).catch(e => {
        this.spinShow = false
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    // 搜索
    resSearch () {
      this.getCompanyTableList()
      this.getCustomerTableList()
    },
    // 添加
    resAddUser () {
      this.showDialog = true
      this.thisRow = {}
      this.dialogType = '添加客户'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.userInfo {
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

  // .mr5{margin-right:5px;}
  // ._labelFor {
  //   margin-bottom: 10px;
  //   p {
  //     padding: 7px 0;
  //   }
  //   ._span {
  //     color: #ff7a7a;
  //   }
}
</style>
