<template>
  <div class="userReview pr">
    <spin-comp :spinShow="spinShow"></spin-comp>
    <Row>
      <Col span="2">
        <label class="lh32 f16 fc6 fr mr15">查询条件</label>
      </Col>
      <Col span="5">
        <Input v-model="search" icon="ios-search" placeholder class="_search hand" @on-click="resSearch" @keyup.enter.native="resSearch"></Input>
      </Col>
      <Col span="2" offset="10">
        <label class="lh32 f16 fc6 fr mr15">案件状态：</label>
      </Col>
      <!-- <Col span="5"> -->
      <Col span="2">
        <Select v-model="screen" style="width:200px" @on-change="resSearch">
          <Option v-for="item in selectApprove" :value="item.itemValue" :key="item.id">{{ item.item }}</Option>
        </Select>
      </Col>
    </Row>
    <div class="_caseList clearfix">
      <Row>
        <Col span="24" class="pl20 pr20">
          <Tabs type="card" v-model="selectTag">
            <!-- 企业 -->
            <TabPane label="企业" name="company">
              <Col span="24" class="pr20">
                <Table border class="_caseList" :columns="companyList" :data="verifyCompanyList">
                  <!-- <template slot-scope="{ row, index }" slot="state">
                    <span v-text="row.state == '0' ? '全部' :row.state == '1' ?'通过':row.state == '2' ? '未通过':'待审核'"></span>
                  </template> -->
                  <template slot-scope="{ row, index }" slot="action">
                    <Button @click="showUserReviewDialog(row)" type="primary" class="mr5" size="small">详情</Button>
                    <Button type="primary" class="mr5" size="small" v-if="row.state == '3'" @click="companySubmit(row)">提交</Button>
                  </template>
                </Table>
              </Col>
              <Col span="12" offset="6" class="tc">
                <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage"></Page>
              </Col>
            </TabPane>

            <!-- 个人 -->
            <TabPane label="个人" name="person">
              <Col span="24" class="pr20">
                <Table border :columns="customList" class="_caseList" :data="usersVerifyCustomList">
                  <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" class="mr5" size="small" @click="showUserReviewCustomDialog(row)">详情</Button>
                    <Button type="primary" class="mr5" size="small" v-if="row.state == '3'" @click="registerSubmit(row)">提交</Button>
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
    </div>
    <Modal v-model="dialogFlag" @on-ok="succDialog" draggable scrollable title="提醒">
      <div>确定提交?</div>
    </Modal>
    <userReview-Dialog v-if="showUserReviewDia" @childByValue="childByValuefad" :rowDetial="rowDetial"></userReview-Dialog>
    <userReviewCustom-Dia v-if="showUserReviewCustomDia" @childbyValueCustom="childbyValueCustom" :customRowDetial="customRowDetial"></userReviewCustom-Dia>
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import userReviewDialog from '@/view/manager/children/userReviewDialog'
import userReviewCustomDia from '@/view/manager/children/userReviewCustomDil'
import {
  usersVerifyCompany,
  usersVerifyCustom,
  dictionaryApprove,
  usersRegisterSubmit,
  usersCompanySubmit
} from '@/api/contrace.js'
export default {
  components: {
    spinComp,
    userReviewDialog,
    userReviewCustomDia
  },
  name: 'userReview',
  data () {
    return {
      spinShow: false,
      selectTag: 'company',
      dialogFlag: false,
      customRowDetial: {}, // 详情时每行数据（个人）
      showUserReviewCustomDia: false,
      rowDetial: {}, // 详情时每行的数据（企业）
      showUserReviewDia: false,
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }, // 企业分页
      pageObj1: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }, // 个人分页
      selectApprove: [], // 筛选下拉框
      verifyCompanyList: [],
      usersVerifyCustomList: [],
      customList: [
        {
          title: '客户姓名',
          key: 'userName',
          tooltip: 'true',
          align: 'center'
          // minWidth:80
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
          align: 'center'
          // minWidth:20
        },
        {
          title: '联系地址',
          key: 'address',
          tooltip: 'true',
          align: 'center'
        },
        {
          title: '关联仲裁委',
          key: 'arbName',
          tooltip: 'true'
        },
        {
          title: '身份审核',
          key: 'stateDesc',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          minWidth: 80,
          align: 'center'
        }
      ], // 个人列表
      companyList: [
        {
          title: '客户名称',
          key: 'userName',
          tooltip: 'true',
          align: 'center'
          // minWidth:80
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
        },
        {
          title: '法定代表人',
          key: 'legal',
          align: 'center'
          // minWidth:20
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
        // {
        //   title: "联系电话",
        //   key: "phone",
        //   tooltip:"true",
        //   align: 'center'
        // },
        // {
        //   title: "邮箱",
        //   key: "email",
        //   tooltip:"true",
        //   align: 'center'
        // },
        {
          title: '公司地址',
          key: 'address',
          // align: 'center',
          tooltip: 'true',
          align: 'center'
        },
        {
          title: '关联仲裁委',
          key: 'arbName',
          tooltip: 'true'
        },
        {
          title: '状态',
          key: 'stateDesc',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          minWidth: 80,
          align: 'center'
        }
      ], // 企业列表
      search: '',
      screen: null,
      companyThisRow: {}, // 企业提交
      registerThieRow: {} // 个人提交
    }
  },
  methods: {
    // 信息提示
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    succDialog () {
      if (this.selectTag === 'company') {
        usersCompanySubmit(this.companyThisRow).then(res => {
          this.getuserVerifyCompanyList()
          this.resMessage('success', '操作成功')
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      } else {
        usersRegisterSubmit(this.registerThieRow).then(res => {
          this.resMessage('success', '操作成功')
          this.getuserVerifyCustomList()
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      }
    },
    // 个人提交
    registerSubmit (row) {
      this.dialogFlag = true
      this.registerThieRow = {
        registerId: row.registerId, // 企业信息id
        arbId: row.arbId,
        id: row.id
      }
    },
    // 企业提交
    companySubmit (row) {
      this.dialogFlag = true
      this.companyThisRow = {
        companyId: row.companyId, // 企业信息id
        arbId: row.arbId,
        id: row.id
      }
    },
    // 个人查看
    showUserReviewCustomDialog (row) {
      this.showUserReviewCustomDia = true
      this.customRowDetial = row
    },
    childbyValueCustom (data) {
      this.showUserReviewCustomDia = data
    },
    childByValuefad (data) {
      this.showUserReviewDia = data
    },
    // 编辑和查看
    showUserReviewDialog (row) {
      this.showUserReviewDia = true
      this.rowDetial = row
    },
    // dictionaryApprove
    getdictionaryApproveList () {
      dictionaryApprove().then(res => {
        this.selectApprove = res.data.data
        this.selectApprove.push({ item: '全部', itemValue: 0, id: 0 })
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    // usersVerifyCustomList
    getuserVerifyCustomList () {
      usersVerifyCustom({
        name: this.search, // 企业名称/仲裁委名称
        state: this.screen, // 0.全部 1.审核通过 2.审核未通过 3.待审核
        pageNum: this.pageObj1.pageNum,
        pageSize: this.pageObj1.pageSize
      }).then(res => {
        this.usersVerifyCustomList = res.data.data.dataList
        this.pageObj1.total = res.data.data.totalCount
        this.search = ''
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    getuserVerifyCompanyList () {
      this.spinShow = true
      // 客户信息审核--列表(企业)
      usersVerifyCompany({
        name: this.search, // 企业名称/仲裁委名称
        state: this.screen, // 0.全部 1.审核通过 2.审核未通过 3.待审核
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize
      }).then(res => {
        this.verifyCompanyList = res.data.data.dataList
        this.pageObj.total = res.data.data.totalCount
        this.search = ''
        this.spinShow = false
      }).catch(e => {
        this.spinShow = false
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    resSearch () {
      this.pageObj.pageNum = 1
      this.pageObj1.pageNum = 1
      this.getuserVerifyCompanyList()
      this.getuserVerifyCustomList()
    },
    // 个人列表
    reschangePage1 (page) {
      this.pageObj1.pageNum = page
      this.getuserVerifyCustomList()
    },
    // 企业列表
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.getuserVerifyCompanyList()
    }
  },
  mounted () {
    this.getuserVerifyCompanyList()
    this.getuserVerifyCustomList()
    this.getdictionaryApproveList()
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.userReview {
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
