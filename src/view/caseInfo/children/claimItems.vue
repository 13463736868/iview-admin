<template>
  <div class="claimInfo" id="claimItems">
    <div class="_claim">
      <div class="_top">仲裁请求</div>
      <div v-if="claimData !== null" v-for="(item, index) in claimData" :key="index">
        <claim-info :infoData="item"></claim-info>
      </div>
    </div>
    <div class="_reason">
      <div class="_top">事实与理由</div>
      <div v-if="reasData !== null">
        <reas-info :infoData="reasData"></reas-info>
      </div>
    </div>
    <div class="_applicationBook">
      <div class="_top">仲裁申请书</div>
      <div v-if="applData !== null">
        <appl-info :infoData="applData"></appl-info>
      </div>
    </div>
  </div>
</template>

<script>
import claimInfo from '@/view/caseInfo/children/children/claimInfo'
import reasInfo from '@/view/caseInfo/children/children/reasInfo'
import applInfo from '@/view/caseInfo/children/children/applInfo'

export default {
  name: 'claimItem',
  props: ['caseInfo'],
  components: { claimInfo, reasInfo, applInfo },
  data () {
    return {
    }
  },
  computed: {
    claimData () {
      if (this.caseInfo !== null) {
        return this.caseInfo.requestList
      } else {
        return null
      }
    },
    reasData () {
      if (this.caseInfo !== null) {
        return this.caseInfo.requestReasons
      } else {
        return null
      }
    },
    applData () {
      if (this.caseInfo !== null) {
        return this.caseInfo.arbRequisitionFile
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.claimInfo {
  ._reason, ._applicationBook {
    padding-top: 60px;
  }
  ._applicationBook {
    padding-bottom: 60px;
  }
  ._claim ._top, ._reason ._top, ._applicationBook ._top{
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
