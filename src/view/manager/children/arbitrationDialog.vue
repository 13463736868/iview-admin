<template>
  <div class="editArbitration">
    <Modal v-model="modal1" :title="butType == '1' ? '仲裁委信息查看': butType =='2' ? '添加仲裁委':'编辑仲裁委'" @on-cancel="cancel">
      <!-- // @on-ok="ok" @on-cancel="cancel" -->
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span">*</span>
            <b>仲裁委名称：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.name" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.name}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span">*</span>
            <b>仲裁委英文名称：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.englishName" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.englishName}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <!-- <span class="_span">*</span> -->
            <b>仲裁委代码：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.code" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.code}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span">*</span>
            <b>地址：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.address" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.address}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span">*</span>
            <b>是否有效：</b>
          </p>
        </Col>
        <Col span="16">
          <RadioGroup v-model="arbitrationForm.state" v-if="addForm">
            <Radio
              v-for="item in Enabled"
              :label="item.value"
              :key="item.value"
              :value="item.value"
            >
              <span>{{item.label}}</span>
            </Radio>
            <!-- <Radio label="无效"></Radio> -->
          </RadioGroup>
          <p v-if="checkForm">{{arbitrationForm.state==1?'有效':'无效'}}</p>
          <!-- <Input v-model="arbitrationForm.linkman" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.linkman}}</p>-->
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span"> </span>
            <b>联系人：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.linkman" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.linkman}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span"></span>
            <b>开户行：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.openingBank" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.openingBank}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span"></span>
            <b>对公账号：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.accountNumber" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.accountNumber}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span">*</span>
            <b>联系电话：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.telephone" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.telephone}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <!-- <span class="_span">*</span> -->
            <b>联系邮箱：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.email" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.email}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <!-- <span class="_span">*</span> -->
            <b>审判接口地址：</b>
          </p>
        </Col>
        <Col span="16">
          <Input v-model="arbitrationForm.baseUrl" class="inputOf" v-if="addForm"></Input>
          <p v-if="checkForm">{{arbitrationForm.baseUrl}}</p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p>
            <span class="_span"></span>
            <b>上传Log：</b>
          </p>
        </Col>
        <Col span="16">
          <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-if="addForm"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            :default-file-list="defaultFileList"
            :disabled="oneMyFileFlag "
            action="/file/upload"
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="onFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <!-- 放大图片 -->
          <Modal title="预览图片" v-model="visible">
            <img :src="previewUrl" v-if="visible" style="width: 100%">
          </Modal>
        </Col>
      </Row>
      <div>
        <slot></slot>
      </div>
      <div slot="footer">
        <Button v-if="checkForm !== true" size="large" @click="cancel">取消</Button>
        <Button v-if="checkForm !== true" type="primary" size="large" @click="addArbitration">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
import { arbAdd, arbEdit } from '@/api/contrace.js'
import setRegExp from '@/config/regExp.js'
export default {
  // props: {
  //     arbitrationForm:{
  //         type:Object,
  //     }
  // },
  data () {
    return {
      defaultFileList: [], // 默认渲染log
      previewUrl: null,
      allImgDataArr: '',
      uploadList: [],
      imgName: '',
      visible: false, // 放大图片
      oneMyFileFlag: false,
      defaultList: [
      ],
      upload: '',
      Enabled: [
        {
          label: '有效',
          value: 1
        },
        {
          label: '无效',
          value: 2
        }
      ],
      butType: null,
      addForm: false,
      checkForm: true,
      dialogTitle: '添加',
      modal1: true,
      arbitrationForm: {
        name: '',
        englishName: '',
        code: '',
        telephone: '',
        address: '',
        email: '',
        linkman: '',
        accountNumber: '',
        openingBank: '',
        baseUrl: '',
        state: 1,
        logoUrl: ''
      }
    }
  },
  created () {
    this.arbitrationForm = this.$parent.arbitrationForm
    this.butType = this.$parent.butType
    this.modal1 = this.$parent.showDialog
    if (this.arbitrationForm.logoUrl) {
      this.defaultFileList.push({ name: 'log', url: this.arbitrationForm.logoUrl })
      this.previewUrl = this.arbitrationForm.logoUrl
      this.oneMyFileFlag = true
    }
  },
  methods: {
    //   放大图片
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    // 图片验证
    onFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件' + file.name + '格式不正确，请上传jpg,jpeg,png格式'
      })
    },
    //    删除图片
    handleRemove (file) {
      this.oneMyFileFlag = false
      this.previewUrl = ''
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    // 上传文件之前的钩子
    handleBeforeUpload (file) {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    },
    // 文件超出指定大小限制时的钩子，返回字段为 file, fileList
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '上传错误',
        desc: '文件  ' + file.name + ' 太大，请上传20M一下文件.'
      })
    },
    // 上传成功成功
    handleSuccess (res, file) {
      this.previewUrl = res.data.url
      this.oneMyFileFlag = true
      // file.url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554031291749&di=bbc334bbf8b0c23009f5f57435baf5e4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201705%2F06%2F20170506135047_aRHYs.jpeg'
      file.url = res.data
      // this.previewUrl = res.data
      this.previewUrl = res.data

      // file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    // 上传失败
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件' + file.name + '格式不正确，请上传jpg,jpeg,png格式'
      })
    },
    // jinggao
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    addArbitration () {
      if (this.arbitrationForm.name === '') {
        this.resMessage('warning', '输入仲裁委名称')
      } else if (!setRegExp(this.arbitrationForm.name, 'name')) {
        this.resMessage('warning', '仲裁委名称名称只能是汉字')
      } else if (this.arbitrationForm.englishName === '') {
        this.resMessage('warning', '请输入仲裁委英文名称')
      } else if (!setRegExp(this.arbitrationForm.englishName, 'eglishName')) {
        this.resMessage('warning', '仲裁委英文名称只能是字母')
      } else if (this.arbitrationForm.address === '') {
        this.resMessage('warning', '请输入地址')
      } else if (this.arbitrationForm.state === null) {
        this.resMessage('warning', '请选择是否有效')
      } else if (this.arbitrationForm.telephone === '') {
        this.resMessage('warning', '请输入电话号码')
      } else if (!setRegExp(this.arbitrationForm.telephone, 'landline')) {
        this.resMessage('warning', '请输入正确的电话号码')
      } else {
        if (this.arbitrationForm.email !== '') {
          if (!setRegExp(this.arbitrationForm.email, 'email')) {
            this.resMessage('warning', '请输入正确的邮箱地址')
            return false
          }
        }
        if (this.arbitrationForm.accountNumber !== '') {
          if (!setRegExp(this.arbitrationForm.accountNumber, 'backCard')) {
            this.resMessage('warning', '请输入正确对公账号')
            return false
          }
        }
        if (this.arbitrationForm.linkman !== '') {
          if (!setRegExp(this.arbitrationForm.linkman, 'name')) {
            this.resMessage('warning', '只能输入汉字')
            return false
          }
        }
        this.sendAjax()
      }
    },
    sendAjax () {
      if (this.butType === 2) {
        var query = {
          id: null,
          // this.arbitrationForm.id, // 修改时必填
          name: this.arbitrationForm.name,
          englishName: this.arbitrationForm.englishName,
          code: this.arbitrationForm.code,
          telephone: this.arbitrationForm.telephone,
          address: this.arbitrationForm.address,
          email: this.arbitrationForm.email,
          linkman: this.arbitrationForm.linkman,
          accountNumber: this.arbitrationForm.accountNumber,
          openingBank: this.arbitrationForm.openingBank,
          baseUrl: this.arbitrationForm.baseUrl,
          state: this.arbitrationForm.state,
          file: this.previewUrl
        }
        arbAdd(query).then(res => {
          this.resMessage('success', '添加成功！')
          this.modal1 = false
          this.$emit('childByValue', false)
        }).catch(e => {
          this.resMessage('warning', '操作失败，稍后重试！')
        })
      } else {
        let query = {
          id: this.arbitrationForm.id, // 修改时必填
          name: this.arbitrationForm.name,
          englishName: this.arbitrationForm.englishName,
          code: this.arbitrationForm.code,
          telephone: this.arbitrationForm.telephone,
          address: this.arbitrationForm.address,
          email: this.arbitrationForm.email,
          linkman: this.arbitrationForm.linkman,
          accountNumber: this.arbitrationForm.accountNumber,
          openingBank: this.arbitrationForm.openingBank,
          baseUrl: this.arbitrationForm.baseUrl,
          state: this.arbitrationForm.state,
          file: this.previewUrl
        }
        arbEdit(query).then(res => {
          this.resMessage('success', '修改成功！')
          this.modal1 = false
          this.$emit('childByValue', false)
        }).catch(e => {
          this.resMessage('warning', '操作失败，稍后重试！')
        })
      }
    },
    cancel () {
      this.modal1 = false
      this.$emit('childByValue', false)
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
    if (this.butType === 2 || this.butType === 3) {
      this.addForm = true
      this.checkForm = false
    } else if (this.butType === 1) {
      this.addForm = false
      this.oneMyFileFlag = true
      this.checkForm = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.editArbitration {
  background: transparent;
  @include mw(1180px);
  @include bc;
  padding-top: 40px;
  ._search {
    max-width: 450px;
    margin-bottom: 20px;
  }
  ._caseList {
    margin-bottom: 20px;
  }
}
._labelFor {
  margin-bottom: 10px;
  p {
    padding: 7px 0;
  }
  ._span {
    color: #ff7a7a;
  }
}
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
