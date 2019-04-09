<template>
  <div class="_center pr">
    <spin-comp :spinShow="spinShow"></spin-comp>
    <div class="_caseList clearfix">
      <Row>
        <Col span="24" class="pl20 pr20">
          <tree-table expand-key="title" :expand-type="false" :selectable="false" :columns="treeList.header" :data="treeList.bodyList">
            <template slot="btns" slot-scope="scope">
              <!-- <Button type="primary" @click="handle(scope)">查看</Button> -->
            </template>
          </tree-table>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import spinComp from '@/components/common-w/spin'
import { maFuncTreeList } from '@/api/datas.js'

export default {
  name: 'juriMana',
  components: { spinComp },
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
      }
    }
  },
  created () {
    this.resTreeList()
  },
  methods: {
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    resTreeList () {
      maFuncTreeList().then(res => {
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
    handle (scope) {
      console.log(scope)
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
</style>
