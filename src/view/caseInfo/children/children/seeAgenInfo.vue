<template>
  <div class="_seeAgenInfo">
    <Row>
      <Col span="10" offset="1">
        <Row class="_labelFor">
          <Col span="24" class="_label">姓名<b class="_b">*</b></Col>
          <Col span="24" class="_input"><span v-text="agenData.name"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">民族<b class="_b">*</b></Col>
          <Col span="24" class="_input"><span v-text="nationName"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
          <Col span="24" class="_input"><span v-text="idcardName"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
          <Col span="24" class="_input"><span v-text="agenData.idcard"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">工作单位<b class="_b">*</b></Col>
          <Col span="24" class="_input"><span v-text="agenData.organization"></span></Col>
        </Row>
      </Col>
      <Col span="10" offset="2">
        <Row class="_labelFor">
          <Col span="24" class="_label">性别<b class="_b">*</b></Col>
          <Col span="24" class="_input">
            <span v-if="agenData.sex === null">未知</span>
            <span v-else-if="agenData.sex === 1">男</span>
            <span v-else-if="agenData.sex === 2">女</span>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">委托人<b class="_b">*</b></Col>
          <Col span="24" class="_input"><span v-text="agenData.propName"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">送达手机<b class="_b">*</b></Col>
          <Col span="24" class="_input"><span v-text="agenData.phone"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">送达邮箱</Col>
          <Col span="24" class="_input"><span v-text="agenData.email"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">联系地址</Col>
          <Col span="24" class="_input"><p v-text="agenData.address" :title="agenData.address"></p></Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col class="tc mt10" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':seeAgenBtn}" v-bind:disabled="seeAgenBtn" @click="saveClick">确 定</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'see_agen_info',
  props: ['seeAgenData'],
  data () {
    return {
      seeAgenBtn: false,
      idcardList: [],
      nationList: [],
      agenData: JSON.parse(JSON.stringify(this.seeAgenData))
    }
  },
  created () {
    this.cardList()
  },
  computed: {
    idcardName () {
      for (let k in this.idcardList) {
        if (this.idcardList[k].itemValue === this.agenData.idcardType) {
          return this.idcardList[k].item
        }
      }
      return '未知'
    },
    nationName () {
      for (let k in this.nationList) {
        if (this.nationList[k].itemValue === this.agenData.nation) {
          return this.nationList[k].item
        }
      }
      return '未知'
    }
  },
  methods: {
    cardList () {
      axios.all([axios.post('/users/dictionary/personIdcardType'), axios.post('/users/dictionary/nationName')]).then(axios.spread((resO, resT) => {
        this.idcardList = resO.data.data
        this.nationList = resT.data.data
      })).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    saveClick () {
      this.$emit('saveClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
._seeAgenInfo {
  @include borderRadius(3px);
  @include boxShadow(0 1px 6px -1px #bbb);
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  font-size: 12px;
  ._labelFor {
    ._label {
      height: 20px;
      line-height: 20px;
      ._b {
        color: #ff7a7a;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
    ._input {
      margin-bottom: 10px;
      border-bottom:1px solid #ddd;
      height: 32px;
      p {
        height: 32px;
        line-height: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        display: inline-block;
        width: 100%;
        letter-spacing: 1px;
        font-size: 12px;
        color: #666;
        height: 32px;
        line-height: 32px;
      }
    }
  }
  ._saveBtn {
    @include btn(#126eaf, 90px, 14px, 32px);
    @include boxShadow(0 1px 6px -1px #bbb);
    @include borderRadius(4px);
  }
  ._saveBtn._disabled {
    @include btn(#ccc, 90px, 14px, 32px);
  }
  ._saveBtn:focus {
    outline: 0px;
  }
}
</style>
