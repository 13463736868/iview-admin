<template>
  <div class="proposerInfo" id="proposer">
    <div class="_proposer">
      <div class="_top">申请人</div>
      <div v-if="propShow.list">
        <div v-if="propData !== null" v-for="(item, index) in propData" :key="index">
          <prop-info :infoData="item" @seeInfo="seePropInfo(item)"></prop-info>
        </div>
      </div>
      <div v-if="propShow.see">
        <see-prop-info :seePropData="seePropData" @saveClick="seePropSave"></see-prop-info>
      </div>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
      <div v-if="agenShow.list">
        <div v-if="agenData !== null"  v-for="(item, index) in agenData" :key="index">
          <agen-info :infoData="item" @seeInfo="seeAgenInfo(item)"></agen-info>
        </div>
      </div>
      <div v-if="agenShow.see">
        <see-agen-info :seeAgenData="seeAgenData" @saveClick="seeAgenSave"></see-agen-info>
      </div>
    </div>
  </div>
</template>

<script>
import propInfo from '@/view/caseInfo/children/children/propInfo'
import agenInfo from '@/view/caseInfo/children/children/agenInfo'
import seePropInfo from '@/view/caseInfo/children/children/seePropInfo'
import seeAgenInfo from '@/view/caseInfo/children/children/seeAgenInfo'

export default {
  name: 'proposerInfo',
  props: ['caseInfo'],
  components: { propInfo, agenInfo, seePropInfo, seeAgenInfo },
  data () {
    return {
      seePropData: null,
      seeAgenData: null,
      propShow: {
        list: true,
        see: false
      },
      agenShow: {
        list: true,
        see: false
      }
    }
  },
  computed: {
    propData () {
      if (this.caseInfo !== null) {
        return this.caseInfo.propList
      } else {
        return null
      }
    },
    agenData () {
      if (this.caseInfo !== null) {
        return this.caseInfo.proxyList
      } else {
        return null
      }
    }
  },
  methods: {
    seePropInfo (obj) {
      this.seePropData = obj
      this.propShow.list = false
      this.propShow.see = true
    },
    seePropSave () {
      this.seePropData = null
      this.propShow.list = true
      this.propShow.see = false
    },
    seeAgenInfo (obj) {
      this.seeAgenData = obj
      this.agenShow.list = false
      this.agenShow.see = true
    },
    seeAgenSave () {
      this.seeAgenData = null
      this.agenShow.list = true
      this.agenShow.see = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.proposerInfo {
  ._agent {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ._proposer ._top, ._agent ._top{
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
}
</style>
