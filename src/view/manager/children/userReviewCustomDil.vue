<template>
  <div class="userReviewCustomDia">
    <Modal v-model="modal1" title="个人" :mask-closable="false" @on-cancel="cancel"  width="800">
      <Row>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>客户姓名：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.name}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>证件类型：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.idcardTypeDesc}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>证件号码：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.idcard}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>登录账号：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.loginName}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>登录密码：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.password}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>性别：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.sexDesc}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>生日：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.birthday}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>联系电话：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.phone}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>邮箱：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.email}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>创建时间：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.createTime}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>是否有效：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.enabled === 1 ? '有效' : '无效'}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>联系地址：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.address}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>身份审核：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{customForm.stateDesc}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20" v-for="(item,index) in custom.fileList" :key="index" :value="item.title">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>{{item.title}}</b>
              </p>
            </Col>
            <Col span="16">
              <div style="width:50px" v-if="index!==3">
                <img :src="item.filepath" alt="" style="width:100%;cursor:pointer"  @click="viewImg(item.filepath)">
              </div>
              <!-- <p v-if="index===3"><a :href="item.filepath" target="view_window">{{item.filename}}</a> -->
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal v-model="imgDia" title="查看" :mask-closable="false" >
        <Row class="_labelFor">
            <div style="width:100%;" align="center">
              <img :src="bigImg" alt="" style="width:100%">
            </div>
        </Row>
        <div>
          <slot></slot>
        </div>
        <div slot="footer">
          <Button size="large" @click="cancel" v-if="false">取消</Button>
          <Button type="primary" size="large" @click="addArbitration" v-if="false">确定</Button>
        </div>
      </Modal>
      <div>
        <slot></slot>
      </div>
      <div slot="footer">
        <Button size="large" @click="cancel" v-if="showButton">取消</Button>
        <Button type="primary" size="large" @click="addArbitration" v-if="showButton">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getPersonForm } from '@/api/contrace.js'
export default {
  data () {
    return {
      imgDia: false,
      modal1: false,
      showButton: false,
      customForm: {},
      customId: null,
      bigImg: '',
      custom: {
        fileList: [
          {
            title: '身份证正面：',
            filename: '',
            filepath: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1298168342,1183874051&fm=26&gp=0.jpg'
          },
          {
            title: '身份证反面：',
            filename: '',
            filepath: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1298168342,1183874051&fm=26&gp=0.jpg'
          },
          {
            title: '手持身份证：',
            filename: '',
            filepath: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1298168342,1183874051&fm=26&gp=0.jpg'
          }
        ]
      }
    }
  },
  created () {
    this.customId = this.$parent.customRowDetial.registerId
    if (this.$parent.rowDetial.state === 2) {
      this.showButton = true
    }
    this.getCustomForem()
  },
  mounted () {
  },
  methods: {
    viewImg (item) {
      this.imgDia = true
      this.bigImg = item
    },
    //     getPersonForm
    getCustomForem () {
      getPersonForm({
        id: this.customId
      }).then(res => {
        this.customForm = res.data.data
        if (this.customForm.fileList.length > 0) {
          this.customForm.fileList.forEach((item, index) => {
            this.custom.fileList[index].filepath = item.filepath
            this.custom.fileList[index].filename = item.filename
          })
        }
        this.modal1 = true
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    cancel () {
      this.$emit('childbyValueCustom', false)
    },
    addArbitration () {
      this.$emit('childbyValueCustom', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.userReviewCustomDia {
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
</style>
