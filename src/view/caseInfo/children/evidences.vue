<template>
  <div class="evidencesInfo" id="evidences">
    <div class="_evidences">
      <div class="_top">申请人证据</div>
      <div v-if="evidObj.list">
        <div v-if="evidData !== null" v-for="(item, index) in evidData" :key="index">
          <evid-info :infoData="item"></evid-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import evidInfo from '@/view/caseInfo/children/children/evidInfo'

export default {
  name: 'evidencesInfo',
  props: ['caseInfo'],
  components: { evidInfo },
  data () {
    return {
      evidObj: {
        list: true
      }
    }
  },
  computed: {
    evidData () {
      if (this.caseInfo !== null) {
        return this.caseInfo.evidenceList
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.evidencesInfo {
  ._evidences {
    padding-bottom: 60px;
  }
  ._revEvidences {
    padding-bottom: 60px;
  }
  ._evidences ._top, ._revEvidences ._top{
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
