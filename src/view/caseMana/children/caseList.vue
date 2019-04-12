<template>
  <div class="_center pr">
    <spin-comp :spinShow="spinShow"></spin-comp>
    <Row class="mb20">
      <template v-if="caseState === 3">
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">审核状态</label>
        </Col>
        <Col span="3">
          <Select v-model="search.auditState" @on-change="resSearch">
            <Option v-for="item in search.stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </template>
      <Col v-if="caseState === 1 || caseState === 0" span="8" :offset="caseState === 3 ? 10 : 15" class="tr">
        <Button type="primary" class="mr20" @click="resAction('sear')">条件搜索</Button>
        <Button type="primary" class="mr20" @click="resAgrees('1')">批量通过</Button>
        <Button type="primary" class="mr20" @click="resAgrees('2')">批量不通过</Button>
        <Button v-if="usersInfo.roleType === '1' || usersInfo.roleType === '2'" type="primary" @click="resAllots">批量分案</Button>
      </Col>
      <Col v-if="caseState === 2" span="2" offset="21" class="tr">
        <Button type="primary" class="mr20" @click="resAction('sear')">条件搜索</Button>
      </Col>
      <Col v-if="caseState === 3" span="6" :offset="caseState === 3 ? 12 : 17" class="tr">
        <Button type="primary" class="mr20" @click="resAction('sear')">条件搜索</Button>
        <Button type="primary" class="mr20" @click="resSubms">批量提交</Button>
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
    <alert-btn-info :alertShow="alertShow.allotShow" :isSaveBtn="true" @alertCancel="alertCanc('allot')" alertTitle="操作">
      <tree-table expand-key="title" :expand-type="false" :selectable="false" :columns="treeList.header" :data="treeList.bodyList">
        <template slot="btns" slot-scope="scope" v-if="scope.row.type - usersInfo.roleType === 2 && scope.row.title !== '超级管理员'">
          <Button type="primary" size="small" style="margin-right:5px;" @click="orgaAllot(scope)">选择</Button>
        </template>
      </tree-table>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.agreeShow" @alertConfirm="sendAjax('agree')" @alertCancel="alertCanc('agree')" alertTitle="操作">
      <p v-if="alertShow.idsAgreeStatus === '1'">确定要通过吗？</p>
      <p v-else-if="alertShow.idsAgreeStatus === '2'">确定要不通过吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.searShow" @alertConfirm="sendAjax('sear')" @alertCancel="alertCanc('sear')" alertTitle="操作">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span"></span><b>提交人：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="search.submitter" @on-change="resAction('change_subm')">
            <Option v-for="item in search.submiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span"></span><b>申请人：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="search.proposer"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span"></span><b>被申请人：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="search.respondent"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span"></span><b>代理人：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="search.proxy"></Input>
        </Col>
      </Row>
      <Row class="_labelFor" v-if="search.submitter !== null">
        <Col span="6" offset="1">
          <p><span class="_span"></span><b>合同类型：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="search.caseTypeId" @on-change="resAction('change_case')">
            <Option v-for="item in search.caseTypeList[search.submitter]" :value="item.id" :key="item.id">{{ item.caseTypeName }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor" v-if="search.caseTypeId !== null">
        <Col span="6" offset="1">
          <p><span class="_span"></span><b>移交仲裁委：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="search.arbitrationId">
            <Option v-for="item in search.arbiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span"></span><b>起始提交时间：</b></p>
        </Col>
        <Col span="16">
          <DatePicker class="wmax" @on-change="changeDateS" type="datetime" placeholder=""></DatePicker>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span"></span><b>结束提交时间：</b></p>
        </Col>
        <Col span="16">
          <DatePicker class="wmax" @on-change="changeDateE" type="datetime" placeholder=""></DatePicker>
        </Col>
      </Row>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.submShow" @alertConfirm="sendAjax('subm')" @alertCancel="alertCanc('subm')" alertTitle="操作">
      <p>确定要提交到仲裁委吗？</p>
    </alert-btn-info>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import spinComp from '@/components/common-w/spin'
import alertBtnInfo from '@/components/common-w/alertBtnInfo'
import { caseFindList, maOrgTreeList, casesAllot, casesAgree, usersList, arbitList, submCase } from '@/api/datas.js'
import { caseInfo } from '@/config/common.js'

export default {
  name: 'caseList',
  components: { spinComp, alertBtnInfo },
  props: {
    caseState: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      spinShow: false,
      search: {
        stateList: [
          {
            value: 14,
            label: '审核通过'
          },
          {
            value: 15,
            label: '审核不通过'
          }
        ],
        auditState: null,
        submitter: null,
        submiList: [],
        proposer: '',
        arbitrationId: null,
        arbiList: [],
        caseTypeId: null,
        caseTypeList: [],
        respondent: '',
        proxy: '',
        startSubmitTime: '',
        endSubmitTime: ''
      },
      caseList: {
        loading: false,
        header: [
          {
            title: '选择',
            key: 'id',
            align: 'center',
            maxWidth: 70,
            render: (h, params) => {
              return this.renderCheck(h, params)
            }
          },
          {
            title: '案件编号',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0'
                },
                on: {
                  click: () => {
                    this.goCaseInfo(params.index)
                  }
                }
              }, params.row.id)
            }
          },
          {
            title: '提交人',
            key: 'submitter',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '申请人',
            key: 'applicationName',
            align: 'center'
          },
          {
            title: '被申请人',
            key: 'respondentName',
            align: 'center'
          },
          {
            title: '代理人',
            key: 'proxyName',
            align: 'center'
          },
          {
            title: '移交仲裁委',
            key: 'arbitrationName',
            tooltip: 'true',
            align: 'center'
          },
          {
            title: '合同类型',
            key: 'caseTypeName',
            align: 'center'
          },
          {
            title: '案件状态',
            key: 'stateDesc',
            align: 'center'
          },
          {
            title: '案件接收人',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.userName === null ? params.row.managerName : params.row.managerName + '=>' + params.row.userName)
            }
          },
          {
            title: '提交时间',
            key: 'submitTime',
            tooltip: 'true',
            align: 'center'
          },
          // {
          //   title: '是否固话',
          //   key: 'hashCuringFlag',
          //   align: 'center'
          // },
          {
            title: '操作',
            key: 'id',
            minWidth: 100,
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
        searShow: false,
        idsList: [],
        allotShow: false,
        agreeShow: false,
        alloterId: null,
        idsAgreeList: [],
        idsAgreeStatus: null,
        submShow: false
      },
      treeList: {
        header: [
          {
            title: '权限名称',
            key: 'title'
          },
          {
            title: '操作',
            key: 'id',
            minWidth: '100px',
            type: 'template',
            template: 'btns',
            algin: 'center'
          }
        ],
        bodyList: []
      }
    }
  },
  created () {
    this.resTreeList()
    this.resCaseList()
  },
  computed: {
    ...mapGetters([
      'usersInfo'
    ])
  },
  methods: {
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    resTreeList () {
      maOrgTreeList().then(res => {
        let _data = res.data.data
        if (_data !== null) {
          this.treeList.bodyList = []
          this.treeList.bodyList.push(_data)
        }
      }).catch(e => {
        this.spinShow = false
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    renderCheck (h, params) {
      let _obj = params.row
      let _roleType = this.usersInfo.roleType
      if (_roleType === '3') {
        if (_obj.showButtonState === '2' || (this.caseState === 3 && _obj.state === 14)) {
          if (this.alertShow.idsList.indexOf(_obj.id) === -1) {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-square-outline',
                  size: '16'
                },
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer',
                  verticalAlign: 'text-top'
                },
                on: {
                  click: () => {
                    this.seleArrChange(params.index, true)
                  }
                }
              })
            ])
          } else {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-checkbox',
                  size: '16'
                },
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer',
                  verticalAlign: 'text-top'
                },
                on: {
                  click: () => {
                    this.seleArrChange(params.index, false)
                  }
                }
              })
            ])
          }
        } else {
          return h('div', [
          ])
        }
      } else if (_roleType === '2' || _roleType === '1') {
        if (_obj.showButtonState === '1' || (this.caseState === 3 && _obj.state === 14)) {
          if (this.alertShow.idsList.indexOf(_obj.id) === -1) {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-square-outline',
                  size: '16'
                },
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer',
                  verticalAlign: 'text-top'
                },
                on: {
                  click: () => {
                    this.seleArrChange(params.index, true)
                  }
                }
              })
            ])
          } else {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-checkbox',
                  size: '16'
                },
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer',
                  verticalAlign: 'text-top'
                },
                on: {
                  click: () => {
                    this.seleArrChange(params.index, false)
                  }
                }
              })
            ])
          }
        } else {
          return h('div', [
          ])
        }
      } else {
        return h('div', [
        ])
      }
    },
    seleArrChange (index, bool) {
      let info = this.caseList.bodyList[index]
      if (bool) {
        if (this.alertShow.idsList.indexOf(info.id) === -1) {
          if (this.alertShow.idsList.length >= 10) {
            this.$Message.error({
              content: '最多只能选择十个案件',
              duration: 5
            })
            return false
          } else {
            let _o = {}
            this.alertShow.idsList.push(info.id)
            _o[info.id] = info.arbitrationId
            this.alertShow.idsAgreeList.push(_o)
          }
        }
      } else {
        if (this.alertShow.idsList.indexOf(info.id) !== -1) {
          this.alertShow.idsAgreeList.splice(this.alertShow.idsList.indexOf(info.id), 1)
          this.alertShow.idsList.splice(this.alertShow.idsList.indexOf(info.id), 1)
        }
      }
    },
    renderBtn (h, params) {
      let _obj = params.row
      let _roleType = this.usersInfo.roleType
      if (_roleType === '3') {
        if (_obj.showButtonState === '2') {
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
                  this.resAgreeCase('1', params.index)
                }
              }
            }, '通过'),
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
                  this.resAgreeCase('2', params.index)
                }
              }
            }, '不通过')
          ])
        } else {
          if ((this.caseState === 3 || this.caseState === 0) && _obj.state === 14) {
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
                    this.resSubmCase(params.index)
                  }
                }
              }, '提交')
            ])
          } else {
            return h('div', [
            ])
          }
        }
      } else if (_roleType === '2' || _roleType === '1') {
        if (_obj.showButtonState === '1') {
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
                  this.resAgreeCase('1', params.index)
                }
              }
            }, '通过'),
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
                  this.resAgreeCase('2', params.index)
                }
              }
            }, '不通过'),
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
                  this.resAllotCase(params.index)
                }
              }
            }, '分案')
          ])
        } else {
          if ((this.caseState === 3 || this.caseState === 0) && _obj.state === 14) {
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
                    this.resSubmCase(params.index)
                  }
                }
              }, '提交')
            ])
          } else {
            return h('div', [
            ])
          }
        }
      }
    },
    resCaseList () {
      this.spinShow = true
      caseFindList({
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize,
        type: this.caseState,
        auditState: this.search.auditState,
        submitter: this.search.submitter,
        proposer: this.search.proposer,
        arbitrationId: this.search.arbitrationId,
        caseTypeId: this.search.caseTypeId,
        respondent: this.search.respondent,
        proxy: this.search.proxy,
        startSubmitTime: this.search.startSubmitTime,
        endSubmitTime: this.search.endSubmitTime
      }).then(res => {
        let _data = res.data.data
        this.caseList.bodyList = _data.dataList === null ? [] : _data.dataList
        this.pageObj.total = _data.totalCount
        this.spinShow = false
        this.alertCanc('sear')
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
    resSubmCase (index) {
      let _res = this.caseList.bodyList[index]
      let _o = {}
      this.alertShow.idsList = []
      this.alertShow.idsAgreeList = []
      _o[_res.id] = _res.arbitrationId
      this.alertShow.idsList.push(_res.id)
      this.alertShow.idsAgreeList.push(_o)
      this.alertShow.submShow = true
    },
    resSubms () {
      if (this.alertShow.idsList.length === 0) {
        this.resMessage('error', '请先选择一个案件')
      } else {
        this.alertShow.submShow = true
      }
    },
    resAgreeCase (status, index) {
      let _res = this.caseList.bodyList[index]
      let _o = {}
      this.alertShow.idsList = []
      this.alertShow.idsAgreeList = []
      _o[_res.id] = _res.arbitrationId
      this.alertShow.idsList.push(_res.id)
      this.alertShow.idsAgreeList.push(_o)
      this.alertShow.idsAgreeStatus = status
      this.alertShow.agreeShow = true
    },
    resAgrees (status) {
      if (this.alertShow.idsList.length === 0) {
        this.resMessage('error', '请先选择一个案件')
      } else {
        this.alertShow.idsAgreeStatus = status
        this.alertShow.agreeShow = true
      }
    },
    resAllotCase (index) {
      let _res = this.caseList.bodyList[index]
      this.alertShow.idsList = []
      this.alertShow.idsList.push(_res.id)
      this.alertShow.allotShow = true
    },
    resAllots () {
      if (this.alertShow.idsList.length === 0) {
        this.resMessage('error', '请先选择一个案件')
      } else {
        this.alertShow.allotShow = true
      }
    },
    orgaAllot (scope) {
      this.alertShow.alloterId = scope.row.id
      this.sendAjax('allot')
    },
    changeDateS (val) {
      this.search.startSubmitTime = val
    },
    changeDateE (val) {
      this.search.endSubmitTime = val
    },
    resAction (type) {
      switch (type) {
        case 'change_subm':
          this.search.caseTypeId = null
          this.search.arbitrationId = null
          break
        case 'change_case':
          arbitList({
            caseTypeId: this.search.arbitrationId
          }).then(res => {
            let _dataList = res.data.data
            this.search.arbiList = _dataList.map((a, b) => {
              let _o = {}
              _o.value = a.id
              _o.label = a.name
              return _o
            })
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'sear':
          usersList().then(res => {
            let _dataList = res.data.data
            this.search.submiList = _dataList.map((a, b) => {
              let _o = {}
              _o.value = a.name
              _o.label = a.name
              this.search.caseTypeList[a.name] = a.caseTypes
              return _o
            })
            this.alertShow.searShow = true
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
      }
    },
    sendAjax (type) {
      switch (type) {
        case 'subm':
          submCase({
            ids: JSON.stringify(this.alertShow.idsAgreeList)
          }).then(res => {
            this.alertCanc('subm')
            this.resMessage('success', '操作成功')
            this.resSearch()
          }).catch(e => {
            this.alertCanc('subm')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'sear':
          this.resSearch()
          break
        case 'allot':
          casesAllot({
            ids: this.alertShow.idsList.join(','),
            alloter: this.alertShow.alloterId
          }).then(res => {
            this.alertCanc('allot')
            this.resMessage('success', '操作成功')
            this.resSearch()
          }).catch(e => {
            this.alertCanc('allot')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'agree':
          casesAgree({
            ids: this.alertShow.idsList.join(','),
            status: this.alertShow.idsAgreeStatus - 0
          }).then(res => {
            this.alertCanc('agree')
            this.resMessage('success', '操作成功')
            this.resSearch()
          }).catch(e => {
            this.alertCanc('agree')
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
      }
    },
    goCaseInfo (index) {
      let obj = {}
      obj.caseId = this.caseList.bodyList[index].id
      obj.state = 1
      caseInfo(obj)
    },
    alertCanc (type) {
      switch (type) {
        case 'subm':
          this.alertShow.submShow = false
          this.alertShow.idsList = []
          this.alertShow.idsAgreeList = []
          break
        case 'sear':
          this.alertShow.searShow = false
          this.search.submitter = null
          this.search.submiList = []
          this.search.proposer = ''
          this.search.arbitrationId = null
          this.search.arbiList = []
          this.search.caseTypeId = null
          this.search.caseTypeList = []
          this.search.respondent = ''
          this.search.proxy = ''
          this.search.startSubmitTime = ''
          this.search.endSubmitTime = ''
          break
        case 'allot':
          this.alertShow.allotShow = false
          this.alertShow.idsList = []
          this.alertShow.idsAgreeList = []
          this.alertShow.alloterId = null
          break
        case 'agree':
          this.alertShow.agreeShow = false
          this.alertShow.idsList = []
          this.alertShow.idsAgreeList = []
          this.alertShow.idsAgreeStatus = null
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
