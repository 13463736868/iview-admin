<template>
  <div class="userReviewDia">
    <Modal v-model="modal1" title="企业" :mask-closable="false"  @on-cancel="cancel" width="800">
      <Row>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>企业名称：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.name}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>登陆用户：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.loginName}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>登陆密码：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.password}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>证照类型：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.codeType}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>证件编号：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.code}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>法定代表人：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.legal}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>法人证件：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.idcardTypeDesc}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>法人证件号：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.idcard}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>公司地址：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.address}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>公司人数：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{company.companyNumber}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>公司类型：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{company.companyTrade}}</p>
            </Col>
          </Row>
        </Col>
        <!-- <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>状态：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.enabled == '1' ? '有效' :'无效'}}</p>
            </Col>
          </Row>
        </Col> -->
        <Col span="12" class="pr20">
          <Row class="_labelFor">
            <Col span="6" offset="1">
              <p>
                <b>是否有效：</b>
              </p>
            </Col>
            <Col span="16">
              <p>{{companyForm.enabled == '1' ? '有效' :'无效'}}</p>
            </Col>
          </Row>
        </Col>
        <Col span="12" class="pr20" v-for="(item,index) in company.fileList" :key="index" :value="item.title">
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
              <p v-if="index===3"><a :href="item.filepath" target="view_window">{{item.filename}}</a>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
        <div>
          <slot></slot>
        </div>
        <div slot="footer">
          <Button size="large" v-if="showButton">取消</Button>
          <Button type="primary" size="large" v-if="showButton">确定</Button>
        </div>
      <Modal v-model="imgDia" title="查看" :mask-closable="false" >
        <Row class="_labelFor">
            <div style="width:100%">
              <img :src="bigImg" alt="" style="width:100%;height:100%">
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
    </Modal>
  </div>
</template>
<script>
import { getCompanyForm, personIdcardType, priseIdcardType, companyNumber, tradeType } from '@/api/contrace.js'
export default {
  data () {
    return {
      imgDia: false,
      modal1: false,
      showButton: false,
      companyId: null,
      companyForm: {},
      // List: {
      companyList: [],
      // }
      company: {
        companyNumber: '',
        companyTrade: '',
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
            title: '营业执照：',
            filename: '',
            filepath: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1298168342,1183874051&fm=26&gp=0.jpg'
          },
          {
            title: '授权委托书：',
            filename: '',
            filepath: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1298168342,1183874051&fm=26&gp=0.jpg'
          }
        ]
      },
      bigImg: ''
    }
  },
  created () {
    this.companyId = this.$parent.rowDetial.companyId
    if (this.$parent.rowDetial.state === 2) {
      this.showButton = true
    }
    this.getForm()
  },
  mounted () {
  },
  methods: {
    // 查看图片的弹框
    viewImg (item) {
      this.imgDia = true
      this.bigImg = item
    },
    // 获取个人证件类型
    getPersonCardType () {
      personIdcardType({}).then(res => {
        cosole.log(res.data.data)
      }).catch(e => {})
    },
    // 获取企业征证照类型
    getCompanCardType () {
      priseIdcardType({}).then(res => {}).catch(e => {})
    },
    // 获取公司人数
    getcompanyNumber () {
      companyNumber({}).then(res => {
        this.companyList = res.data.data
        this.companyList.forEach((item, index) => {
          if (item.itemValue === parseInt(this.companyForm.scale)) {
            this.company.companyNumber = item.item
          }
        })
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    // 获取公司类型
    getCompanyType () {
      tradeType({}).then(res => {
        res.data.data.forEach((item, index) => {
          if (item.itemValue === parseInt(this.companyForm.trade)) {
            this.company.companyTrade = item.item
          }
        })
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    // 信息提示
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: 5
      })
    },
    getForm () {
      getCompanyForm({ id: this.companyId })
        .then(res => {
          this.companyForm = res.data.data
          if (this.companyForm.fileList.length > 0) {
            this.companyForm.fileList.forEach((item, index) => {
              this.company.fileList[index].filepath = item.filepath
              this.company.fileList[index].filename = item.filename
            })
          }
          this.getcompanyNumber()
          this.getCompanyType()
          this.modal1 = true
          // this.getPersonCardType()
          // this.getCompanCardType()
        })
        .catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
    },
    cancel () {
      this.modal1 = false
      this.$emit('childByValue', this.modal1)
    },
    addArbitration () {
      this.modal1 = false
      this.$emit('childByValue', this.modal1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.userReviewDia {
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
    line-height: 31px;
  }
  ._span {
    color: #ff7a7a;
  }
}
</style>
