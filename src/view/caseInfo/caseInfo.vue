<template>
  <div class="caseInfo">
    <div class="_center pr">
      <Row>
        <Col span="4" offset="1" class="_center_left not_s">
          <li v-for="item in menuClaim" :class="item.id === activeClass ? 'active' : ''" :key="item.id">
            <a :href="item.url" v-text="item.text" @click="resChange(item.id)"></a>
          </li>
        </Col>
        <Col span="14" class="_center_right">
          <proposer-info :caseInfo="caseInfoData"></proposer-info>
          <respondent-info :caseInfo="caseInfoData"></respondent-info>
          <claimItems-info :caseInfo="caseInfoData"></claimItems-info>
          <evidences-info :caseInfo="caseInfoData"></evidences-info>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import proposerInfo from '@/view/caseInfo/children/proposer'
import respondentInfo from '@/view/caseInfo/children/respondent'
import claimItemsInfo from '@/view/caseInfo/children/claimItems'
import evidencesInfo from '@/view/caseInfo/children/evidences'
import { caseDetails } from '@/api/datas.js'

export default {
  name: 'case_info',
  components: { proposerInfo, respondentInfo, claimItemsInfo, evidencesInfo },
  data () {
    return {
      activeClass: '0',
      caseInfoData: null,
      menuClaim: [
        {
          id: '0',
          text: '申请人',
          url: '#proposer'
        },
        {
          id: '1',
          text: '被申请人',
          url: '#respondent'
        },
        {
          id: '2',
          text: '请求',
          url: '#claimItems'
        },
        {
          id: '3',
          text: '证据',
          url: '#evidences'
        }
      ]
    }
  },
  created () {
    if (this.caseId === null || this.caseState === null) {
      this.$router.replace({
        name: this.$config.homeName
      })
    } else {
      this.resCaseInfo()
    }
  },
  computed: {
    ...mapGetters([
      'caseId',
      'caseState'
    ])
  },
  methods: {
    resCaseInfo () {
      caseDetails({
        caseId: this.caseId
      }).then(res => {
        this.caseInfoData = res.data.data
        console.log(res.data.data)
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    resChange (id) {
      this.activeClass = id
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
._center {
  background: transparent;
  width: 100%;
  @include mw(1180px);
  @include bc;
  padding-top: 40px;
  ._center_left {
    text-align: left;
    li {
      @include hand;
      margin-left: 75px;
      margin-bottom: 8px;
      padding-left: 8px;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      border-left: 4px solid transparent;
      a {
        color: #666;
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    li.active {
      border-left: 4px solid #1a2b58;
      padding-left: 8px;
    }
  }
}
</style>
