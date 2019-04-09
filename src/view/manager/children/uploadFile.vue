<template>
  <div>
    <Col span="12" class="pr20">
      <Row class="_labelFor">
        <Col span="7" offset="1">
          <p>
            <span class="_span">*</span>
            <b>{{uploadTitle}}</b>
          </p>
        </Col>
        <Col span="16">
          <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            :disabled="status || maxLimit"
            type="drag"
            :action="actionUrl"
            :default-file-list="onUploadlist"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img :src="previewUrl" v-if="visible" style="width: 100%">
          </Modal>
        </Col>
      </Row>
    </Col>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    newSelectTag: String,
    uploadTitle: String,
    actionUrl: String,
    status: Boolean,
    indexKey: Number,
    onUploadlist: Array,
    companyImgList: Array,
    img: Array
  },
  data () {
    return {
      inLoadName: this.loadName,
      maxLimit: false,
      imgName: '',
      visible: false,
      uploadList: [],
      previewUrl: null
    }
  },
  watch: {
    img: function (newArray, oldArray) {
      this.uploadList = newArray// 你怀疑我   李某人打个赌?????
      this.previewUrl = newArray[0].url
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      this.maxLimit = false
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.onUploadlist.forEach((item, index) => {
        if (index === 0) {
          item.status = false
        } else {
          item.status = true
        }
      })
      this.$emit(this.name, this.onUploadlist)
    },
    handleSuccess (res, file) {
      this.maxLimit = true
      this.onUploadlist.forEach((item, index) => {
        if (index === this.indexKey + 1) {
          item.status = false
        }
        if (index === this.indexKey) {
          item.data = res.data.url
        }
      })
      this.$emit(this.name, this.onUploadlist)
      file.url = res.data.url
      this.previewUrl = res.data.url
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc:
          'File format of ' +
          file.name +
          ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    }
  }
}
</script>
<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
