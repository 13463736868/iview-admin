<template>
  <!-- <div>仲裁委信息管理</div> -->
  <div class="arbitration pr">
    <spin-comp :spinShow="spinShow"></spin-comp>
    <Row>
      <Col span="2">
        <label class="lh32 f16 fc6 fr mr15">查询条件</label>
      </Col>
      <Col span="5">
        <Input v-model="search" icon="ios-search" placeholder class="_search hand" @on-click="resSearch" @keyup.enter.native="resSearch"></Input>
      </Col>
      <Col span="2" offset="14">
        <Button type="primary" @click="resAddUser()">添加仲裁委</Button>
      </Col>
    </Row>
    <div class="_caseList clearfix">
      <Row>
        <Col span="24" class="pl20 pr20">
          <Table border :columns="bodyList.headerList" :data="bodyList.arbitrationList">
            <template slot-scope="{ row, index }" slot="name">
              <span @click="chakan(row)" style="cursor:pointer">{{row.name}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="state">
              <span v-text="row.state === 1 ? '启用' : '停用'"></span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" class="mr5" size="small" @click="deleteContrace(row)">删除</Button>
              <Button type="primary" class="mr5" size="small" @click="editContrace(row)">编辑</Button>
              <Button type="primary" class="mr5" size="small" @click="remove(row)">{{row.state === 2 ? '启用' : '停用'}}</Button>
            </template>
          </Table>
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
    <watch-Arbitration @childByValue="childByValuefad" v-if="showDialog" :arbitrationForm="arbitrationForm" :butType="butType" :showDialog="showDialog"></watch-Arbitration>
<!-- 提醒模态框 -->
    <Modal v-model="dialogFlag" @on-ok="succDialog" draggable scrollable title="提醒">
      <div>确定{{showMessage}}？</div>
    </Modal>
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import { getArbitration, stopArbitration, deleteArbitration } from '@/api/contrace.js'
import watchArbitration from '@/view/manager/children/arbitrationDialog'
export default {
  components: {
    spinComp,
    watchArbitration
  },
  name: 'arbitration',
  data () {
    return {
      spinShow: false,
      rowMessage: {},
      showMessage: '',
      dialogFlag: false,
      search: '', // 搜索
      butType: null,
      arbitrationForm: {
        name: '',
        englishName: '',
        code: '',
        telephone: '',
        address: '',
        email: '',
        linkman: '',
        accountNumber: '',
        openingBank: '',
        baseUrl: '',
        state: 1,
        logoUrl: ''
      },
      showDialog: false,
      // arbitrationList: [],
      bodyList: {
        headerList: [
          {
            title: '仲裁委名称',
            slot: 'name',
            tooltip: 'true'
            // minWidth: 50
          },
          {
            title: '对公账号',
            key: 'accountNumber',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '开户行',
            key: 'openingBank',
            align: 'center'
          },
          {
            title: '联系人',
            key: 'linkman',
            align: 'center'
          },
          {
            title: '联系电话',
            key: 'telephone',
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
            title: '地址',
            key: 'address',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '可用状态',
            slot: 'state',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            minWidth: 80,
            align: 'center'
          }
        ],
        arbitrationList: []
      },
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.getarbitrationList()
    },
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    succDialog () {
      if (this.showMessage === '删除') {
        deleteArbitration({
          id: this.rowMessage.id // 仲裁委id
        }).then(res => {
          this.resMessage('success', '操作成功')
          this.getarbitrationList()
        }).catch(e => {
          this.resMessage('warning', '操作失败，稍后重试！')
        })
      } else {
        stopArbitration({
          id: this.rowMessage.id,
          state: this.rowMessage.state === 1 ? 2 : 1
        }).then(res => {
          this.resMessage('success', '操作成功')
          this.getarbitrationList()
        }).catch(e => {
          this.resMessage('warning', '操作失败，稍后重试！')
        })
      }
    },
    // 删除仲裁委
    deleteContrace (row) {
      this.rowMessage = row
      this.dialogFlag = true
      this.showMessage = '删除'
    },
    // 修改仲裁委状态
    remove (row) {
      this.rowMessage = row
      this.dialogFlag = true
      if (row.state === 1) {
        this.showMessage = '停用'
      } else {
        this.showMessage = '启用'
      }
    },
    // 编辑仲裁委
    editContrace (row) {
      this.butType = 3
      this.arbitrationForm = row
      this.showDialog = true
    },
    // 添加仲裁委
    resAddUser () {
      this.arbitrationForm = {
        name: '',
        englishName: '',
        code: '',
        telephone: '',
        address: '',
        email: '',
        linkman: '',
        accountNumber: '',
        openingBank: '',
        baseUrl: '',
        state: null,
        logoUrl: ''
      }
      this.butType = 2
      this.showDialog = true
    },
    childByValuefad (data) {
      this.showDialog = data
      this.getarbitrationList()
    },
    // 查看仲裁委
    chakan (row) {
      this.showDialog = true
      this.arbitrationForm = row
      this.butType = 1
    },
    getarbitrationList () {
      this.spinShow = true
      getArbitration({
        name: this.search, // 仲裁委名称
        state: null, // 1.启用 2.停用
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize // 默认每页10条
      }).then(res => {
        this.spinShow = false
        this.bodyList.arbitrationList = res.data.data.dataList === null ? [] : res.data.data.dataList
        this.pageObj.total = res.data.data.totalCount
        this.search = ''
      }).catch(e => {
        this.spinShow = false
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    resSearch () {
      this.pageObj.pageNum = 1
      this.getarbitrationList()
    }
  },
  created () {
    this.getarbitrationList()
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.arbitration {
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
</style>
