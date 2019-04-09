<template>
  <div class="_center pr">
    <spin-comp :spinShow="spinShow"></spin-comp>
    <div class="_caseList clearfix">
      <Row>
        <Col span="24" class="pl20 pr20">
          <tree-table expand-key="title" :expand-type="false" :selectable="false" :columns="treeList.header" :data="treeList.bodyList">
            <template slot="btns" slot-scope="scope" v-if="scope.row.type !== '3' && scope.row.type !== '4'">
              <!-- <Button v-if="scope.row.type !== '0'" type="primary" size="small" style="margin-right:5px;" @click="orgaSee(scope)">查看</Button> -->
              <Button type="primary" size="small" style="margin-right:5px;" @click="orgaAdd(scope)">添加</Button>
              <Button v-if="scope.row.type !== '0'" type="primary" size="small" style="margin-right:5px;" @click="orgaEdit(scope)">修改</Button>
              <Button v-if="scope.row.type !== '0'" type="primary" size="small" style="margin-right:5px;" @click="orgaDel(scope)">删除</Button>
            </template>
          </tree-table>
        </Col>
      </Row>
    </div>
    <alert-btn-info :alertShow="alertShow.deleShow" @alertConfirm="sendAjax('dele')" @alertCancel="alertCanc('dele')" alertTitle="操作">
      <p>确定要删除吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.addShow" @alertConfirm="maOrgAddSave" @alertCancel="alertCanc('add')" :alertTitle="alertShow.typeName">
      <div v-if="addData.type === '1'">
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span">*</span><b>单位名称：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.orgName"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>简称：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.shortName"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span">*</span><b>类型：</b></p>
          </Col>
          <Col span="16">
            <Select v-model="addData.type" disabled>
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span">*</span><b>状态：</b></p>
          </Col>
          <Col span="16">
            <Select v-model="addData.state">
              <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>机构编码：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.code"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>行业：</b></p>
          </Col>
          <Col span="16">
            <Select v-model="addData.trade">
              <Option v-for="item in tradList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>规模：</b></p>
          </Col>
          <Col span="16">
            <Select v-model="addData.scale">
              <Option v-for="item in compNumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>联系人：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.contacts"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>法人：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.legal"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>证件类型：</b></p>
          </Col>
          <Col span="16">
            <Select v-model="addData.idcardType">
              <Option v-for="item in enteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>证件号码：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.idcard"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>地址：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.address"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>邮箱：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.email"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span"></span><b>电话：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.phone"></Input>
          </Col>
        </Row>
      </div>
       <div v-else-if="addData.type === '2'">
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span">*</span><b>部门名称：</b></p>
          </Col>
          <Col span="16">
            <Input v-model="addData.orgName"></Input>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span">*</span><b>类型：</b></p>
          </Col>
          <Col span="16">
            <Select v-model="addData.type" disabled>
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span">*</span><b>状态：</b></p>
          </Col>
          <Col span="16">
            <Select v-model="addData.state">
              <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </alert-btn-info>
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import alertBtnInfo from '@/components/common-w/alertBtnInfo'
import { dictionaryList, maOrgTreeList, maOrgTreeQuer, maOrgDele, maOrgAdd } from '@/api/datas.js'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'orgaMana',
  components: { spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: false,
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
      },
      alertShow: {
        deleShow: false,
        orgId: null,
        addShow: false,
        typeName: ''
      },
      addData: {
        id: 0,
        type: null,
        pid: null,
        state: null,
        code: null,
        orgName: '',
        shortName: '',
        trade: null,
        scale: null,
        contacts: '',
        legal: '',
        idcardType: '',
        idcard: '',
        address: '',
        email: '',
        phone: '',
        sort: ''
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
      typeList: [
        {
          value: '1',
          label: '单位'
        },
        {
          value: '2',
          label: '部门'
        }
      ],
      enteList: [],
      tradList: [],
      compNumList: []
    }
  },
  created () {
    this.dictionary()
    this.resTreeList()
  },
  methods: {
    dictionary () {
      Promise.all([dictionaryList({ type: 'companyNumber' }), dictionaryList({ type: 'tradeType' }), dictionaryList({ type: 'enterpriseIdcardType' })]).then(res => {
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
        this.compNumList = selectO
        this.tradList = selectT
        this.enteList = selectH
      }).catch(e => {
        // this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
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
    orgaSee (scope) {
      console.log(scope)
    },
    orgaAdd (scope) {
      this.addData.type = scope.row.type - 0 + 1 > 2 ? 2 + '' : scope.row.type - 0 + 1 + ''
      this.addData.pid = scope.row.id
      this.alertShow.typeName = '添加'
      this.alertShow.addShow = true
    },
    orgaEdit (scope) {
      this.addData.type = scope.row.type
      this.addData.pid = scope.row.pid
      this.addData.id = scope.row.id
      this.alertShow.typeName = '修改'
      maOrgTreeQuer({
        orgId: this.addData.id
      }).then(res => {
        let _data = res.data.data
        this.addData.id = _data.id
        // this.addData.type = _data.type
        this.addData.pid = _data.pid
        this.addData.state = _data.state
        this.addData.code = _data.code
        this.addData.orgName = _data.orgName
        this.addData.shortName = _data.shortName
        this.addData.trade = _data.trade
        this.addData.scale = _data.scale
        this.addData.contacts = _data.contacts
        this.addData.legal = _data.legal
        this.addData.idcardType = _data.idcardType
        this.addData.idcard = _data.idcard
        this.addData.address = _data.address
        this.addData.email = _data.email
        this.addData.phone = _data.phone
        this.addData.sort = _data.sort
        this.alertShow.addShow = true
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    orgaDel (scope) {
      this.alertShow.orgId = scope.row.id
      this.alertShow.deleShow = true
    },
    maOrgAddSave () {
      if (this.addData.type !== '1' && this.addData.type !== '2') {
        this.resMessage('warning', '请选择类型')
      } else if (this.addData.type === '1') {
        if (this.addData.orgName === '') {
          this.resMessage('warning', '单位名称不能为空')
        } else if (this.addData.state === null) {
          this.resMessage('warning', '请选择状态')
        } else {
          if (this.addData.contacts !== '') {
            if (!setRegExp(this.addData.contacts, 'name')) {
              this.resMessage('warning', '联系人姓名格式不对')
              return false
            }
          }
          if (this.addData.legal !== '') {
            if (!setRegExp(this.addData.legal, 'name')) {
              this.resMessage('warning', '法人姓名格式不对')
              return false
            }
          }
          if (this.addData.idcardType !== '') {
            if (!setRegExp(this.addData.idcard, 'entityNo1')) {
              this.resMessage('warning', '营业执照格式不对')
              return false
            }
          }
          if (this.addData.address !== '') {
            if (!setRegExp(this.addData.address, 'address')) {
              this.resMessage('warning', '地址格式不对')
              return false
            }
          }
          if (this.addData.email !== '') {
            if (!setRegExp(this.addData.email, 'email')) {
              this.resMessage('warning', '邮件格式不对')
              return false
            }
          }
          if (this.addData.phone !== '') {
            if (!(setRegExp(this.addData.phone, 'phone') || setRegExp(this.addData.phone, 'landline'))) {
              this.resMessage('warning', '电话格式不对')
              return false
            }
          }
          setTimeout(() => {
            this.sendAjax('add')
          }, 0)
        }
      } else if (this.addData.type === '2') {
        if (this.addData.orgName === '') {
          this.resMessage('warning', '部门名称不能为空')
        } else if (this.addData.state === null) {
          this.resMessage('warning', '请选择状态')
        } else {
          this.sendAjax('add')
        }
      }
    },
    sendAjax (type) {
      switch (type) {
        case 'dele':
          maOrgDele({
            orgId: this.alertShow.orgId
          }).then(res => {
            this.alertCanc('dele')
            this.resMessage('success', '操作成功')
            this.resTreeList()
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
        case 'add':
          maOrgAdd({
            id: this.addData.id,
            type: this.addData.type,
            pid: this.addData.pid,
            state: this.addData.state,
            code: this.addData.code,
            orgName: this.addData.orgName,
            shortName: this.addData.shortName,
            trade: this.addData.trade,
            scale: this.addData.scale,
            contacts: this.addData.contacts,
            legal: this.addData.legal,
            idcardType: this.addData.idcardType,
            idcard: this.addData.idcard,
            address: this.addData.address,
            email: this.addData.email,
            phone: this.addData.phone,
            sort: this.addData.sort
          }).then(res => {
            this.alertCanc('add')
            this.resMessage('success', '操作成功')
            this.resTreeList()
          }).catch(e => {
            this.resMessage('error', '错误信息:' + e + ' 稍后再试')
          })
          break
      }
    },
    alertCanc (type) {
      switch (type) {
        case 'dele':
          this.alertShow.deleShow = false
          this.alertShow.orgId = null
          break
        case 'add':
          this.alertShow.addShow = false
          this.alertShow.typeName = ''
          this.addData.id = 0
          this.addData.type = null
          this.addData.pid = null
          this.addData.state = null
          this.addData.code = null
          this.addData.orgName = ''
          this.addData.shortName = ''
          this.addData.trade = null
          this.addData.scale = null
          this.addData.contacts = ''
          this.addData.legal = ''
          this.addData.idcardType = ''
          this.addData.idcard = ''
          this.addData.address = ''
          this.addData.email = ''
          this.addData.phone = ''
          this.addData.sort = ''
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
