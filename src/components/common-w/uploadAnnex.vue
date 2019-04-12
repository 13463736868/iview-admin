<template>
  <div class="pr _uploadAnnex">
    <Row class="_labelFor">
      <Col span="24">
        <Upload
          name="file"
          :action="uploadUrl"
          :with-credentials="true"
          :show-upload-list="false"
          :format="fileType"
          :max-size="10240"
          :on-format-error="resFormError"
          :on-exceeded-size="resSzieError"
          :on-success="resSuccess"
          :on-error="resError"
        >
          <Button v-if="fileObj === null" icon="ios-cloud-upload-outline">点击上传</Button>
          <div v-if="fileObj !== null">
            <img v-if="!isPdf" class="_img" :src="fileObj.filepath" :title="'点击查看: ' + fileObj.filename" @click="seeFile(fileObj.filepath)">
            <span v-if="isPdf" class="_file" v-text="fileObj.filename" :title="'点击查看: '+fileObj.filename" @click="seeFile(fileObj.filepath)"></span>
            <Icon class="hand ml10" type="md-close-circle" color="#ed4014" size="14" @click="resDele" />
          </div>
        </Upload>
      </Col>
    </Row>
  </div>
</template>

<script>

export default {
  name: 'upload_annex',
  props: ['uploadUrl', 'fileType', 'infoData', 'isPdf'],
  data () {
    return {
      progressText: null,
      fileObj: null
    }
  },
  created () {
    this.fileObj = this.infoData
  },
  methods: {
    resFormError (file) {
      this.$Message.error({
        content: '文件格式错误只支持 ' + this.fileType,
        duration: 2
      })
    },
    resSzieError (file) {
      this.$Message.error({
        content: '文件不能超过10MB',
        duration: 2
      })
    },
    resSuccess (res, file) {
      if (res.flag === false) {
        this.$Message.error({
          content: '错误信息:' + res.message + '',
          duration: 5
        })
      } else {
        this.fileObj = file.response.data
        this.$emit('saveClick', file.response.data)
        this.$Message.success({
          content: '文件上传成功',
          duration: 2
        })
      }
    },
    resError (error, file) {
      this.$Message.error({
        content: '错误信息:' + error.status + ' 稍后再试',
        duration: 5
      })
    },
    seeFile (path) {
      window.open(path, '_blank')
    },
    resDele () {
      this.fileObj = this.infoData
      this.$emit('delClick', '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
._uploadAnnex {
  background: #fff;
  font-size: 12px;
  ._labelFor {
    ._label {
      padding: 5px 0;
      ._b {
        color: #ff7a7a;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
  }
  ._img {
    @include hand;
    width: 80px;
    height: 80px;
  }
  ._file {
    @include hand;
    font-size: 12px;
    color: #337BB5;
    height: 32px;
    line-height: 32px;
  }
}
</style>
