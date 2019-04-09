<template>
  <div class="_contractType pr">
    <spin-comp :spinShow="spinShow"></spin-comp>
    <Row>
      <Col span="2">
        <label class="lh32 f16 fc6 fr mr15">查询条件</label>
      </Col>
      <Col span="5">
        <Input v-model="search" icon="ios-search" placeholder class="_search hand" @on-click="resSearch" @keyup.enter.native="resSearch"></Input>
      </Col>
      <Col span="2" offset="14">
        <Button type="primary" @click="resAddUser()">添加合同类型</Button>
      </Col>
    </Row>
    <div class="_caseList clearfix">
      <Row>
        <Col span="24" class="pl20 pr20">
          <Table border :columns="bodyList.headerList" :data="bodyList.tableList" stripe>
            <template slot-scope="{ row, index }" slot="userName">
              <span>{{row.userName}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="status">
              <span v-text="row.status == 1 ? '启用' : '停用'"></span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" class="mr5" size="small" @click="deleteContrace(row.id)">删除</Button>
              <Button type="primary" class="mr5" size="small" @click="editContrace(row)">编辑</Button>
              <Button type="primary" class="mr5" size="small" @click="remove(row)">{{row.status == 1 ? '停用' : '启用'}}</Button>
            </template>
          </Table>
        </Col>
      </Row>
      <!-- 提醒 -->
      <Modal v-model="dialogFlag" @on-ok="succDialog" draggable scrollable title="提醒">
        <div>确定删除?</div>
      </Modal>
      <Modal v-model="stopdialogFlag" @on-ok="stopOrRuning" draggable scrollable title="提醒">
        <div>确定停用?</div>
      </Modal>
      <Modal v-model="RunningdialogFlag" @on-ok="stopOrRuning" draggable scrollable title="提醒">
        <div>确定启用?</div>
      </Modal>
    </div>
    <div class="_page clearfix">
      <Row>
        <Col span="12" offset="6" class="tc">
          <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage"></Page>
        </Col>
      </Row>
    </div>
    <!-- 添加的弹框 -->
    <add-contrace @childByValue="childByValuefad" v-if="showDialog" ref="addItem" :editContraceType="editContraceType" :dialogType="dialogType"></add-contrace>
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import { getTableList, deleteContr, updataContractState } from '@/api/contrace.js'
import addContrace from '@/view/manager/children/addContraceDialog'
export default {
  components: {
    spinComp,
    addContrace
  },
  name: 'contrace',
  data () {
    return {
      spinShow: false,
      RunningdialogFlag: false,
      updataState: {
        id: null,
        state: null
      },
      stopdialogFlag: false,
      dialogType: '',
      dialogFlag: false,
      dialogProId: null,
      editContraceType: {}, // 传给子组件
      search: '',
      showDialog: false,
      bodyList: {
        headerList: [
          {
            title: '客户名称',
            slot: 'userName',
            align: 'center'
          },
          {
            title: '合同类型',
            key: 'caseTypeName',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '可接收的仲裁委',
            tooltip: 'true',
            key: 'arbName',
            align: 'center'
          },
          {
            title: '可用状态',
            slot: 'status',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center'
          }
        ],
        tableList: []
      },
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.getbodyList()
  },
  methods: {
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    stopOrRuning () {
      updataContractState({
        id: this.updataState.id,
        state: this.updataState.state
      }).then(res => {
        this.resMessage('success', '操作成功')
        this.resSearch()
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    // 删除
    succDialog () {
      // index
      deleteContr({ caseTypeId: this.dialogProId }).then(res => {
        this.resMessage('success', '操作成功')
        this.resSearch()
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    childByValuefad (data) {
      this.showDialog = data
      this.resSearch()
    },
    deleteContrace (index) {
      this.dialogProId = index
      this.dialogFlag = true
    },
    editContrace (row) {
      this.editContraceType = row
      this.dialogType = '编辑'
      this.showDialog = true
    },
    remove (index) {
      if (index.status === 1) {
        this.stopdialogFlag = true
      } else {
        this.RunningdialogFlag = true
      }
      this.updataState.id = index.id
      if (index.status === 1) {
        this.updataState.state = 2
      } else {
        this.updataState.state = 1
      }
    },
    resAddUser () {
      this.dialogType = '添加'
      this.showDialog = true
    },
    getbodyList () {
      this.spinShow = true
      getTableList({
        keyword: this.search,
        state: '',
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize
      }).then(res => {
        this.spinShow = false
        this.bodyList.tableList = res.data.data.dataList
        // this.search = ''
        this.pageObj.total = res.data.data.totalCount
      }).catch(e => {
        this.spinShow = true
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    resSearch () {
      this.pageObj.pageNum = 1
      this.getbodyList()
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.getbodyList()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
._contractType {
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
