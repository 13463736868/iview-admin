<template>
  <div class="respondentInfo" id="respondent">
    <div class="_respondent">
      <div class="_top">被申请人</div>
      <div v-if="respShow.list">
        <div v-if="respData !== null" v-for="(item, index) in respData" :key="index">
          <prop-info :infoData="item" @seeInfo="seeRespInfo(item)"></prop-info>
        </div>
      </div>
      <div v-if="respShow.see">
        <see-prop-info :seePropData="seeRespData" @saveClick="seeRespSave"></see-prop-info>
      </div>
    </div>
  </div>
</template>

<script>
import propInfo from '@/view/caseInfo/children/children/propInfo'
import seePropInfo from '@/view/caseInfo/children/children/seePropInfo'

export default {
  name: 'respondentInfo',
  props: ['caseInfo'],
  components: { propInfo, seePropInfo },
  data () {
    return {
      seeRespData: null,
      respShow: {
        list: true,
        see: false
      }
    }
  },
  computed: {
    respData () {
      if (this.caseInfo !== null) {
        return this.caseInfo.respList
      } else {
        return null
      }
    }
  },
  methods: {
    seeRespInfo (obj) {
      this.seeRespData = obj
      this.respShow.list = false
      this.respShow.see = true
    },
    seeRespSave () {
      this.seeRespData = null
      this.respShow.list = true
      this.respShow.see = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.respondentInfo {
  ._respondent {
    padding-bottom: 60px;
  }
  ._respondent ._top{
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
