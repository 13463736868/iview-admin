<template>
  <div class="AddDialog">
    <Modal v-model="modal1" :title="title" :mask-closable="false" @on-cancel="cancel">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span">*</span>
            <b>合同类型：</b>
          </p>
        </Col>
        <Col span="16">
          <Input
            @on-blur="caseChange(Form.caseTypeName)"
            v-model="Form.caseTypeName"
            class="inputOf"  :disabled="editContraceType"
          ></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span">*</span>
            <b>选择客户：</b>
          </p>
        </Col>
        <Col span="16">
          <Select v-model="Form.userList" @on-change="getCustomer" :disabled="editContraceType">
            <Option
              v-for="item in userList"
              :value="item.name"
              :key="item.companyId"
            >{{ item.name }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span">*</span>
            <b>关联仲裁委：</b>
          </p>
        </Col>
        <Col span="16">
          <Select v-model="arbitration" @on-change="getArbArr" filterable multiple>
            <Option
              v-for="item in arbitrationList"
              :value="item.name"
              :key="item.name"
            >{{ item.name }}</Option>
          </Select>
        </Col>
      </Row>
      <div>
        <slot></slot>
      </div>
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="addContrace">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
import { getArbList, getContractList, addContraceOne, editContr } from '@/api/contrace.js'
// usersVerifyCompany,
// import setRegExp from '@/config/regExp.js'
export default {
  data () {
    return {
      editContraceType: false,
      title: '添加',
      Form: {
        caseTypeName: '',
        arbitrationList: [],
        userId: null,
        userList: ''
      },
      modal1: true,
      arbitrationList: [],
      userList: [],
      arbitration: [],
      caseType: '',
      caseStatus: false
    }
  },
  mounted () {
    this.title = this.$parent.dialogType
    if (this.title === '编辑') {
      this.editContraceType = true
      this.Form.caseTypeName = this.$parent.editContraceType.caseTypeName
      // 合同类型id
      this.Form.caseTypeId = this.$parent.editContraceType.id
      // 客户名字
      this.Form.userList = this.$parent.editContraceType.userName
      if (this.$parent.editContraceType.arbName) {
        this.arbitration = this.$parent.editContraceType.arbName.split(',')
      }
      setTimeout(() => {
        this.getCustomer()
      }, 2000)
    }
    this.getArbitrationList()
  },
  created () {
    this.getUsersList()
  },
  methods: {
    // 合同类型
    caseChange (data) {
      if (this.Form.userList !== '' && this.title !== '编辑') {
        let _status = false
        this.userList.forEach((item, k) => {
          if (this.Form.userList === item.name) {
            if (item.caseTypes && item.caseTypes.length > 0) {
              item.caseTypes.forEach((index, k) => {
                if (this.Form.caseTypeName === index.caseTypeName) {
                  _status = true
                  this.resMessage('warning', '合同类型已存在')
                }
              })
            }
          }
        })
        if (_status) {
          this.caseStatus = _status
        } else {
          this.caseStatus = _status
        }
      }
    },
    // 获取id
    getuserId () {
      this.userList.forEach((item, ke) => {
        if (this.Form.userList === item.name) {
          this.userId = item.id
        }
      })
    },
    // 选择客户
    getCustomer () {
      if (this.title !== '编辑') {
        let _status = false
        this.userList.forEach((item, k) => {
          if (this.Form.userList === item.name) {
            this.caseType = item.id
            this.Form.userId = item.id
            if (item.caseTypes && item.caseTypes.length > 0) {
              item.caseTypes.forEach((index, k) => {
                if (this.Form.caseTypeName === index.caseTypeName) {
                  this.resMessage('warning', '合同类型已存在')
                  _status = true
                }
              })
            }
          } else {
            this.userId = item.id
          }
        })
        if (_status) {
          this.caseStatus = _status
        } else {
          this.caseStatus = _status
        }
      } else {
        this.userList.forEach((item, k) => {
          if (item.name === this.Form.userList) {
            this.caseType = item.id
          }
        })
      }
    },
    getArbArr (arb) {
      let tre = []
      let objArbit = { id: null, name: '', state: null }
      this.arbitration.forEach((val, i) => {
        this.arbitrationList.forEach((item, k) => {
          if (val === item.name) {
            objArbit = { id: item.id, name: item.name, state: 1, arbCaseTypeId: item.arbCaseTypeId }
            tre.push(objArbit)
          }
        })
      })
      this.Form.arbitrationList = tre
    },
    getUsersList () {
      getContractList().then(res => {
        this.userList = res.data.data
      }).catch(e => {
      })
    },
    // 仲裁委列表
    getArbitrationList () {
      getArbList({
        caseTypeId: this.Form.caseTypeId
      }).then(res => {
        this.arbitrationList = res.data.data
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    // jinggao
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    // 确定按钮
    addContrace () {
      this.getuserId()
      if (this.Form.caseTypeName === '' || this.Form.userList === '') {
        this.resMessage('warning', '请选择合同类型或者客户')
      } else {
        if (this.Form.arbitrationList.length > 0) {
          if (!this.caseStatus) {
            this.sendAjax()
          } else {
            this.resMessage('warning', '合同类型已存在')
          }
        } else {
          this.resMessage('warning', '请关联仲裁委')
        }
      }
    },
    sendAjax () {
      var query = {
        userId: this.userId,
        caseTypeId: this.Form.caseTypeId === undefined ? null : this.Form.caseTypeId,
        caseTypeName: this.Form.caseTypeName,
        arbitrationList: JSON.stringify(this.Form.arbitrationList)
      }
      if (this.title === '编辑') {
        editContr(query).then(res => {
          this.resMessage('success', '操作成功')
          this.modal1 = false
          this.$emit('childByValue', this.modal1)
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      } else {
        addContraceOne(query).then(res => {
          this.resMessage('success', '操作成功')
          this.modal1 = false
          this.$emit('childByValue', this.modal1)
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      }
    },
    cancel () {
      this.$emit('childByValue', false)
    },
    // 获取默认关联仲裁委
    getDefaultArbitrationList () {
      var list = []
      this.Form.arbitrationList = this.Form.arbitrationList.split(',')
      this.arbitrationList.forEach((item, k) => {
        this.Form.arbitrationList.forEach((index, i) => {
          if (item.name === index) {
            list.push(item.id)
          }
        })
      })
      this.arbitration = list
    }
  }

}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.AddDialog {
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
// @import "@/style/mixin.scss";
// .AddDialog {
//   background: transparent;
//   @include mw(1180px);
//   @include bc;
//   padding-top: 40px;
//   ._labelFor {
//     p {
//       padding: 7px 0;
//     }
//     input{
//         margin-bottom: 10px;
//     }
//     ._span {
//       color: #ff7a7a;
//     }
//   }
// }
// ._labelFor {
//  margin: 10px 0;
// }
</style>
