<template>
  <div class="_evidInfo">
    <Row>
      <Col class="_listL" span="24">
        <Row>
          <Col span="22" offset="1">
            <p>
              <span class="mr10">证据项名称 :</span>
              <span v-text="infoData.name"></span>
              <span v-if="!hashStatus" class="_icon">
                <Icon @click="delInfo(infoData.id)" class="_del" type="close-circled"></Icon>
              </span>
            </p>
            <p>
              <span class="mr10">是否有原件 :</span>
              <span v-if="infoData.state === 1">是</span>
              <span v-else-if="infoData.state === 2">否</span>
            </p>
            <p>
              <span class="mr10">证据项描述 :</span>
              <span v-text="infoData.memo"></span>
            </p>
            <p>
              <span class="mr10">附件名称 :</span>
              <span class="_file" v-text="infoData.fileName" :title="'点击查看: '+infoData.fileName" @click="seeFile(infoData.filePath)"></span>
            </p>
            <p>
              <span class="mr10">固化状态 :</span>
              <span v-if="hashStatus === true" style="color:#19be6b;">已固化</span>
              <span v-else-if="hashStatus === false" style="color:#ff9900;">未固化</span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'evid_info',
  props: ['infoData'],
  data () {
    return {}
  },
  computed: {
    hashStatus () {
      if (this.infoData.isSolidify === 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    seeFile (path) {
      window.open(path, '_blank')
    },
    delInfo (id) {
      this.$emit('delInfo', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
._evidInfo {
  margin-top: 10px;
  ._listL {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    padding: 10px 0;
    p {
      padding: 5px 0;
    }
    ._icon {
      float: right;
      ._edit {
        @include hand;
        font-size: 16px;
        color: #126eaf
      }
      ._del {
        @include hand;
        font-size: 17px;
        color: #ff7a7a;
        margin-left: 10px;
      }
    }
    ._file {
      @include hand;
      color: #337BB5
    }
  }
}
</style>
