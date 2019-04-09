<template>
  <div class="_applInfo">
    <Row>
      <Col class="_listL" span="24">
        <Row>
          <Col span="22" offset="1">
            <p>
              <span class="mr10 _file" v-text="infoData.filename" :title="'点击查看: '+infoData.filename" @click="seeFile(infoData.filepath)"></span>
              <span class="_icon">
                <Icon @click="delInfo(infoData.id)" class="_del" type="close-circled"></Icon>
              </span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'appl_info',
  props: ['infoData'],
  data () {
    return {}
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
._applInfo {
  margin-top: 10px;
  ._listL {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    padding: 10px 0;
    p {
      padding: 5px 0;
    }
    ._file {
      @include hand;
      color: #337BB5;
    }
    ._icon {
      float: right;
      ._del {
        @include hand;
        font-size: 17px;
        color: #ff7a7a;
        margin-left: 10px;
      }
    }
  }
}
</style>
